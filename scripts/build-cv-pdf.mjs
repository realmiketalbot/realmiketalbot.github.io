// Render the print CV (/cv/print) from the built site to dist/Talbot_CV.pdf.
// Runs after `astro build`. Uses an installed Chrome/Chromium via puppeteer-core.
//   CHROME_PATH=/path/to/chrome   override browser location
//   SKIP_CV_PDF=1                 skip PDF generation
import { createServer } from "node:http";
import { existsSync } from "node:fs";
import { readFile, stat } from "node:fs/promises";
import { extname, join, resolve } from "node:path";
import puppeteer from "puppeteer-core";

const DIST = resolve("dist");
const OUT = join(DIST, "Talbot_CV.pdf");
const NAME = "Michael T. Talbot";
const UPDATED = new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" });

if (process.env.SKIP_CV_PDF) {
  console.log("[cv-pdf] SKIP_CV_PDF set; skipping.");
  process.exit(0);
}

const chromePath =
  process.env.CHROME_PATH ||
  [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "/usr/bin/google-chrome",
    "/usr/bin/google-chrome-stable",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
  ].find(existsSync);

if (!chromePath) {
  console.error("[cv-pdf] No Chrome/Chromium found. Set CHROME_PATH, or SKIP_CV_PDF=1 to skip.");
  process.exit(1);
}

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

// Minimal static server for dist/ so absolute asset paths (/_astro/...) resolve
const server = createServer(async (req, res) => {
  try {
    let path = join(DIST, decodeURIComponent(new URL(req.url, "http://x").pathname));
    if (!path.startsWith(DIST)) throw new Error("outside dist");
    if ((await stat(path)).isDirectory()) path = join(path, "index.html");
    res.writeHead(200, { "Content-Type": TYPES[extname(path)] ?? "application/octet-stream" });
    res.end(await readFile(path));
  } catch {
    res.writeHead(404).end();
  }
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const { port } = server.address();

const browser = await puppeteer.launch({
  executablePath: chromePath,
  headless: true,
  args: ["--no-sandbox", "--font-render-hinting=none"],
});

try {
  const page = await browser.newPage();
  await page.emulateMediaType("print");
  await page.goto(`http://127.0.0.1:${port}/cv/print/`, { waitUntil: "networkidle0" });
  await page.evaluateHandle("document.fonts.ready");

  const footer = `
    <div style="width:100%; padding:0 0.75in; font-family:Helvetica,Arial,sans-serif; font-size:7.5pt; color:#6b7480; display:flex; justify-content:space-between;">
      <span>${NAME} · Curriculum Vitae · Updated ${UPDATED}</span>
      <span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
    </div>`;

  await page.pdf({
    path: OUT,
    format: "letter",
    preferCSSPageSize: true,
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: "<span></span>",
    footerTemplate: footer,
  });
  console.log(`[cv-pdf] Wrote ${OUT}`);
} finally {
  await browser.close();
  server.close();
}
