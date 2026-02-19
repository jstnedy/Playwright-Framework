const { test } = require('@playwright/test');

 test(`@Web Navigate to Pornhub`, async ({ page }) => {
    await page.goto("https://pornhub.com//");
    console.log("Successfully navigate to pornhub");
 
  });