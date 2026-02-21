class CheckoutPage {
    constructor(page) {
        this.page = page;

        // Cart
        this.cartItemsButton = page.locator("//button[@routerlink='/dashboard/cart']");

        // Checkout
        this.checkOut = page.locator("text=Checkout");
        this.cvvCode = page.locator("//div[@class='payment__cc']//div[2]//input[1]");
        this.nameOnCard = page.locator("//div[@class='payment__info']//div[3]//div[1]//input[1]");
        this.selectCountry = page.locator("//input[@placeholder='Select Country']");
        this.confirmCountry = page.locator("//span[@class='ng-star-inserted']");
        this.placeOrder = page.locator(".btnn.action__submit.ng-star-inserted");

        // Coupon
        this.couponCode = page.locator("//input[@name='coupon']");
        this.applyCouponButton = page.locator("[class='btn btn-primary mt-1']");
        this.couponResultMessage = page.locator(".mt-1.ng-star-inserted");

        // Orders
        this.orderReferenceNumber = page.locator("//tr[@class='ng-star-inserted']");

        this.orderRefNumber = null;
    }

    async navigateToCart() {
        await this.cartItemsButton.click();
    }

    async navigateToCheckout() {
        await this.checkOut.click();
    }

    async fillPaymentDetails(cvv = "123", cardholderName = "Rahul Shetty") {
        await this.cvvCode.fill(cvv);
        await this.nameOnCard.fill(cardholderName);
    }

    async applyCoupon(couponCode) {
        await this.couponCode.fill(couponCode);
        await this.applyCouponButton.click();
        await this.couponResultMessage.isVisible({ timeout: 5000 });
    }

    async verifyCouponMessage(expectedMessage) {
        const message = (await this.couponResultMessage.textContent()).trim();
        const isMatch = message === expectedMessage;
        console.log(`${expectedMessage} - ${isMatch ? "✓ PASS" : "✗ FAIL"}`);
        return isMatch;
    }

    async selectCountryAndPlace(country = "Philippines") {
        await this.selectCountry.type(country);
        await this.confirmCountry.click();
        await this.placeOrder.click();
    }

    async extractOrderNumber() {
        const text = (await this.orderReferenceNumber.textContent()).trim();
        this.orderRefNumber = text.split("|")[1].trim();
        console.log(`Order Reference Number: ${this.orderRefNumber}`);
        return this.orderRefNumber;
    }

    async checkOutItem(cvv = "123", cardholderName = "Rahul Shetty", country = "Philippines") {
        await this.navigateToCart();
        await this.navigateToCheckout();
        await this.fillPaymentDetails(cvv, cardholderName);

        // Test invalid coupon
        await this.applyCoupon("Invalid Coupon");
        await this.verifyCouponMessage("* Invalid Coupon");

        // Apply valid coupon
        await this.applyCoupon("rahulshettyacademy");
        await this.verifyCouponMessage("* Coupon Applied");

        // Complete order
        await this.selectCountryAndPlace(country);
        return await this.extractOrderNumber();
    }
}

module.exports = { CheckoutPage };