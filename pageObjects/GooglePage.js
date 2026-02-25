class GooglePage {
    constructor(page) {
        this.page = page;
        this.baseUrl = 'https://google.com//';
    }

    async goToHomePage() {
        await this.page.goto(this.baseUrl, {
            waitUntil: 'domcontentloaded',
            timeout: 60_000
        });
    }
}

module.exports = { GooglePage };
