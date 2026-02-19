const { When, Then, Given } = require('@cucumber/cucumber');
const { setDefaultTimeout } = require('@cucumber/cucumber');
const testDataForOrder = require('../../utils/testDataCucumber.json');

setDefaultTimeout(90 * 1000);

// ------------------------------
// Scenario 1: REGISTER + LOGIN
// ------------------------------
Given('I register a new user and log in', async function () {
  const registrationPage = this.pageObjectManager.getRegistrationPage();
  const loginPage = this.pageObjectManager.getLoginPage();

  await registrationPage.goToRegistration();
  const regData = await registrationPage.validRegistration();

  await loginPage.goToLogin();
  await loginPage.validLogin(regData.registeredUsername, regData.registeredPassword);
});

// ------------------------------
// Scenario 2: LOGIN ONLY
// ------------------------------
Given('I log in with username {string} and password {string}', async function (username, password) {
  const loginPage = this.pageObjectManager.getLoginPage();

  await loginPage.goToLogin();
  await loginPage.validLogin(username, password);
});

// ------------------------------
// Shared Steps
// ------------------------------
When('I add the item {string} to the cart', async function (productName) {
  const finalName = (productName || '').trim() || testDataForOrder.productName1;
  this.productName = finalName;

  const dashboardPage = this.pageObjectManager.getDashboardPage();
  await dashboardPage.addItemToCart(finalName);
});

Then('the item {string} should be in the cart', async function (itemName) {
  const finalItem = (itemName || '').trim() || this.productName;

  const dashboardPage = this.pageObjectManager.getDashboardPage();
  await dashboardPage.verifyItemAddedToCart(finalItem);
});

When('I place the order with valid details', async function () {
  const checkOutPage = this.pageObjectManager.getCheckOutPage();
  this.orderRefNumber = await checkOutPage.checkOutItem();
});

Then('the order should appear in order history', async function () {
  const orderHistoryPage = this.pageObjectManager.getOrdersHistoryPage();
  await orderHistoryPage.orderHistoryVerification(this.orderRefNumber);
});

Given('I log in with invalid username {string} and password {string}', async function (username, password) {
  const loginPage = this.pageObjectManager.getLoginPage();

  await loginPage.goToLogin();
  await loginPage.invalidLogin(username, password);
});


Then('I should see an error message indicating invalid login', async function () {
  const loginPage = this.pageObjectManager.getLoginPage();
  await loginPage.verifyInvalidLoginError();
});