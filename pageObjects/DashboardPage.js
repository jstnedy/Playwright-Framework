class DashboardPage {

    constructor(page)
    {
        this.page = page; // ✅ FIXED

        // Cart
        this.cartItems = page.locator(".card-body");
    }

async addItemToCart(itemName) {
    await this.cartItems.first().waitFor();
    const itemCount = await this.cartItems.count();

    for (let i = 0; i < itemCount; i++) {
        const itemTitle = await this.cartItems.nth(i).locator("b").textContent();

        // Case-insensitive comparison
        if (itemTitle.trim().toLowerCase() === itemName.trim().toLowerCase()) {
            await this.cartItems.nth(i).locator("text=Add to Cart").click();
            console.log(`${itemName} has been added to cart`);
            break;
        }
    }
}

async verifyItemAddedToCart(itemName) {

    await this.cartItems.first().waitFor();

    const itemCount = await this.cartItems.count();

    for (let i = 0; i < itemCount; i++) {
        const itemTitle = await this.cartItems.nth(i).locator("b").textContent();

        if (itemTitle.trim().toLowerCase() === itemName.trim().toLowerCase()) {
            console.log(`${itemName} is present in the cart`);
            return; // success
        }
    }

    throw new Error(`${itemName} is NOT present in the cart`);
}
}

module.exports = {DashboardPage}
