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
  },
  integrations: [cvPdf()],
  vite: {
    plugins: [tailwindcss()],
  },
});
