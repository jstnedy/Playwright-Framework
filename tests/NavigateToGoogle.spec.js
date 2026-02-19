const { test } = require('@playwright/test');

 test(`@Web Navigate to Google`, async ({ page }) => {
    await page.goto("https://google.com//");
    console.log("Successfully navigate to google");
 
  });