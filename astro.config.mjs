// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import markdoc from "@astrojs/markdoc";
import keystatic from "@keystatic/astro";
import node from "@astrojs/node";

export default defineConfig({
  site: "https://binhvuong.ai.vn",
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
  trailingSlash: "always",

  integrations: [
    tailwind(),
    sitemap({
      filter: (page) =>
        !page.includes("/thank-you/") &&
        !page.includes("/admin/") &&
        !page.includes("/keystatic/"),
    }),
    mdx(),
    react(),
    markdoc(),
    keystatic(),
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
