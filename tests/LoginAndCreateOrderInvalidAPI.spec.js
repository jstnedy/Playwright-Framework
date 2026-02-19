const { test, expect } = require('@playwright/test');
const { APIUtils } = require('../utils/APIUtils');

const loginPayLoad = { userEmail: "anshika@gmail.com", userPassword: "Iamking@000" };
const fakePayLoadOrders = { data: [], message: "No Orders" };

test.describe('@APIinvalid Orders Empty State (Frontend Test)', () => {
  let loginResponse;

  test.beforeAll(async ({ request }) => {
    const apiUtils = new APIUtils(request, loginPayLoad);

    loginResponse = await apiUtils.getToken();

    console.log("🔹 Login Status:", loginResponse.status);
    console.log("🔹 Login OK:", loginResponse.ok);
    console.log("🔹 Token (masked):", loginResponse.token?.slice(0, 10) + "...");

    expect(loginResponse.ok).toBeTruthy();
    expect(loginResponse.token).toBeTruthy();
  });

  test('@APIinvalid Mock orders API - UI should show No Orders', async ({ page }) => {

    await test.step("Mock Orders API (return empty orders)", async () => {
      await page.route(
        "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async (route) => {
          console.log("🔹 Intercepted Orders API:", route.request().url());

          const realResponse = await page.request.fetch(route.request());
          console.log("🔹 Real API Status:", realResponse.status());

          await route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify(fakePayLoadOrders),
          });

          console.log("🔹 Mocked response returned:", JSON.stringify(fakePayLoadOrders));
        }
      );
    });

    await test.step("Inject token and open app", async () => {
      await page.addInitScript((t) => {
        window.localStorage.setItem('token', t);
      }, loginResponse.token);

      console.log("🔹 Navigating to app...");
      await page.goto("https://rahulshettyacademy.com/client");
    });

    await test.step("Open My Orders and verify mocked response is used", async () => {
      console.log("🔹 Clicking My Orders...");
      await page.locator("button[routerlink*='myorders']").click();

      const ordersResponse = await page.waitForResponse(
        "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*"
      );

      // ✅ Validate the network response is really your mocked payload
      const json = await ordersResponse.json();
      console.log("🔹 Orders API JSON Seen By UI:", JSON.stringify(json, null, 2));
      expect(json).toEqual(fakePayLoadOrders);

      // ✅ Validate UI shows empty state
      const msg = await page.locator(".mt-4").textContent();
      console.log("🔹 UI Message:", msg);

      expect(msg).toContain("No Orders");
      console.log("✅ Mock validation passed: No Orders is shown.");
    });
  });
});
