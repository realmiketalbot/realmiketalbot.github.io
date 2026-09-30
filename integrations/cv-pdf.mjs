// Astro integration: renders the print CV (/cv/print) to /Talbot_CV.pdf.
//   - `astro build`: writes dist/Talbot_CV.pdf after the site is built
//   - `astro dev`:   serves /Talbot_CV.pdf on request, rendered from the live page
// Uses an installed Chrome/Chromium via puppeteer-core.
//   CHROME_PATH=/path/to/chrome   override browser location
//   SKIP_CV_PDF=1                 skip PDF generation during builds
import { createServer } from "node:http";
import { existsSync } from "node:fs";
import { readFile, stat, writeFile } from "node:fs/promises";
import { extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";

export const PDF_PATH = "/Talbot_CV.pdf";
const PRINT_PATH = "/cv/print/";
const NAME = "Michael T. Talbot";

const CHROME_CANDIDATES = [
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/usr/bin/google-chrome",
  "/usr/bin/google-chrome-stable",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
];

function findChrome() {
  const path = process.env.CHROME_PATH || CHROME_CANDIDATES.find(existsSync);
  if (!path) throw new Error("No Chrome/Chromium found. Set CHROME_PATH, or SKIP_CV_PDF=1 to skip.");
  return path;
}

/** Render the print CV at `url` to a PDF buffer. */
async function renderPdf(url) {
  const updated = new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" });
  const browser = await puppeteer.launch({
    executablePath: findChrome(),
    headless: true,
    args: ["--no-sandbox", "--font-render-hinting=none"],
  });
  try {
    const page = await browser.newPage();
    await page.emulateMediaType("print");
    await page.goto(url, { waitUntil: "networkidle0" });
    // Hide Astro's dev toolbar when rendering from the dev server
    await page.addStyleTag({ content: "astro-dev-toolbar { display: none !important; }" });
    await page.evaluateHandle("document.fonts.ready");
    return await page.pdf({
      format: "letter",
      preferCSSPageSize: true,
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: "<span></span>",
      footerTemplate: `
        <div style="width:100%; padding:0 0.75in; font-family:Helvetica,Arial,sans-serif; font-size:7.5pt; color:#6b7480; display:flex; justify-content:space-between;">
          <span>${NAME} · Curriculum Vitae · Updated ${updated}</span>
          <span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
        </div>`,
    });
  } finally {
    await browser.close();
  }
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

/** Serve a built site directory on a random local port so absolute asset paths resolve. */
async function serveStatic(root) {
  const server = createServer(async (req, res) => {
    try {
      let path = join(root, decodeURIComponent(new URL(req.url, "http://x").pathname));
      if (!path.startsWith(root)) throw new Error("outside root");
      if ((await stat(path)).isDirectory()) path = join(path, "index.html");
      res.writeHead(200, { "Content-Type": TYPES[extname(path)] ?? "application/octet-stream" });
      res.end(await readFile(path));
    } catch {
      res.writeHead(404).end();
    }
  });
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  return { server, base: `http://127.0.0.1:${server.address().port}` };
}

export default function cvPdf() {
  return {
    name: "cv-pdf",
    hooks: {
      "astro:server:setup": ({ server, logger }) => {
        server.middlewares.use(async (req, res, next) => {
          if (req.url?.split("?")[0] !== PDF_PATH) return next();
          try {
            const pdf = await renderPdf(`http://${req.headers.host}${PRINT_PATH}`);
            res.writeHead(200, { "Content-Type": "application/pdf", "Cache-Control": "no-store" });
            res.end(pdf);
          } catch (err) {
            logger.error(String(err));
            res.writeHead(500, { "Content-Type": "text/plain" }).end(`CV PDF failed: ${err.message}`);
          }
        });
      },

      "astro:build:done": async ({ dir, logger }) => {
        if (process.env.SKIP_CV_PDF) return logger.info("SKIP_CV_PDF set; skipping.");
        const root = fileURLToPath(dir);
        const { server, base } = await serveStatic(root);
        try {
          const out = join(root, PDF_PATH);
          await writeFile(out, await renderPdf(base + PRINT_PATH));
          logger.info(`Wrote ${out}`);
        } finally {
          server.close();
        }
      },
    },
  };
}
