import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './e2e/',
  retries: 1,
  use: {
    baseURL: 'http://localhost:3001',
    browserName: 'firefox',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'on-first-retry'
  }
};

export default config;
