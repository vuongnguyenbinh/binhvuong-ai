// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";

export default defineConfig({
  site: "https://binhvuong.ai.vn",
  output: "static",
  trailingSlash: "always",

  integrations: [
    tailwind(),
    sitemap({
      filter: (page) =>
        !page.includes("/thank-you/") && !page.includes("/admin/"),
    }),
    mdx(),
  ],

  markdown: {
    shikiConfig: {
      theme: "dracula",
    },
  },

  vite: {
    build: {
      cssMinify: true,
    },
  },
});
