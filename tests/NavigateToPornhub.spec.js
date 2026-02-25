const { test } = require('@playwright/test');
const { PornhubPage } = require('../pageObjects/PornhubPage');

 test(`@Web Navigate to Pornhub`, async ({ page }) => {
    const pornhubPage = new PornhubPage(page);
    await pornhubPage.goToHomePage();
    console.log("Successfully navigate to pornhub");
 
  });
