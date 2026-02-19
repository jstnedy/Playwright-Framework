const { PageObjectManager } = require('../pageObjects/PageObjectManager');
const { test } = require('@playwright/test');
// Import 'test' from your custom utility, not directly from playwright
const { customTest } = require('../utils/test-base'); 
const dataset = require('../utils/testData.json');

// 1. Data Driven Approach (Using the JSON array directly)
// ONLY IF RUNNING ALL PRODUCTS BY LOOPING
test.describe.configure({mode: 'parallel'});
for(const data of dataset){
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
    await orderHistoryPage.orderHistoryVerification();
  });
}

// 2. Fixture Approach (Using the data injected via test-base.js)
// ONLY IF RUNNING A SPECIFIC PRODUCT
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

    // Now using testDataForOrder from the fixture
    await dashboardPage.addItemToCart(testDataForOrder.productName1);
    await dashboardPage.verifyItemAddedToCart(testDataForOrder.productName1);
    await checkOutPage.checkOutItem();
    await orderHistoryPage.orderHistoryVerification(checkOutPage.orderRefNumber);
}); 