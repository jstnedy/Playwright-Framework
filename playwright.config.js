// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  workers: 5,
  fullyParallel: true,
  retries: 1,
  timeout: 90000,
  expect: { timeout: 90000 },

  reporter: [
    ['html', { open: 'always' }],
    ['allure-playwright', {open: 'always'}],
  ],

  use: {
    browserName: 'chromium',
    headless: false,
    screenshot: 'on',
    video: 'on',
    trace: 'on',
  },
});
