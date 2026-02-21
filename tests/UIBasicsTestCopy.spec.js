const { PageObjectManager } = require('../pageObjects/PageObjectManager');
const { test } = require('@playwright/test');
const { customTest } = require('../test-data/test-base');
const products = require('../test-data/Products-all.json');

test.describe.configure({ mode: 'parallel' });

/**
 * Initializes all page objects from the PageObjectManager
 * @param {PageObjectManager} manager - Page object manager instance
 * @returns {Object} Object containing all page object instances
 */
function initializePageObjects(manager) {
    return {
        registrationPage: manager.getRegistrationPage(),
        loginPage: manager.getLoginPage(),
        dashboardPage: manager.getDashboardPage(),
        checkOutPage: manager.getCheckOutPage(),
        orderHistoryPage: manager.getOrdersHistoryPage()
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
        const pageObjectManager = new PageObjectManager(page);
        const pageObjects = initializePageObjects(pageObjectManager);
        
        await executeCompleteCheckoutFlow(pageObjects, data.productName);
    });
}

// 2. Fixture-based Test (run ONE specific product from fixture)
customTest(`@Web Complete Flow using Fixture - Specific Product`, async ({ page, testDataForOrder }) => {
    const pageObjectManager = new PageObjectManager(page);
    const pageObjects = initializePageObjects(pageObjectManager);
    
    await executeCompleteCheckoutFlow(pageObjects, testDataForOrder.productName1);
});