const { expect } = require('@playwright/test');

class OrderHistoryPage {
    constructor(page) {
        this.page = page;
        this.orderHistoryPage = page.locator("//label[@routerlink='/dashboard/myorders']");
        this.orderReferenceNumber = page.locator("//tr[@class='ng-star-inserted']");
        this.orderReferenceID = page.locator("tbody th[scope='row']");
    }

    async navigateToOrderHistory() {
        await this.orderHistoryPage.click();
    }

    async getOrderCount() {
        return await this.orderReferenceID.count();
    }

    findOrderByReferenceNumber(orderRefNumber) {
        const trimmedRefNumber = orderRefNumber.trim();
        const order = this.orderReferenceID
            .filter({ hasText: trimmedRefNumber })
            .first();
        
        return order;
    }

    async verifyOrderExists(orderRefNumber) {
        const actualText = (await this.findOrderByReferenceNumber(orderRefNumber).textContent())?.trim();
        
        if (!actualText) {
            throw new Error(`Order with reference "${orderRefNumber}" not found`);
        }
        
        return actualText;
    }

    async orderHistoryVerification(orderRefNumber) {
        await this.navigateToOrderHistory();
        
        const expectedRef = orderRefNumber.trim();
        const actualText = await this.verifyOrderExists(expectedRef);
        
        console.log(`✓ Order verification - Expected: ${expectedRef}, Actual: ${actualText}`);
        expect(actualText).toBe(expectedRef);
    }
}

module.exports = { OrderHistoryPage };