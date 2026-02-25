const { test, expect } = require('@playwright/test');
const { APIUtils } = require('../utils/APIUtils');
const { RahulShettyOrdersPage } = require('../pageObjects/RahulShettyOrdersPage');

const loginPayLoad = { userEmail: 'anshika@gmail.com', userPassword: 'Iamking@000' };
const fakePayLoadOrders = { data: [], message: 'No Orders' };

test.describe('@APIinvalid Orders Empty State (Frontend Test)', () => {
  let loginResponse;

  test.beforeAll(async ({ request }) => {
    const apiUtils = new APIUtils(request, loginPayLoad);

    loginResponse = await apiUtils.getToken();

    console.log('Login Status:', loginResponse.status);
    console.log('Login OK:', loginResponse.ok);
    console.log('Token (masked):', loginResponse.token?.slice(0, 10) + '...');

    expect(loginResponse.ok).toBeTruthy();
    expect(loginResponse.token).toBeTruthy();
  });

  test('@APIinvalid Mock orders API - UI should show No Orders', async ({ page }) => {
    const ordersPage = new RahulShettyOrdersPage(page);

    await test.step('Mock Orders API (return empty orders)', async () => {
      await ordersPage.mockOrdersApi(fakePayLoadOrders);
    });

    await test.step('Inject token and open app', async () => {
      await ordersPage.injectToken(loginResponse.token);
      console.log('Navigating to app...');
      await ordersPage.goToClientApp();
    });

    await test.step('Open My Orders and verify mocked response is used', async () => {
      console.log('Clicking My Orders...');
      const ordersResponse = await ordersPage.openMyOrdersAndWaitForResponse();

      const json = await ordersResponse.json();
      console.log('Orders API JSON Seen By UI:', JSON.stringify(json, null, 2));
      expect(json).toEqual(fakePayLoadOrders);

      const msg = await ordersPage.getNoOrdersMessage();
      console.log('UI Message:', msg);

      expect(msg).toContain('No Orders');
      console.log('Mock validation passed: No Orders is shown.');
    });
  });
});
