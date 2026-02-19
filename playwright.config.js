// @ts-check
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: process.env.CI ? 1 : 1,
  timeout: 90000,
  expect: { timeout: 90000 },

  workers: process.env.CI ? 2 : 5,

  reporter: [
    ['html', { open: process.env.CI ? 'never' : 'always' }],
    ['allure-playwright'],
  ],

 use: {
  browserName: 'chromium',
  headless: !!process.env.CI,          // headed locally, headless in CI
  screenshot: 'only-on-failure',
  video: 'retain-on-failure',
  trace: 'on-first-retry',
},
});
