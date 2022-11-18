/// <reference types="vitest" />
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import config from "./vite.config";

export default defineConfig({
  ...config,
  plugins: [
    svelte({
      hot: !process.env.VITEST,
    }),
  ],
  test: {
    globals: true,
    environment: "node",
    exclude: [
      "**/e2e/**",
      "**/node_modules/**",
      "**/dist/**",
      "**/.{idea,git,cache,output,temp}/**",
    ],
  },
});
