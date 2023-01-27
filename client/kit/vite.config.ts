import path from "path";
import { sveltekit } from "@sveltejs/kit/vite";
import type { UserConfig } from "vite";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
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
        tailwindcss(),
        autoprefixer(),
        cssnano({
          preset: "default",
        }),
      ],
    },
  },
};

export default config;
