// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import cvPdf from "./integrations/cv-pdf.mjs";

// https://astro.build/config
export default defineConfig({
  site: "https://miketalbot.io",
  // Old Jekyll URLs -> new locations, so existing links don't 404
  redirects: {
    "/about": "/",
    "/publications": "/#publications",
    "/talks": "/#talks",
    "/resume": "/cv",
    // Posts moved to the Quarto blog repo, served at /blog
    "/posts/2024-12-31-in-defense-of-acre-feet":
      "/blog/posts/2024-12-31-in-defense-of-acre-feet/",
    "/posts/2026-01-21-out-of-bounds-on-purpose-legendry":
      "/blog/posts/2026-01-21-out-of-bounds-on-purpose-legendry/",
  },
  integrations: [cvPdf()],
  vite: {
    plugins: [tailwindcss()],
  },
});
