import type { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  testDir: "./e2e",
  globalSetup: "./e2e/global.setup.ts",
  retries: 1,
  workers: 1,
  timeout: 10 * 1000,
  use: {
    baseURL: "http://localhost:3001",
    browserName: "firefox",
    headless: true,
    screenshot: "only-on-failure",
    video: "on-first-retry",
  },
};

export default config;
