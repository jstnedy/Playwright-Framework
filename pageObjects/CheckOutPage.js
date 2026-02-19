class CheckoutPage{

    constructor(page)
    {
        this.page = page; // ✅ FIXED

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

        this.orderRefNumber = null; // ✅ store globally in class
    }

async checkOutItem(){

        await this.cartItemsButton.click();
        await this.checkOut.click();
        await this.cvvCode.fill("123");
        await this.nameOnCard.fill("Rahul Shetty"); 

        // Coupon Code Application and Verification //
        await this.couponCode.fill("Invalid Coupon");
        await this.applyCouponButton.click();
        await this.page.waitForTimeout(2000);

        if (await this.couponResultMessage.textContent() === "* Invalid Coupon") {
        console.log("Invalid coupon code message is displayed as expected.");
        }

        await this.couponCode.fill("rahulshettyacademy");
        await this.applyCouponButton.click();
        await this.page.waitForTimeout(2000);

        if (await this.couponResultMessage.textContent() === "* Coupon Applied") {
        console.log("Coupon code entered correctly.");
        }

        await this.selectCountry.type("Philippines");
        await this.confirmCountry.click();
        await this.placeOrder.click();

        // ✅ FIXED extraction (no .then)
        const text = await this.orderReferenceNumber.textContent();
        this.orderRefNumber = text.split("|")[1].trim();

        console.log("Order Reference Number: " + this.orderRefNumber);

        return this.orderRefNumber;
}

}

module.exports = {CheckoutPage};