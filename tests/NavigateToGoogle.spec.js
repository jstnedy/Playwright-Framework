const { test } = require('@playwright/test');
const { GooglePage } = require('../pageObjects/GooglePage');

 test(`@Web Navigate to Google`, async ({ page }) => {
    const googlePage = new GooglePage(page);
    await googlePage.goToHomePage();
    console.log("Successfully navigate to google");
 
  });
