class DashboardPage {
    constructor(page) {
        this.page = page;

        // Cart
        this.cartItems = page.locator(".card-body");
    }

    async waitForItemsToLoad(timeout = 5000) {
        await this.cartItems.first().waitFor({ timeout });
    }

    async getItemCount() {
        await this.waitForItemsToLoad();
        return await this.cartItems.count();
    }

    async findItemIndex(itemName) {
        await this.waitForItemsToLoad();
        const itemCount = await this.getItemCount();
        const searchTerm = itemName.trim().toLowerCase();

        for (let i = 0; i < itemCount; i++) {
            const itemTitle = (await this.cartItems.nth(i).locator("b").textContent()).trim().toLowerCase();
            if (itemTitle === searchTerm) {
                return i;
            }
        }

        return -1;
    }

    async addItemToCart(itemName) {
        const itemIndex = await this.findItemIndex(itemName);

        if (itemIndex !== -1) {
            await this.cartItems.nth(itemIndex).locator("text=Add to Cart").click();
            console.log(`✓ ${itemName} has been added to cart`);
        } else {
            throw new Error(`Item "${itemName}" not found on dashboard`);
        }
    }

    async verifyItemAddedToCart(itemName) {
        const itemIndex = await this.findItemIndex(itemName);

        if (itemIndex !== -1) {
            console.log(`✓ ${itemName} is present in the cart`);
            return true;
        }

        throw new Error(`Item "${itemName}" is NOT present in the cart`);
    }

    async getItemPrice(itemName) {
        const itemIndex = await this.findItemIndex(itemName);

        if (itemIndex !== -1) {
            const price = await this.cartItems.nth(itemIndex).locator(".ng-star-inserted").textContent();
            return price;
        }

        return null;
    }
}

module.exports = { DashboardPage };
