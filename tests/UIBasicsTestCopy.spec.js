const { PageObjectManager } = require('../pageObjects/PageObjectManager');
const { test } = require('@playwright/test');
const { customTest } = require('../test-data/test-base');
const products = require('../test-data/Products-all.json');

// 1. Data Driven Approach (run ALL products)
test.describe.configure({ mode: 'parallel' });

for (const data of products) {
  test(`@Web Page Playwright Test - ${data.productName}`, async ({ page }) => {
    const pageObjectManager = new PageObjectManager(page);
    const registrationPage = pageObjectManager.getRegistrationPage();
    const loginPage = pageObjectManager.getLoginPage();
    const dashboardPage = pageObjectManager.getDashboardPage();
    const checkOutPage = pageObjectManager.getCheckOutPage();
    const orderHistoryPage = pageObjectManager.getOrdersHistoryPage();

    await registrationPage.goToRegistration();
    const { registeredUsername, registeredPassword } = await registrationPage.validRegistration();
    await loginPage.validLogin(registeredUsername, registeredPassword);

    await dashboardPage.addItemToCart(data.productName);
    await dashboardPage.verifyItemAddedToCart(data.productName);
    await checkOutPage.checkOutItem();
    await orderHistoryPage.orderHistoryVerification(checkOutPage.orderRefNumber);
  });
}

// 2. Fixture Approach (run ONE specific product from fixture)
customTest(`@Web Page Playwright Tests using Fixture`, async ({ page, testDataForOrder }) => {
  const pageObjectManager = new PageObjectManager(page);
  const registrationPage = pageObjectManager.getRegistrationPage();
  const loginPage = pageObjectManager.getLoginPage();
  const dashboardPage = pageObjectManager.getDashboardPage();
  const checkOutPage = pageObjectManager.getCheckOutPage();
  const orderHistoryPage = pageObjectManager.getOrdersHistoryPage();

  await registrationPage.goToRegistration();
  const { registeredUsername, registeredPassword } = await registrationPage.validRegistration();
  await loginPage.validLogin(registeredUsername, registeredPassword);

  // uses only Zara Coat 3 from the fixture
  await dashboardPage.addItemToCart(testDataForOrder.productName1);
  await dashboardPage.verifyItemAddedToCart(testDataForOrder.productName1);
  await checkOutPage.checkOutItem();
  await orderHistoryPage.orderHistoryVerification(checkOutPage.orderRefNumber);
});