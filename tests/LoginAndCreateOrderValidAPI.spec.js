const { test, expect } = require('@playwright/test');
const { APIUtils } = require('../utils/APIUtils');
const { RahulShettyOrdersPage } = require('../pageObjects/RahulShettyOrdersPage');

const loginPayLoad = { userEmail: 'anshika@gmail.com', userPassword: 'Iamking@000' };
const orderPayLoad = { orders: [{ country: 'India', productOrderedId: '6960eac0c941646b7a8b3e68' }] };

test.describe('@APIvalid Order Happy Path (Real Backend)', () => {
  let orderResponse;

  test.beforeAll(async ({ request }) => {
    const apiUtils = new APIUtils(request, loginPayLoad);

    orderResponse = await apiUtils.createOrder(orderPayLoad);

    console.log('Created Order IDs:', JSON.stringify(orderResponse.orders, null, 2));
    console.log('Token (masked):', orderResponse.token?.slice(0, 10) + '...');

    expect(orderResponse.token).toBeTruthy();
    expect(orderResponse.orders?.length).toBeGreaterThan(0);
  });

  test('@APIvalid Happy path - created order should appear in UI', async ({ page }) => {
    const createdOrderId = orderResponse.orders[0];
    console.log('Validating Order ID in UI:', createdOrderId);

    const ordersPage = new RahulShettyOrdersPage(page);
    await ordersPage.injectToken(orderResponse.token);
    await ordersPage.goToClientApp();
    await ordersPage.openMyOrdersAndWaitForResponse();
    await ordersPage.expectOrderVisible(createdOrderId);

    console.log('Happy path validation passed: order is visible in UI.');
  });
});
