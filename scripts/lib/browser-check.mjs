import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { existsSync } from "node:fs";
import { mkdtemp, rm } from "node:fs/promises";
import net from "node:net";
import os from "node:os";
import path from "node:path";

export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export async function eventually(check, label, timeout = 20000) {
  const deadline = Date.now() + timeout;
  while (Date.now() < deadline) {
    const result = await check().catch(() => false);
    if (result) return result;
    await sleep(100);
  }
  throw new Error("Timed out: " + label);
}

async function freePort() {
  const server = net.createServer();
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  const { port } = server.address();
  await new Promise(resolve => server.close(resolve));
  return port;
}

function launch(executable, args, root) {
  const child = spawn(executable, args, { cwd: root, windowsHide: true, stdio: ["ignore", "pipe", "pipe"] });
  child.log = "";
  for (const stream of [child.stdout, child.stderr]) stream.on("data", data => { child.log = (child.log + data).slice(-6000); });
  return child;
}

async function stop(child) {
  if (!child?.pid || child.exitCode !== null) return;
  if (process.platform === "win32") {
    const killer = spawn("taskkill.exe", ["/PID", String(child.pid), "/T", "/F"], { windowsHide: true, stdio: "ignore" });
    await once(killer, "exit");
  } else child.kill("SIGTERM");
  child.stdout.destroy();
  child.stderr.destroy();
  child.unref();
}

export async function withProductionBrowser(root, run) {
  assert.ok(existsSync(path.join(root, ".next/BUILD_ID")), "Run pnpm build before the production audit.");
  const chrome = process.env.CHROME_PATH || [
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    "/usr/bin/google-chrome", "/usr/bin/chromium",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  ].find(existsSync);
  assert.ok(chrome, "Install Chrome/Edge or set CHROME_PATH.");
  const scratch = await mkdtemp(path.join(os.tmpdir(), "portfolio-accessibility-"));
  const port = await freePort();
  const debugPort = await freePort();
  const origin = "http://127.0.0.1:" + port;
  let server, browser, socket, command;
  try {
    server = launch(process.execPath, ["node_modules/next/dist/bin/next", "start", "-p", String(port)], root);
    await eventually(async () => (await fetch(origin)).ok, "production server");
    browser = launch(chrome, ["--headless=new", "--disable-gpu", "--no-first-run", "--no-default-browser-check", "--disable-extensions", "--disable-background-networking", "--disable-component-update", "--remote-debugging-port=" + debugPort, "--user-data-dir=" + path.join(scratch, "profile"), "about:blank"], root);
    const targets = await eventually(async () => (await (await fetch("http://127.0.0.1:" + debugPort + "/json/list")).json()), "browser debugging port");
    socket = new WebSocket(targets.find(target => target.type === "page").webSocketDebuggerUrl);
    await new Promise((resolve, reject) => { socket.addEventListener("open", resolve, { once: true }); socket.addEventListener("error", reject, { once: true }); });
    let serial = 0;
    const requests = new Map();
    socket.addEventListener("message", event => {
      const message = JSON.parse(event.data);
      const pending = requests.get(message.id);
      if (!pending) return;
      clearTimeout(pending.timeout);
      requests.delete(message.id);
      if (message.error) pending.reject(new Error(message.error.message));
      else pending.resolve(message.result);
    });
    command = (method, params = {}) => new Promise((resolve, reject) => {
      const id = ++serial;
      const timeout = setTimeout(() => { requests.delete(id); reject(new Error("CDP timeout: " + method)); }, 30000);
      requests.set(id, { resolve, reject, timeout });
      socket.send(JSON.stringify({ id, method, params }));
    });
    const evaluate = async expression => {
      if (typeof expression === "function") expression = "(" + expression.toString() + ")()";
      const result = await command("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
      if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text);
      return result.result.value;
    };
    await command("Page.enable");
    await command("Network.enable");
    // External document contents require a separate manual check; keep audits deterministic.
    await command("Network.setBlockedURLs", { urls: ["*drive.google.com*", "*vercel-insights.com*"] });
    await command("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
    const viewport = async (width, height = 900, scale = 1) => {
      await command("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: scale, mobile: false });
      await sleep(80);
    };
    const navigate = async route => {
      const marker = "audit-" + serial;
      await evaluate(`window.__auditMarker = ${JSON.stringify(marker)}`);
      await command("Page.navigate", { url: origin + route });
      await eventually(() => evaluate(`window.__auditMarker !== ${JSON.stringify(marker)} && location.pathname === ${JSON.stringify(route)} && document.readyState === "complete" && !!document.querySelector("main")`), route);
      await sleep(180);
    };
    const key = async (key, code, virtualKeyCode, modifiers = 0) => {
      await command("Input.dispatchKeyEvent", { type: "keyDown", key, code, windowsVirtualKeyCode: virtualKeyCode, modifiers, ...(key === "Enter" ? { text: "\r" } : {}) });
      await command("Input.dispatchKeyEvent", { type: "keyUp", key, code, windowsVirtualKeyCode: virtualKeyCode, modifiers });
      await evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
    };
    const click = async selector => {
      await evaluate(`document.querySelector(${JSON.stringify(selector)}).click()`);
      await sleep(100);
    };
    await run({ command, evaluate, viewport, navigate, key, click, origin });
  } catch (error) {
    console.error(server?.log || "");
    throw error;
  } finally {
    if (socket?.readyState === WebSocket.OPEN) {
      await command("Browser.close").catch(() => {});
      await sleep(300);
      socket.close();
    }
    await stop(browser);
    await stop(server);
    const relative = path.relative(os.tmpdir(), scratch);
    assert.ok(relative && !relative.startsWith("..") && !path.isAbsolute(relative), "Browser cleanup must stay inside the temporary directory.");
    await rm(scratch, { recursive: true, force: true, maxRetries: 10, retryDelay: 200 });
  }
}
