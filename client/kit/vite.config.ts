import path from "path";
import { sveltekit } from "@sveltejs/kit/vite";
import type { UserConfig } from "vite";
import tailwindcss from "tailwindcss";
import purgecss from "@fullhuman/postcss-purgecss";
import cssnano from "cssnano";

const config: UserConfig = {
  plugins: [sveltekit()],
  server: {
    port: 3003,
    base: "/kit",
    hmr: {
      path: "/kit",
    },
  },
  resolve: {
    alias: {
      src: path.resolve("./src"),
    },
  },
  css: {
    postcss: {
      plugins: [
        tailwindcss("./tailwind.config.cjs"),
        purgecss({
          content: ["./src/app.html", "./src/**/*.svelte"],
          safelist: {
            standard: [/^(event-)\w*/],
            deep: [/^(dark)/],
          },
          defaultExtractor: (content) => content.match(/[A-Za-z0-9-_:/]+/g) || [],
        }),
        cssnano({
          preset: "default",
        }),
      ],
    },
  },
};

export default config;
