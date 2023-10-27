import { type PlaywrightTestConfig, devices } from "@playwright/test";

const config: PlaywrightTestConfig = {
  testDir: "./e2e",
  retries: 0,
  timeout: 10 * 1000,
  use: {
    baseURL: "http://localhost:3000",
    browserName: "firefox",
    headless: true,
    screenshot: "only-on-failure",
    video: "on-first-retry",
  },
  projects: [
    { name: 'setup', testMatch: /.*\.setup\.js/ },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
      dependencies: ['setup'],
    },
  ],
  webServer: {
    command: 'make start-dist',
    reuseExistingServer: !process.env.CI,
    url: 'http://localhost:3000',
    env: {
      DATABASE_NAME: 'permacoop_test',
    }
  },
};

export default config;
