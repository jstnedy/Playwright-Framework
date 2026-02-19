const { Before, After, BeforeStep, AfterStep } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');
const { PageObjectManager } = require('../../pageObjects/PageObjectManager');

Before(async function () {
  this.browser = await chromium.launch({ headless: false });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();

  this.page.setDefaultTimeout(60_000);
  this.page.setDefaultNavigationTimeout(60_000);

  this.pageObjectManager = new PageObjectManager(this.page);
});

After(async function () {
  if (this.page) await this.page.close();
  if (this.context) await this.context.close();
  if (this.browser) await this.browser.close();
  console.log("I am last to execute.");
});

BeforeStep(async function () {

});

AfterStep(async function (result) {
  if (result.status === 'FAILED') {
    await this.page.screenshot({ path: 'failed-screenshot.png' });
  }
});
