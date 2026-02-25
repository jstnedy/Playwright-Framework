const { Before, After, BeforeStep, AfterStep } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');
const { RegistrationPage } = require('../../pageObjects/RegistrationPage');
const { LoginPage } = require('../../pageObjects/LoginPage');
const { DashboardPage } = require('../../pageObjects/DashboardPage');
const { CheckoutPage } = require('../../pageObjects/CheckOutPage');
const { OrderHistoryPage } = require('../../pageObjects/OrdersHistoryPage');

Before(async function () {
  this.browser = await chromium.launch({ headless: !!process.env.CI });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();

  this.page.setDefaultTimeout(60_000);
  this.page.setDefaultNavigationTimeout(60_000);

  this.pages = {
    registrationPage: new RegistrationPage(this.page),
    loginPage: new LoginPage(this.page),
    dashboardPage: new DashboardPage(this.page),
    checkOutPage: new CheckoutPage(this.page),
    orderHistoryPage: new OrderHistoryPage(this.page)
  };
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
