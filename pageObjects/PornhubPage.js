class PornhubPage {
    constructor(page) {
        this.page = page;
        this.baseUrl = 'https://pornhub.com//';
    }

    async goToHomePage() {
        await this.page.goto(this.baseUrl, {
            waitUntil: 'domcontentloaded',
            timeout: 60_000
        });
    }
}

module.exports = { PornhubPage };
