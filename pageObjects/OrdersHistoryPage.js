const { expect } = require('@playwright/test');

class OrderHistoryPage{
    constructor(page){
        this.page = page; // ✅ FIXED

        // Orders
        this.orderHistoryPage = page.locator("//label[@routerlink='/dashboard/myorders']");
        this.orderReferenceNumber = page.locator("//tr[@class='ng-star-inserted']");
        this.orderReferenceID = page.locator("tbody th[scope='row']");

        
    }

async orderHistoryVerification(orderRefNumber) {
  await this.orderHistoryPage.click();

  const order = this.orderReferenceID
    .filter({ hasText: orderRefNumber.trim() })
    .first();

  const actualText = (await order.textContent())?.trim();

  console.log("Expected:", orderRefNumber.trim());
  console.log("Actual:", actualText);

  expect(actualText).toBe(orderRefNumber.trim());
}
}
module.exports = {OrderHistoryPage};