const { expect } = require('@playwright/test');

class RahulShettyOrdersPage {
    constructor(page) {
        this.page = page;
        this.baseUrl = 'https://rahulshettyacademy.com/client';
        this.ordersApiPattern = 'https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*';
        this.myOrdersButton = page.locator("button[routerlink*='myorders']");
        this.noOrdersMessage = page.locator('.mt-4');
    }

    async injectToken(token) {
        await this.page.addInitScript((t) => {
            window.localStorage.setItem('token', t);
        }, token);
    }

    async goToClientApp() {
        await this.page.goto(this.baseUrl, {
            waitUntil: 'domcontentloaded',
            timeout: 60_000
        });
    }

    async openMyOrdersAndWaitForResponse() {
        const [ordersResponse] = await Promise.all([
            this.page.waitForResponse(this.ordersApiPattern),
            this.myOrdersButton.click()
        ]);
        return ordersResponse;
    }

    async expectOrderVisible(orderId) {
        const row = this.page.getByRole('row', { name: new RegExp(orderId) });
        await expect(row).toBeVisible();
    }

    async mockOrdersApi(payload) {
        await this.page.route(this.ordersApiPattern, async (route) => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(payload)
            });
        });
    }

    async getNoOrdersMessage() {
        return this.noOrdersMessage.textContent();
    }
}

module.exports = { RahulShettyOrdersPage };
