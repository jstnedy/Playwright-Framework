const { expect } = require('@playwright/test');

class PracticeOnly {
    constructor(page) {
        this.page = page;
        this.baseUrl = 'https://practicetestautomation.com/practice-test-login/';
        this.usernameField = this.page.getByLabel('Username');
        this.passwordField = this.page.getByLabel('Password');
        this.submitButton = this.page.getByRole('button', { name: 'Submit' });
        this.loginSuccessMessage = this.page.locator('.post-title');
    }

    async goToHomePage() {
        await this.page.goto(this.baseUrl, {
            waitUntil: 'domcontentloaded',
            timeout: 60_000
        });
    }
    async fillCredentialsAndLogin(username, password) {
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await this.submitButton.click();
    }

    async verifyLoginSuccess() {
        await this.page.waitForURL('**/logged-in-successfully**', { timeout: 10_000 }).catch(() => {});
        await expect(this.loginSuccessMessage).toBeVisible({ timeout: 10_000 });
        const successText = await this.loginSuccessMessage.textContent();
        console.log(`✓ Login successful! Message: ${successText}`);
        return successText;
}
}

module.exports = { PracticeOnly };
