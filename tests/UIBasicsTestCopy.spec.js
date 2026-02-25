const { test } = require('@playwright/test');
const { customTest } = require('../test-data/test-base');
const products = require('../test-data/Products-all.json');
const { RegistrationPage } = require('../pageObjects/RegistrationPage');
const { LoginPage } = require('../pageObjects/LoginPage');
const { DashboardPage } = require('../pageObjects/DashboardPage');
const { CheckoutPage } = require('../pageObjects/CheckOutPage');
const { OrderHistoryPage } = require('../pageObjects/OrdersHistoryPage');

test.describe.configure({ mode: 'parallel' });

/**
 * Initializes all page objects from a Playwright page instance
 * @param {import('@playwright/test').Page} page - Page instance
 * @returns {Object} Object containing all page object instances
 */
function initializePageObjects(page) {
    return {
        registrationPage: new RegistrationPage(page),
        loginPage: new LoginPage(page),
        dashboardPage: new DashboardPage(page),
        checkOutPage: new CheckoutPage(page),
        orderHistoryPage: new OrderHistoryPage(page)
    };
}

/**
 * Executes the complete e-commerce flow: registration, login, add to cart, checkout, and order verification
 * @param {Object} pageObjects - Object containing all page objects
 * @param {string} productName - Name of the product to add to cart
 */
async function executeCompleteCheckoutFlow(pageObjects, productName) {
    const { registrationPage, loginPage, dashboardPage, checkOutPage, orderHistoryPage } = pageObjects;

    // Registration and Login
    await registrationPage.goToRegistration();
    const { registeredUsername, registeredPassword } = await registrationPage.validRegistration();
    await loginPage.validLogin(registeredUsername, registeredPassword);

    // Shopping
    await dashboardPage.addItemToCart(productName);
    await dashboardPage.verifyItemAddedToCart(productName);

    // Checkout and Order Verification
    await checkOutPage.checkOutItem();
    await orderHistoryPage.orderHistoryVerification(checkOutPage.orderRefNumber);
}

// 1. Data Driven Tests (run ALL products)
for (const data of products) {
    test(`@Web Complete Flow - ${data.productName}`, async ({ page }) => {
        const pageObjects = initializePageObjects(page);
        
        await executeCompleteCheckoutFlow(pageObjects, data.productName);
    });
}

// 2. Fixture-based Test (run ONE specific product from fixture)
customTest(`@Web Complete Flow using Fixture - Specific Product`, async ({ page, testDataForOrder }) => {
    const pageObjects = initializePageObjects(page);
    
    await executeCompleteCheckoutFlow(pageObjects, testDataForOrder.productName1);
});
