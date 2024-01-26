import * as path from 'path';
import { config } from 'dotenv';
import { type PlaywrightTestConfig, devices } from "@playwright/test";

config({ path: path.resolve(process.cwd(), '.env.local') });
config({ path: path.resolve(process.cwd(), '.env') });

const port = 3038;

const pwConfig: PlaywrightTestConfig = {
  testDir: "./e2e",
  retries: 0,
  timeout: 10 * 1000,
  use: {
    baseURL: `http://localhost:${port}`,
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
    command: `make start-dist DATABASE_NAME=${process.env.DATABASE_NAME + '_test'} PORT=${port}`,
    reuseExistingServer: !process.env.CI,
    url: `http://localhost:${port}`,
  },
};

export default pwConfig;
