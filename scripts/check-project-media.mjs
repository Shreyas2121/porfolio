import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { existsSync } from "node:fs";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import net from "node:net";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const root = fileURLToPath(new URL("../", import.meta.url));
const require = createRequire(import.meta.url);
const axeSource = await readFile(require.resolve("axe-core/axe.min.js"), "utf8");
const fixture = path.join(root, "src/app/media-component-check");
const fixtureAssets = path.join(root, "public/__media-check");
const testBuild = path.join(root, ".next/media-browser-check");
const tsconfigPath = path.join(root, "tsconfig.json");
const originalTsconfig = await readFile(tsconfigPath, "utf8");
const scratchRoot = os.tmpdir();
const chrome = process.env.CHROME_PATH || [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/usr/bin/google-chrome", "/usr/bin/chromium", "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
].find(existsSync);
assert.ok(chrome, "Install Chrome/Edge or set CHROME_PATH to a browser executable.");
assert.ok(!existsSync(fixture), "The temporary test route already exists; refusing to overwrite it.");
assert.ok(!existsSync(fixtureAssets), "The temporary media asset directory already exists; refusing to overwrite it.");
assert.ok(!existsSync(testBuild), "The isolated test build already exists; refusing to overwrite it.");

async function freePort() {
  const server = net.createServer();
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  const port = server.address().port;
  await new Promise(resolve => server.close(resolve));
  return port;
}

const get = url => fetch(url, { signal: AbortSignal.timeout(10000) });

async function eventually(check, description, timeout = 60000) {
  const deadline = Date.now() + timeout;
  while (Date.now() < deadline) {
    try { const result = await check(); if (result) return result; } catch { /* Wait for the server/browser to be ready. */ }
    await new Promise(resolve => setTimeout(resolve, 150));
  }
  throw new Error("Timed out: " + description);
}

function launch(executable, args, env = process.env) {
  const child = spawn(executable, args, { cwd: root, env, windowsHide: true, stdio: ["ignore", "pipe", "pipe"] });
  child.log = "";
  child.stdout.on("data", data => { child.log = (child.log + data).slice(-8000); });
  child.stderr.on("data", data => { child.log = (child.log + data).slice(-8000); });
  child.on("error", error => { child.log += String(error); });
  return child;
}

async function stop(child) {
  if (!child?.pid || child.exitCode !== null) return;
  if (process.platform === "win32") {
    const killer = spawn("taskkill.exe", ["/PID", String(child.pid), "/T", "/F"], { windowsHide: true, stdio: "ignore" });
    await once(killer, "exit");
  } else {
    child.kill("SIGTERM");
    await once(child, "exit");
  }
  child.stdout.destroy();
  child.stderr.destroy();
  child.unref();
}

// Only delete paths created by this run, resolved inside their intended parent.
async function removeOwned(target, intendedParent) {
  const relative = path.relative(intendedParent, target);
  assert.ok(relative && !relative.startsWith("..") && !path.isAbsolute(relative), "Cleanup target must stay within its intended directory.");
  await rm(target, { recursive: true, force: true, maxRetries: 10, retryDelay: 200 });
}

const source = `import ProjectMediaSection from "@/components/project-media";
import type { ProjectMedia } from "@/lib/constants";
const visual = { src: "/projects/citeleaf-cover.svg", alt: "Test research workflow", width: 960, height: 600, caption: "Research screenshot fixture" };
const media: ProjectMedia[] = [
  { ...visual, id: "one", type: "screenshot", section: "gallery" },
  { ...visual, id: "two", src: "/projects/staymate-cover.svg", caption: "Booking screenshot fixture", type: "screenshot", section: "gallery" },
  { ...visual, id: "broken", src: "/__missing-test-image.svg", caption: "Broken screenshot fixture", type: "screenshot", section: "gallery" },
  { ...visual, id: "mobile", src: "/__media-check/mobile.svg", width: 390, height: 844, caption: "Portrait screenshot fixture", type: "screenshot", section: "gallery" },
  { ...visual, id: "diagram", type: "diagram", section: "architecture", caption: "Architecture fixture", explanation: "Test text equivalent for the architecture diagram. ".repeat(12), expanded: { src: "/__media-check/mobile.svg", width: 390, height: 844, alt: "Tall expanded diagram fixture" }, legend: [{ symbol: "Arrow", meaning: "Direction of the illustrated flow" }] },
  { ...visual, id: "workflow", type: "diagram", section: "workflows", caption: "Workflow figure fixture", explanation: "A workflow figure adjacent to its explanation." },
  { ...visual, id: "decision-later", type: "screenshot", section: "decisions", order: 2, caption: "Second decision fixture" },
  { ...visual, id: "decision-first", type: "screenshot", section: "decisions", order: 1, caption: "First decision fixture" },
  { id: "video", type: "video", section: "walkthrough", youtubeId: "BlVTIPPrUW0", poster: visual.src, width: 960, height: 600, title: "Test walkthrough", caption: "YouTube embed fixture; playback is not tested against the external service.", duration: "0:45", steps: ["Inspect the source.", "Follow the cited answer."] }
];
export default function Preview() { return <main id="main-content" tabIndex={-1} className="min-h-screen bg-page text-foreground"><h1>Media component checks</h1><ProjectMediaSection media={media} section="gallery" /><ProjectMediaSection media={media} section="walkthrough" /><section aria-label="Architecture"><ProjectMediaSection media={media} section="architecture" /></section><section aria-label="Workflow figures"><ProjectMediaSection media={media} section="workflows" /></section><section aria-label="Decision figures"><ProjectMediaSection media={media} section="decisions" /></section></main>; }
`;

let server;
let browser;
let socket;
let scratch;
let createdFixture = false;
let createdAssets = false;
let inspectBrowser;
try {
  await mkdir(fixture);
  createdFixture = true;
  await writeFile(path.join(fixture, "page.tsx"), source);
  await mkdir(fixtureAssets);
  createdAssets = true;
  await writeFile(path.join(fixtureAssets, "mobile.svg"), '<svg xmlns="http://www.w3.org/2000/svg" width="390" height="844" viewBox="0 0 390 844"><rect width="390" height="844" fill="#f8fafc"/><text x="30" y="70" font-size="24" fill="#0f172a">Portrait test fixture</text><rect x="30" y="110" width="330" height="600" fill="#d1fae5"/><text x="30" y="800" font-size="24" fill="#0f172a">Bottom remains visible</text></svg>');
  await mkdir(scratchRoot, { recursive: true });
  scratch = await mkdtemp(path.join(scratchRoot, "portfolio-media-check-"));
  const port = await freePort();
  const debugPort = await freePort();
  const origin = "http://127.0.0.1:" + port;
  server = launch(process.execPath, ["node_modules/next/dist/bin/next", "dev", "-p", String(port)], { ...process.env, PORTFOLIO_MEDIA_TEST: "1" });
  browser = launch(chrome, ["--headless=new", "--disable-gpu", "--no-first-run", "--no-default-browser-check", "--disable-extensions", "--disable-background-networking", "--remote-debugging-port=" + debugPort, "--user-data-dir=" + path.join(scratch, "profile"), "about:blank"]);
  await writeFile(path.join(scratch, "processes.json"), JSON.stringify({ server: server.pid, browser: browser.pid, port, debugPort }));
  console.log("Started test server and headless browser", { port, debugPort });
  const targets = await eventually(async () => (await (await get("http://127.0.0.1:" + debugPort + "/json/list")).json()), "Chrome debugging port");
  console.log("Browser ready; waiting for test route compilation.");
  await eventually(async () => (await get(origin + "/media-component-check")).ok, "test route compilation");
  socket = new WebSocket(targets.find(target => target.type === "page").webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { socket.addEventListener("open", resolve, { once: true }); socket.addEventListener("error", reject, { once: true }); });
  const pending = new Map();
  let serial = 0;
  socket.addEventListener("message", event => {
    const message = JSON.parse(event.data);
    if (!message.id) return;
    const request = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) request?.reject(new Error(message.error.message));
    else request?.resolve(message.result);
  });
  function command(method, params = {}) {
    const id = ++serial;
    return new Promise((resolve, reject) => {
      pending.set(id, { resolve, reject });
      socket.send(JSON.stringify({ id, method, params }));
    });
  }
  async function evaluate(expression) {
    if (typeof expression === "function") expression = "(" + expression.toString() + ")()";
    const response = await command("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
    if (response.exceptionDetails) throw new Error(response.exceptionDetails.text + ": " + response.exceptionDetails.exception?.description);
    return response.result.value;
  }
  inspectBrowser = () => evaluate(() => ({ url: location.href, width: innerWidth, scrollY, focused: document.activeElement.id, activeSection: document.querySelector('nav[aria-label="Case study contents"] a[aria-current]')?.getAttribute("href"), decisionsTop: document.getElementById("decisions")?.getBoundingClientRect().top, railTop: document.querySelector("aside")?.getBoundingClientRect().top, anchorOffset: document.getElementById("decisions") ? getComputedStyle(document.getElementById("decisions")).scrollMarginTop : null }));
  async function navigate(route) {
    const marker = "navigation-" + Date.now() + "-" + serial;
    await evaluate(`window.__portfolioCheckNavigation = ${JSON.stringify(marker)}`);
    const navigation = await command("Page.navigate", { url: origin + route });
    const pathname = route.split("#")[0];
    const heading = {
      "/": "I build real-time products",
      "/projects": "Products designed beyond",
      "/projects/unified-multi-sport-architecture": "Unified multi-sport architecture",
      "/projects/citeleaf": "Citeleaf",
      "/media-component-check": "Media component checks",
    }[pathname];
    await eventually(() => evaluate(`(${!navigation.loaderId} || window.__portfolioCheckNavigation !== ${JSON.stringify(marker)}) && location.pathname === ${JSON.stringify(pathname)} && document.readyState === "complete" && document.querySelector("h1")?.textContent.includes(${JSON.stringify(heading)})`), "navigation " + route);
    await evaluate('new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))');
  }
  async function click(selector) {
    await evaluate(`document.querySelector(${JSON.stringify(selector)}).click()`);
  }
  async function key(key, code, virtualKeyCode) {
    await command("Input.dispatchKeyEvent", { type: "keyDown", key, code, windowsVirtualKeyCode: virtualKeyCode, ...(key === "Enter" ? { text: "\r" } : {}) });
    await command("Input.dispatchKeyEvent", { type: "keyUp", key, code, windowsVirtualKeyCode: virtualKeyCode });
  }
  await command("Page.enable");
  await command("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
  console.log("Checking media interactions.");
  await navigate("/media-component-check");
  await eventually(() => evaluate('Array.from(document.images).every(image => image.complete)'), "fixture images");
  await evaluate(axeSource);
  for (const dark of [false, true]) {
    await evaluate(`document.documentElement.classList.toggle("dark", ${dark})`);
    const audit = await evaluate(async () => {
      const result = await window.axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"] } });
      return result.violations.map(issue => ({ id: issue.id, nodes: issue.nodes.map(node => ({ target: node.target, summary: node.failureSummary })) }));
    });
    assert.deepEqual(audit, [], "Media fixture accessibility: " + JSON.stringify(audit));
  }
  assert.equal(await evaluate(() => document.querySelector('section[aria-label="Decision figures"] figcaption p').textContent), "First decision fixture", "Figures follow explicit order");
  assert.ok(await evaluate(() => !!document.querySelector('section[aria-label="Workflow figures"] figure')), "Workflow figures render beside their section");
  await evaluate('document.querySelector("button[aria-haspopup=dialog]").focus()');
  await click('button[aria-haspopup="dialog"]');
  await eventually(() => evaluate('!!document.querySelector("dialog[open]")'), "dialog hydration");
  assert.equal(await evaluate('document.activeElement.textContent'), "Close visual");
  assert.equal(await evaluate('document.body.style.overflow'), "hidden");
  const accessibleTree = await command("Accessibility.getFullAXTree");
  assert.ok(accessibleTree.nodes.some(node => !node.ignored && node.role?.value === "dialog" && node.name?.value === "Research screenshot fixture"), "Expanded visual exposes its dialog role and caption to assistive technology");
  assert.ok(accessibleTree.nodes.some(node => !node.ignored && node.role?.value === "status" && node.properties?.some(property => property.name === "live" && property.value?.value === "polite")), "Zoom status is announced politely");
  const dialogAudit = await evaluate(async () => {
    const result = await window.axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"] } });
    return result.violations.map(issue => ({ id: issue.id, targets: issue.nodes.map(node => node.target) }));
  });
  assert.deepEqual(dialogAudit, [], "Open media dialog accessibility: " + JSON.stringify(dialogAudit));
  for (let index = 0; index < 10; index++) {
    await key("Tab", "Tab", 9);
    assert.ok(await evaluate('!!document.activeElement.closest("dialog[open]")'), "Dialog contains keyboard focus");
  }
  await click('dialog[open] button[aria-label="Zoom in"]');
  await eventually(() => evaluate('document.querySelector("dialog[open] [role=status]").textContent === "150%"'), "zoom update");
  await evaluate('Array.from(document.querySelectorAll("dialog[open] button")).find(button => button.textContent === "Reset zoom").click()');
  await eventually(() => evaluate('document.querySelector("dialog[open] [role=status]").textContent === "100%"'), "zoom reset");
  await key("Escape", "Escape", 27);
  await eventually(() => evaluate('!document.querySelector("dialog[open]") && document.body.style.overflow !== "hidden"'), "Escape dismissal and scroll restoration");
  assert.equal(await evaluate('document.activeElement.textContent'), "Enlarge");
  await evaluate(() => document.querySelector('[aria-label="Project screenshots"]').focus());
  await key("End", "End", 35);
  await eventually(() => evaluate(() => document.querySelector('#gallery figcaption p').textContent === "Portrait screenshot fixture"), "Gallery End key");
  assert.equal(await evaluate(() => document.querySelector('#gallery figure img').parentElement.style.aspectRatio), "390 / 844", "Portrait screenshot keeps intrinsic dimensions");
  await key("ArrowLeft", "ArrowLeft", 37);
  await eventually(() => evaluate(() => document.querySelector('#gallery figcaption p').textContent === "Broken screenshot fixture"), "Gallery left arrow");
  await key("Home", "Home", 36);
  await eventually(() => evaluate(() => document.querySelector('#gallery figcaption p').textContent === "Research screenshot fixture"), "Gallery Home key");
  await evaluate('Array.from(document.querySelectorAll("button")).find(button => button.textContent === "Next image").click()');
  await eventually(() => evaluate('document.querySelector("#gallery figcaption p").textContent === "Booking screenshot fixture"'), "gallery selection");
  assert.equal(await evaluate('document.querySelector("#gallery button[aria-pressed=true]").getAttribute("aria-label")'), "Show screenshot 2: Booking screenshot fixture");
  await evaluate('Array.from(document.querySelectorAll("button")).find(button => button.textContent === "Next image").click()');
  await eventually(() => evaluate('document.querySelector("#gallery").textContent.includes("This visual could not be loaded.")'), "image failure fallback");
  assert.equal(await evaluate('document.querySelector("video, #walkthrough iframe")'), null, "No player before playback");
  await command("Network.setBlockedURLs", { urls: ["*youtube-nocookie.com*", "*youtube.com*"] });
  await click('#walkthrough button');
  await eventually(() => evaluate('!!document.querySelector("#walkthrough iframe")'), "YouTube embed mounted after Play");
  const embed = await evaluate(() => {
    const frame = document.querySelector("#walkthrough iframe");
    const link = document.querySelector('#walkthrough a[href^="https://www.youtube.com/watch"]');
    return { src: frame.src, title: frame.title, fullScreen: frame.allowFullscreen, referrer: frame.referrerPolicy, focused: document.activeElement === frame, watch: link.href, target: link.target, nativeVideo: !!document.querySelector("video") };
  });
  assert.equal(embed.src, "https://www.youtube-nocookie.com/embed/BlVTIPPrUW0?autoplay=1&playsinline=1&rel=0");
  assert.equal(embed.title, "Test walkthrough — YouTube video");
  assert.ok(embed.fullScreen && embed.focused);
  assert.equal(embed.referrer, "strict-origin-when-cross-origin");
  assert.equal(embed.watch, "https://www.youtube.com/watch?v=BlVTIPPrUW0");
  assert.equal(embed.target, "_blank");
  assert.equal(embed.nativeVideo, false);
  assert.ok(await evaluate('document.querySelector("#walkthrough").textContent.includes("Written walkthrough")'), "Written alternative remains available");
  await command("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 1, mobile: false });
  await click('section[aria-label="Architecture"] button[aria-haspopup="dialog"]');
  await eventually(() => evaluate('!!document.querySelector("dialog[open]")'), "mobile diagram viewer");
  assert.ok(await evaluate('document.querySelector("dialog[open]").getBoundingClientRect().width <= innerWidth'), "Dialog fits mobile viewport");
  assert.equal(await evaluate(() => document.querySelector('dialog[open] img').parentElement.style.aspectRatio), "390 / 844", "Expanded diagrams use their own dimensions");
  const mobileScreenshot = await command("Page.captureScreenshot", { format: "png" });
  await writeFile(path.join(root, ".next/media-viewer-check.png"), Buffer.from(mobileScreenshot.data, "base64"));
  await key("Escape", "Escape", 27);
  await eventually(() => evaluate(() => !document.querySelector('dialog[open]') && document.body.style.overflow !== "hidden"), "Mobile viewer finishes closing");
  for (const [width, height] of [[320, 568], [667, 375], [1440, 900]]) {
    await command("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: false });
    for (const dark of [false, true]) {
      console.log("Checking viewer", { width, height, dark });
      await evaluate(`document.documentElement.classList.toggle("dark", ${dark})`);
      await click('section[aria-label="Architecture"] button[aria-haspopup="dialog"]');
      await eventually(() => evaluate(() => !!document.querySelector('dialog[open]')), "Viewer opens");
      assert.ok(await evaluate(() => {
        const dialog = document.querySelector('dialog[open]');
        const viewport = dialog.querySelector('[aria-label^="Expanded visual"]');
        const close = [...dialog.querySelectorAll('button')].find(button => button.textContent === "Close visual");
        return dialog.getBoundingClientRect().bottom <= innerHeight && viewport.clientHeight > 40 && close.getBoundingClientRect().bottom <= innerHeight;
      }), `Close control and visual remain usable at ${width}x${height}`);
      await click('dialog[open] button[aria-label="Zoom in"]');
      await click('dialog[open] button[aria-label="Zoom in"]');
      await eventually(() => evaluate(() => document.querySelector('dialog[open] [role="status"]').textContent === "200%"), "Zoom for contained panning");
      await evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
      await eventually(() => evaluate(() => {
        const viewport = document.querySelector('dialog[open] [aria-label^="Expanded visual"]');
        return viewport.scrollWidth > viewport.clientWidth;
      }), "Zoomed image layout is ready");
      const panning = await evaluate(() => {
        const viewport = document.querySelector('dialog[open] [aria-label^="Expanded visual"]');
        viewport.scrollTo({ left: 50, behavior: "instant" });
        return { left: viewport.scrollLeft, documentWidth: document.documentElement.scrollWidth, viewportWidth: innerWidth };
      });
      if (panning.left === 0) {
        const zoomFailure = await command("Page.captureScreenshot", { format: "png" });
        await writeFile(path.join(root, ".next/zoom-failure.png"), Buffer.from(zoomFailure.data, "base64"));
      }
      assert.ok(panning.left > 0, "Zoomed visual pans inside the viewer: " + JSON.stringify(panning));
      assert.ok(panning.documentWidth <= panning.viewportWidth, "Viewer keeps page width stable: " + JSON.stringify(panning));
      await key("Escape", "Escape", 27);
      await eventually(() => evaluate(() => !document.querySelector('dialog[open]') && document.body.style.overflow !== "hidden"), "Viewer closes");
      await evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
    }
  }
  console.log("Checking case-study contents and resume affordances.");
  await command("Emulation.setDeviceMetricsOverride", { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  await navigate("/projects/citeleaf");
  await click('nav[aria-label="Case study contents"] a[href="#decisions"]');
  await eventually(() => evaluate(() => document.querySelector('nav[aria-label="Case study contents"] a[aria-current]')?.getAttribute("href") === "#decisions" && document.getElementById("decisions").getBoundingClientRect().top >= 90 && document.getElementById("decisions").getBoundingClientRect().top <= 120), "desktop anchor and active section");
  assert.equal(await evaluate('document.activeElement.id'), "decisions", "Anchor moves keyboard focus to the reading section");
  assert.ok(await evaluate('Math.abs(document.querySelector("aside").getBoundingClientRect().top - 96) < 2'), "Desktop contents rail sticks below the navbar");
  const desktopContents = await command("Page.captureScreenshot", { format: "png" });
  await writeFile(path.join(root, ".next/contents-desktop-check.png"), Buffer.from(desktopContents.data, "base64"));
  await evaluate('window.scrollTo(0, document.getElementById("workflows").getBoundingClientRect().top + scrollY - 96)');
  await eventually(() => evaluate(() => document.querySelector('nav[aria-label="Case study contents"] a[aria-current]')?.getAttribute("href") === "#workflows"), "Active section follows manual scrolling");
  await navigate("/projects/citeleaf#architecture");
  await eventually(() => evaluate(() => document.querySelector('nav[aria-label="Case study contents"] a[aria-current]')?.getAttribute("href") === "#architecture"), "Direct section URL");
  await command("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 1, mobile: false });
  await navigate("/projects/citeleaf");
  await evaluate('document.getElementById("overview").scrollIntoView(); document.querySelector("aside summary").focus()');
  await evaluate(() => new Promise(resolve => setTimeout(resolve, 250)));
  await evaluate(() => document.querySelector("aside summary").focus());
  await key("Enter", "Enter", 13);
  await eventually(() => evaluate('document.querySelector("aside details").open'), "Mobile contents opens with the keyboard");
  await click('nav[aria-label="Case study sections"] a[href="#architecture"]');
  await eventually(() => evaluate('!document.querySelector("aside details").open && document.activeElement.id === "architecture" && document.getElementById("architecture").getBoundingClientRect().top >= 150 && document.getElementById("architecture").getBoundingClientRect().top <= 180'), "Mobile section jump, dismissal and focus");
  assert.ok(await evaluate('document.querySelector("aside summary").textContent.includes("Architecture")'), "Mobile control identifies the current section");
  assert.ok(await evaluate('document.querySelector("#architecture h2").getBoundingClientRect().top >= document.querySelector("aside details").getBoundingClientRect().bottom'), "Heading clears the mobile contents control");
  const mobileContents = await command("Page.captureScreenshot", { format: "png" });
  await writeFile(path.join(root, ".next/contents-mobile-check.png"), Buffer.from(mobileContents.data, "base64"));
  await navigate("/");
  assert.ok(await evaluate(() => !!document.querySelector('#top a[href="/resume"] svg.lucide-file-text')), "Hero uses a document icon to view the resume");
  assert.ok(await evaluate(() => !!document.querySelector('header a[href="/resume"] svg.lucide-file-text')), "Navbar uses a document icon to view the resume");
  const downloadIcon = await evaluate('fetch("/resume").then(response => response.text()).then(html => { const doc = new DOMParser().parseFromString(html, "text/html"); const link = Array.from(doc.querySelectorAll("a")).find(item => item.textContent.includes("Download PDF")); return !!link?.querySelector("svg.lucide-download"); })');
  assert.ok(downloadIcon, "PDF download retains its download icon");
  console.log("Checking responsive routes in both themes.");
  for (const width of [320, 390, 768, 1440]) {
    await command("Emulation.setDeviceMetricsOverride", { width, height: 900, deviceScaleFactor: 1, mobile: false });
    for (const route of ["/", "/projects", "/projects/unified-multi-sport-architecture", "/projects/citeleaf"]) {
      await navigate(route);
      for (const dark of [false, true]) {
        await evaluate(`document.documentElement.classList.toggle("dark", ${dark})`);
        assert.ok(await evaluate('document.documentElement.scrollWidth <= innerWidth'), `No horizontal overflow: ${route}, ${width}px, ${dark ? "dark" : "light"}`);
        if (width === 1440 && route === "/projects") {
          await evaluate('new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))');
          const screenshot = await command("Page.captureScreenshot", { format: "png" });
          await writeFile(path.join(root, `.next/work-index-${dark ? "dark" : "light"}-check.png`), Buffer.from(screenshot.data, "base64"));
        }
        if (width === 1440 && route === "/" && !dark) {
          const screenshot = await command("Page.captureScreenshot", { format: "png" });
          await writeFile(path.join(root, ".next/home-composition-check.png"), Buffer.from(screenshot.data, "base64"));
        }
      }
    }
  }
  const slugs = ["unified-multi-sport-architecture", "real-time-table-tennis-integration", "resilient-external-data-services", "prediction-market-trading-platform", "citeleaf", "staymate", "archboard", "food-delivery-platform"];
  const index = await (await fetch(origin + "/projects")).text();
  for (const slug of slugs) {
    assert.ok(index.includes('href="/projects/' + slug + '"'), "Index links to " + slug);
    assert.equal((await fetch(origin + "/projects/" + slug)).status, 200, "Detail route " + slug);
    const detailHtml = (await (await fetch(origin + "/projects/" + slug)).text()).replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "");
    const anchors = Array.from(detailHtml.matchAll(/href="#([^"]+)"/g), match => match[1]);
    assert.ok(anchors.length > 0, "Contents exist for " + slug);
    for (const anchor of anchors) assert.ok(detailHtml.includes('id="' + anchor + '"'), "Contents destination exists: " + slug + "#" + anchor);
  }
  const empty = await (await fetch(origin + "/projects/staymate")).text();
  assert.ok(!empty.includes('id="gallery"') && !empty.includes('id="walkthrough"'), "Missing media sections collapse");
  assert.equal((await fetch(origin + "/projects/unknown-project")).status, 404, "Unknown project returns 404");
  console.log("Browser checks passed: all eight case studies, media controls, sticky contents, active sections, direct section URLs, mobile contents keyboard access and focus, resume icons, and both themes at 320/390/768/1440px.");
} catch (error) {
  console.error(error);
  if (inspectBrowser && socket?.readyState === WebSocket.OPEN) console.error(await inspectBrowser());
  if (server) console.error(server.log);
  if (browser) console.error(browser.log);
  process.exitCode = 1;
} finally {
  // Chrome can relaunch itself and outlive its launcher PID on Windows.
  // Shut down through CDP before falling back to process-tree termination.
  if (socket?.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify({ id: 999999, method: "Browser.close" }));
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  socket?.close();
  await stop(browser);
  await stop(server);
  // Allow terminated compiler workers to release their last cache writes.
  await new Promise(resolve => setTimeout(resolve, 500));
  if (createdFixture) await removeOwned(fixture, path.join(root, "src/app"));
  if (createdAssets) await removeOwned(fixtureAssets, path.join(root, "public"));
  if (server && existsSync(testBuild)) await removeOwned(testBuild, path.join(root, ".next"));
  // Undo only Next's test-directory include; preserve any unrelated edits.
  const currentTsconfig = JSON.parse(await readFile(tsconfigPath, "utf8"));
  currentTsconfig.include = currentTsconfig.include?.filter(entry => entry !== ".next/media-browser-check/types/**/*.ts");
  const normaliseConfig = config => ({ ...config, include: [...config.include].sort() });
  if (JSON.stringify(normaliseConfig(currentTsconfig)) === JSON.stringify(normaliseConfig(JSON.parse(originalTsconfig)))) await writeFile(tsconfigPath, originalTsconfig);
  if (scratch) await removeOwned(scratch, scratchRoot);
}
