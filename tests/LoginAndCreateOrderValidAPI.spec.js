const { test, expect } = require('@playwright/test');
const { APIUtils } = require('../utils/APIUtils');

const loginPayLoad = { userEmail: "anshika@gmail.com", userPassword: "Iamking@000" };

const orderPayLoad = {orders: [{ country: "India", productOrderedId: "6960eac0c941646b7a8b3e68" }]};

test.describe('@APIvalid Order Happy Path (Real Backend)', () => {
  let orderResponse;

  test.beforeAll(async ({ request }) => {
    const apiUtils = new APIUtils(request, loginPayLoad);

    // ✅ Real: login + create order in backend
    orderResponse = await apiUtils.createOrder(orderPayLoad);

    console.log("🔹 Created Order IDs:", JSON.stringify(orderResponse.orders, null, 2));
    console.log("🔹 Token (masked):", orderResponse.token?.slice(0, 10) + "...");

    expect(orderResponse.token).toBeTruthy();
    expect(orderResponse.orders?.length).toBeGreaterThan(0);
  });

  test('@APIvalid Happy path - created order should appear in UI', async ({ page }) => {
    const createdOrderId = orderResponse.orders[0];
    console.log("🔹 Validating Order ID in UI:", createdOrderId);

    // Inject token so UI is logged in without typing credentials
    await page.addInitScript((t) => {
      window.localStorage.setItem('token', t);
    }, orderResponse.token);

    await page.goto("https://rahulshettyacademy.com/client");

    // Go to My Orders (REAL backend data)
    await page.locator("button[routerlink*='myorders']").click();

    // Wait for real orders API
    await page.waitForResponse(
      "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*"
    );

    // ✅ Validate created order is shown in table
   const row = page.getByRole('row', { name: new RegExp(createdOrderId) });
    await expect(row).toBeVisible();

    console.log("✅ Happy path validation passed: order is visible in UI.");
  });
});
