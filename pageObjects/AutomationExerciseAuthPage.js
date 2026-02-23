const { expect } = require('@playwright/test');

class AutomationExerciseAuthPage {
    constructor(page) {
        this.page = page;
        this.baseUrl = 'https://automationexercise.com/';

        this.signupLoginNavLink = page.getByRole('link', { name: 'Signup / Login' });
        this.newUserSignupHeader = page.getByRole('heading', { name: 'New User Signup!' });
        this.loginToYourAccountHeader = page.getByRole('heading', { name: 'Login to your account' });

        this.signupNameInput = page.locator('[data-qa="signup-name"]');
        this.signupEmailInput = page.locator('[data-qa="signup-email"]');
        this.signupButton = page.locator('[data-qa="signup-button"]');

        this.titleMrRadio = page.locator('#id_gender1');
        this.passwordInput = page.locator('#password');
        this.daysSelect = page.locator('#days');
        this.monthsSelect = page.locator('#months');
        this.yearsSelect = page.locator('#years');
        this.firstNameInput = page.locator('#first_name');
        this.lastNameInput = page.locator('#last_name');
        this.addressInput = page.locator('#address1');
        this.countrySelect = page.locator('#country');
        this.stateInput = page.locator('#state');
        this.cityInput = page.locator('#city');
        this.zipcodeInput = page.locator('#zipcode');
        this.mobileNumberInput = page.locator('#mobile_number');
        this.createAccountButton = page.locator('[data-qa="create-account"]');

        this.accountCreatedMessage = page.locator('[data-qa="account-created"]');
        this.continueButton = page.locator('[data-qa="continue-button"]');

        this.loggedInAsUserLabel = page.locator('a:has-text("Logged in as")');
        this.logoutLink = page.getByRole('link', { name: 'Logout' });

        this.loginEmailInput = page.locator('[data-qa="login-email"]');
        this.loginPasswordInput = page.locator('[data-qa="login-password"]');
        this.loginButton = page.locator('[data-qa="login-button"]');
    }

    async goToHomePage() {
        await this.page.goto(this.baseUrl, {
            waitUntil: 'domcontentloaded',
            timeout: 60_000
        });
    }

    async openSignupLoginPage() {
        await this.signupLoginNavLink.click();
        await expect(this.newUserSignupHeader).toBeVisible({ timeout: 30_000 });
    }

    async signup(name, email) {
        await this.signupNameInput.fill(name);
        await this.signupEmailInput.fill(email);
        await this.signupButton.click();
    }

    async fillAccountInformation(user) {
        await expect(this.passwordInput).toBeVisible({ timeout: 30_000 });

        await this.titleMrRadio.check();
        await this.passwordInput.fill(user.password);
        await this.daysSelect.selectOption(user.day);
        await this.monthsSelect.selectOption(user.month);
        await this.yearsSelect.selectOption(user.year);

        await this.firstNameInput.fill(user.firstName);
        await this.lastNameInput.fill(user.lastName);
        await this.addressInput.fill(user.address);
        await this.countrySelect.selectOption({ label: user.country });
        await this.stateInput.fill(user.state);
        await this.cityInput.fill(user.city);
        await this.zipcodeInput.fill(user.zipcode);
        await this.mobileNumberInput.fill(user.mobileNumber);
    }

    async createAccount() {
        await this.createAccountButton.click();
        await expect(this.accountCreatedMessage).toBeVisible({ timeout: 30_000 });
    }

    async continueToHomeAfterAccountCreation() {
        await this.continueButton.click();
    }

    async verifyLoggedInAs(name) {
        await expect(this.loggedInAsUserLabel).toContainText(name, { timeout: 30_000 });
    }

    async logout() {
        await this.logoutLink.click();
        await expect(this.loginToYourAccountHeader).toBeVisible({ timeout: 30_000 });
    }

    async login(email, password) {
        await this.loginEmailInput.fill(email);
        await this.loginPasswordInput.fill(password);
        await this.loginButton.click();
    }
}

module.exports = { AutomationExerciseAuthPage };
