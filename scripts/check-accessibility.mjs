import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { sleep, withProductionBrowser } from "./lib/browser-check.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
const require = createRequire(import.meta.url);
const axe = await readFile(require.resolve("axe-core/axe.min.js"), "utf8");
const manifest = JSON.parse(await readFile(path.join(root, ".next/prerender-manifest.json"), "utf8"));
const routes = [...new Set(["/", "/projects", "/experience", "/resume", ...Object.keys(manifest.routes).filter(route => route.startsWith("/projects/")), "/missing-page"])];
const output = path.join(root, "docs/verification/section-9");
await mkdir(output, { recursive: true });
const auditOnly = process.argv.includes("--audit-only");
const report = { generatedAt: new Date().toISOString(), routes, axeVersion: require("axe-core/package.json").version, accessibility: [], responsive: [], keyboard: [], media: [], performance: [], limitations: ["Automated checks do not establish full accessibility conformance or replace assistive-technology testing.", "Zoom checks use a halved CSS viewport and doubled device scale to reproduce 200% browser-zoom reflow, rather than browser UI zoom.", "Cross-origin Google Drive content is excluded; external resume access was checked separately in section 8.", "Performance numbers are local laboratory samples, not field measurements or Lighthouse scores."] };

await withProductionBrowser(root, async browser => {
  const { command, evaluate, viewport, navigate, key, click } = browser;
  report.browser = await command("Browser.getVersion");
  const collectLayout = () => {
    const failures = [];
    const headings = [...document.querySelectorAll("main h1,main h2,main h3,main h4")].filter(el => el.getClientRects().length);
    if (headings.filter(el => el.tagName === "H1").length !== 1) failures.push("Expected one main heading");
    let previous = 0;
    for (const heading of headings) {
      const level = Number(heading.tagName[1]);
      if (previous && level > previous + 1) failures.push("Heading level skipped: " + heading.textContent.trim());
      previous = level;
    }
    if (document.documentElement.scrollWidth > innerWidth + 1) failures.push("Horizontal page overflow");
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (!node.textContent.trim() || node.parentElement.closest("script,style,svg,.sr-only,dialog:not([open])")) continue;
      const range = document.createRange();
      range.selectNodeContents(node);
      for (const rect of range.getClientRects()) {
        if (!rect.width || !rect.height) continue;
        if (rect.left < -1 || rect.right > innerWidth + 1) failures.push("Text outside viewport: " + node.textContent.trim().slice(0, 80));
        for (let parent = node.parentElement; parent && parent !== document.body; parent = parent.parentElement) {
          const style = getComputedStyle(parent);
          if (!["hidden", "clip"].includes(style.overflowX)) continue;
          const box = parent.getBoundingClientRect();
          if (rect.left < box.left - 1 || rect.right > box.right + 1) failures.push("Clipped text: " + node.textContent.trim().slice(0, 80));
        }
      }
    }
    return { width: innerWidth, failures: [...new Set(failures)], headingCount: headings.length };
  };
  const audit = async context => {
    await evaluate(axe);
    const result = await evaluate(async () => {
      const result = await window.axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"] }, resultTypes: ["violations", "incomplete"] });
      const compact = entries => entries.map(entry => ({ id: entry.id, impact: entry.impact, description: entry.description, helpUrl: entry.helpUrl, nodes: entry.nodes.map(node => ({ target: node.target, summary: node.failureSummary, html: node.html, checks: [...node.any, ...node.all, ...node.none].map(check => ({ id: check.id, data: check.data })) })) }));
      return { violations: compact(result.violations), incomplete: compact(result.incomplete) };
    });
    report.accessibility.push({ ...context, ...result });
  };

  console.log("Auditing all public routes and the 404 page.");
  for (const route of routes) {
    for (const width of [390, 1440]) {
      await viewport(width, 900);
      await navigate(route);
      for (const theme of ["light", "dark"]) {
        await evaluate(`document.documentElement.classList.toggle("dark", ${theme === "dark"})`);
        await sleep(80);
        await audit({ route, width, theme });
      }
    }
    const count = report.accessibility.filter(row => row.route === route).reduce((sum, row) => sum + row.violations.length, 0);
    console.log(route + ": " + count + " axe violations");
  }
  await writeFile(path.join(output, "report.json"), JSON.stringify(report, null, 2));
  if (auditOnly) return;

  console.log("Checking responsive layout and 200% zoom-equivalent reflow.");
  const sizes = [[320, 844, 1], [390, 844, 1], [768, 900, 1], [1024, 900, 1], [1440, 900, 1], [844, 390, 1], [320, 422, 2], [384, 450, 2], [512, 450, 2], [720, 450, 2]];
  for (const route of routes) {
    for (const [width, height, scale] of sizes) {
      await viewport(width, height, scale);
      await navigate(route);
      for (const theme of ["light", "dark"]) {
        await evaluate(`document.documentElement.classList.toggle("dark", ${theme === "dark"})`);
        await sleep(30);
        report.responsive.push({ route, width, height, scale, theme, ...await evaluate(collectLayout) });
      }
      if (route === "/" && [390, 1440].includes(width) && scale === 1) {
        for (const theme of ["light", "dark"]) {
          await evaluate(`document.documentElement.classList.toggle("dark", ${theme === "dark"})`);
          await sleep(50);
          const screenshot = await command("Page.captureScreenshot", { format: "png" });
          await writeFile(path.join(output, `home-${width}-${theme}.png`), Buffer.from(screenshot.data, "base64"));
        }
      }
    }
    console.log(route + ": responsive checks complete");
  }

  console.log("Checking keyboard paths, focus visibility and menu behavior.");
  for (const route of routes) {
    for (const width of [390, 1440]) {
      await viewport(width, 900);
      await navigate(route);
      await evaluate(() => { document.body.tabIndex = -1; document.body.focus(); });
      await key("Tab", "Tab", 9);
      assert.equal(await evaluate(() => document.activeElement.textContent.trim()), "Skip to main content");
      assert.ok(await evaluate(() => document.activeElement.getBoundingClientRect().bottom > 0), "Skip link is visible when focused");
      await key("Enter", "Enter", 13);
      assert.equal(await evaluate(() => document.activeElement.id), "main-content");
      await evaluate(() => {
        document.body.focus();
        window.__auditNodes = [...document.querySelectorAll("a[href],button:not(:disabled),summary,[tabindex='0']")].filter(el => el.getClientRects().length && !el.closest("dialog:not([open])") && (!el.closest("details:not([open])") || el.closest("summary")));
        document.querySelector("a[href='#main-content']").focus();
      });
      const count = await evaluate(() => window.__auditNodes.length);
      const visited = new Set([0]);
      const failures = [];
      for (let index = 0; index < count + 10; index++) {
        await key("Tab", "Tab", 9);
        const focused = await evaluate(() => {
          const el = document.activeElement;
          const rect = el.getBoundingClientRect();
          const header = document.querySelector("body > header").getBoundingClientRect();
          const style = getComputedStyle(el);
          const inHeader = el.closest("header") || el.textContent.trim() === "Skip to main content";
          return { index: window.__auditNodes.indexOf(el), name: el.getAttribute("aria-label") || el.textContent.trim().slice(0, 80), visible: rect.width > 0 && rect.bottom > (inHeader ? 0 : header.bottom) && rect.top < innerHeight, focusStyle: style.boxShadow !== "none" || style.outlineStyle !== "none" };
        });
        if (focused.index >= 0 && visited.has(focused.index)) break;
        if (focused.index >= 0) visited.add(focused.index);
        if (focused.index >= 0 && (!focused.visible || !focused.focusStyle)) failures.push(focused);
        if (visited.size === count) break;
      }
      if (visited.size !== count) failures.push({ missed: count - visited.size });
      report.keyboard.push({ route, width, focusStops: count, visited: visited.size, failures });
    }
  }
  await viewport(390, 844);
  await navigate("/");
  await click("button[aria-controls='mobile-menu']");
  await audit({ route: "/", width: 390, theme: "light", state: "menu open" });
  await evaluate(() => document.querySelector("#mobile-menu a").focus());
  await key("Escape", "Escape", 27);
  assert.ok(await evaluate(() => document.querySelector("#mobile-menu").hidden && document.activeElement.getAttribute("aria-controls") === "mobile-menu"));
  await click("button[aria-controls='mobile-menu']");
  await viewport(1024, 900);
  await viewport(390, 844);
  assert.ok(await evaluate(() => document.querySelector("#mobile-menu").hidden));
  await click("button[aria-controls='mobile-menu']");
  await click("#mobile-menu a[href='/#contact']");
  assert.ok(await evaluate(() => document.querySelector("#mobile-menu").hidden && document.activeElement.id === "contact"));

  console.log("Checking image sizing, deferred media and image failure fallback.");
  for (const route of routes.filter(route => route !== "/missing-page")) {
    await navigate(route);
    const result = await evaluate(() => ({
      issues: [...document.images].flatMap(image => {
        const rect = image.getBoundingClientRect();
        const parent = getComputedStyle(image.parentElement);
        const reserved = image.hasAttribute("width") && image.hasAttribute("height") || parent.aspectRatio !== "auto";
        const belowFold = rect.top > innerHeight;
        return [!reserved && "No reserved dimensions: " + image.alt, image.getAttribute("srcset") && !image.getAttribute("sizes") && image.getAttribute("data-nimg") === "fill" && "Missing responsive sizes: " + image.alt, belowFold && image.loading !== "lazy" && "Below-fold image is eager: " + image.alt].filter(Boolean);
      }),
      images: document.images.length,
      eagerPlayers: [...document.querySelectorAll("video,iframe")].length,
    }));
    if (route === "/" && result.eagerPlayers) result.issues.push("Homepage loads an eager video or iframe");
    report.media.push({ route, ...result });
  }
  await command("Network.setBlockedURLs", { urls: ["*drive.google.com*", "*vercel-insights.com*", "*/projects/*.svg", "*/_next/image*"] });
  await command("Network.setCacheDisabled", { cacheDisabled: true });
  await navigate("/");
  await evaluate(() => window.scrollTo(0, document.querySelector("#work").offsetTop));
  await sleep(500);
  assert.ok(await evaluate(() => document.querySelector("#work").textContent.includes("This visual could not be loaded.") && !!document.querySelector("#work a[href^='/projects/']")));
  report.media.push({ state: "Images blocked", passed: true, detail: "Failure messages, reserved frames and case-study links remain available." });
  await command("Network.setBlockedURLs", { urls: ["*drive.google.com*", "*vercel-insights.com*"] });

  console.log("Measuring cold-cache production page loads with mobile throttling.");
  await command("Emulation.setCPUThrottlingRate", { rate: 4 });
  await command("Network.emulateNetworkConditions", { offline: false, latency: 150, downloadThroughput: 1600000 / 8, uploadThroughput: 750000 / 8, connectionType: "cellular4g" });
  await viewport(390, 844);
  await command("Page.addScriptToEvaluateOnNewDocument", { source: `
    window.__lab = { lcp: 0, cls: 0, longTasks: [] };
    let sessionStart = 0, lastShift = 0, sessionValue = 0;
    new PerformanceObserver(list => { for (const entry of list.getEntries()) window.__lab.lcp = entry.startTime; }).observe({type:'largest-contentful-paint',buffered:true});
    new PerformanceObserver(list => { for (const entry of list.getEntries()) {
      if (entry.hadRecentInput) continue;
      if (entry.startTime-lastShift>1000 || entry.startTime-sessionStart>5000) { sessionStart=entry.startTime; sessionValue=0; }
      sessionValue+=entry.value; lastShift=entry.startTime; window.__lab.cls=Math.max(window.__lab.cls,sessionValue);
    }}).observe({type:'layout-shift',buffered:true});
    new PerformanceObserver(list => { for (const entry of list.getEntries()) window.__lab.longTasks.push(entry.duration); }).observe({type:'longtask',buffered:true});
  ` });
  report.performanceConditions = { viewport: "390x844", cpuSlowdown: 4, latencyMs: 150, downloadMbps: 1.6, uploadMbps: 0.75, samplesPerRoute: 3, observationAfterLoadMs: 3000, cache: "Browser cache disabled and cleared; warm local production server" };
  for (const route of ["/", "/projects", "/projects/citeleaf"]) {
    for (let sample = 1; sample <= 3; sample++) {
      await command("Network.clearBrowserCache");
      await navigate(route);
      await sleep(3000);
      const metrics = await evaluate(() => {
        const navigation = performance.getEntriesByType("navigation")[0];
        const fcp = performance.getEntriesByName("first-contentful-paint")[0];
        const resources = performance.getEntriesByType("resource").filter(entry => entry.name.startsWith(location.origin));
        return { ttfbMs: navigation.responseStart, fcpMs: fcp?.startTime ?? null, lcpMs: window.__lab.lcp, cls: window.__lab.cls, longTaskCount: window.__lab.longTasks.length, maxLongTaskMs: Math.max(0, ...window.__lab.longTasks), transferBytes: navigation.transferSize + resources.reduce((sum, resource) => sum + resource.transferSize, 0), localResources: resources.length };
      });
      report.performance.push({ route, sample, ...metrics });
      console.log(route + " sample " + sample + ": LCP " + Math.round(metrics.lcpMs) + "ms, CLS " + metrics.cls.toFixed(4));
    }
  }
});

await writeFile(path.join(output, "report.json"), JSON.stringify(report, null, 2));
const violations = report.accessibility.flatMap(row => row.violations.map(violation => ({ route: row.route, width: row.width, theme: row.theme, id: violation.id, targets: violation.nodes.map(node => node.target) })));
const layoutFailures = report.responsive.filter(row => row.failures.length);
const keyboardFailures = report.keyboard.filter(row => row.failures.length);
const mediaFailures = report.media.filter(row => row.issues?.length);
console.log(JSON.stringify({ routes: routes.length, axeAudits: report.accessibility.length, responsiveChecks: report.responsive.length, keyboardPaths: report.keyboard.length, violations, layoutFailures, keyboardFailures, mediaFailures, report: path.join(output, "report.json") }, null, 2));
if (violations.length || layoutFailures.length || keyboardFailures.length || mediaFailures.length) process.exitCode = 1;
