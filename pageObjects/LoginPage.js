const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {

    //Valid Login
    this.page = page;
    this.email = page.locator('#userEmail');
    this.password = page.locator('#userPassword');
    this.loginBtn = page.locator('#login');
    this.accountCreatedLoginBUtton = page.locator(".//button[@class='btn btn-primary']");

    //Invalid Login
    this.loginErrorPrompt = page.locator("#toast-container");
  }

  async goToLogin() {
    await this.page.goto('https://rahulshettyacademy.com/client/#/auth/login', {
      waitUntil: 'domcontentloaded',
      timeout: 60_000
    });
    await expect(this.email).toBeVisible({ timeout: 60_000 });
  }

  async validLogin(username, password) {
    await this.email.fill(username);
    await this.password.fill(password);
    await this.loginBtn.click();

    // pick the correct post-login URL for your app
    await this.page.waitForURL('**/#/dashboard/**', { timeout: 60_000 });
  }

  async invalidLogin(username, password) {
    await this.email.fill(username);
    await this.password.fill(password);
    await this.loginBtn.click();
  }

   async verifyInvalidLoginError(username, password) {
    await expect(this.loginErrorPrompt).toBeVisible({ timeout: 60_000 });
    console.log("Error message displayed:", await this.loginErrorPrompt.textContent());
  }
}

module.exports = { LoginPage };
