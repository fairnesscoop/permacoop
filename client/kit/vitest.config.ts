/// <reference types="vitest" />
import path from "path";
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import config from "./vite.config";

export default defineConfig({
  ...config,
  resolve: {
    alias: {
      ...config?.resolve?.alias,
      $lib: path.resolve("./src/lib"),
      // Add any alias resolutions that should be mocked, because
      // they are not available unless SvelteKit runs.
      "$app/environment": path.resolve("./tests/app.environment.mock.ts"),
      "$app/navigation": path.resolve("./tests/app.navigation.mock.ts"),
      "$app/stores": path.resolve("./tests/app.stores.mock.ts"),
    },
  },
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
    setupFiles: [path.resolve("./tests/setup.ts")],
  },
});
