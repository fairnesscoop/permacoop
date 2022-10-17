import path from "path";
import { sveltekit } from "@sveltejs/kit/vite";
import type { UserConfig } from "vite";

const config: UserConfig = {
  plugins: [sveltekit()],
  server: { port: 3003 },
  resolve: {
    alias: {
      src: path.resolve("./src"),
    },
  },
};

export default config;
