const { expect } = require('@playwright/test');

class LoginPage {
    constructor(page) {
        this.page = page;
        this.email = page.locator('#userEmail');
        this.password = page.locator('#userPassword');
        this.loginBtn = page.locator('#login');
        this.accountCreatedLoginBUtton = page.locator(".//button[@class='btn btn-primary']");
        this.loginErrorPrompt = page.locator("#toast-container");
        this.loginUrl = 'https://rahulshettyacademy.com/client/#/auth/login';
    }

    async goToLogin() {
        await this.page.goto(this.loginUrl, {
            waitUntil: 'domcontentloaded',
            timeout: 60_000
        });
        await expect(this.email).toBeVisible({ timeout: 60_000 });
    }

    async fillCredentials(username, password) {
        await this.email.fill(username);
        await this.password.fill(password);
    }

    async submitLogin() {
        await this.loginBtn.click();
    }

    async validLogin(username, password) {
        await this.fillCredentials(username, password);
        await this.submitLogin();
        console.log(`✓ Login attempted with email: ${username}`);
    }

    async invalidLogin(username, password) {
        await this.fillCredentials(username, password);
        await this.submitLogin();
    }

    async verifyInvalidLoginError() {
        await expect(this.loginErrorPrompt).toBeVisible({ timeout: 60_000 });
        const errorMessage = await this.loginErrorPrompt.textContent();
        console.log(`✓ Error message displayed: ${errorMessage}`);
        return errorMessage;
    }

    async getErrorMessage() {
        return await this.loginErrorPrompt.textContent();
    }
}

module.exports = { LoginPage };
