// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

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
  vite: {
    plugins: [tailwindcss()],
  },
});
