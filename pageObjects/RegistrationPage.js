const registrationData = require('../test-data/RegistrationTestData.json');

class RegistrationPage {
    constructor(page) {
        this.page = page;
        this.firstName = page.getByPlaceholder('First Name');
        this.lastName = page.locator("#lastName");
        this.email = page.locator("#userEmail");
        this.phoneNumber = page.locator("#userMobile");
        this.password = page.locator("#userPassword");
        this.confirmPassword = page.locator("#confirmPassword");
        this.checkBox = page.locator(".col-md-1");
        this.registerBtn = page.locator("#login");
        this.accountCreatedLoginBUtton = page.locator("[class='btn btn-primary']");
        this.registrationUrl = "https://rahulshettyacademy.com/client/#/auth/register";
    }

    async goToRegistration() {
        await this.page.goto(this.registrationUrl, {
            waitUntil: "domcontentloaded",
            timeout: 60_000,
        });
        await this.email.waitFor({ state: "visible", timeout: 60_000 });
    }


   
    async fillRegistrationForm(firstName, lastName, email, phoneNumber, password, confirmPassword) {
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.email.fill(email);
        await this.phoneNumber.fill(phoneNumber);
        await this.password.fill(password);
        await this.confirmPassword.fill(confirmPassword);
    }

    async agreeToTerms() {
        try {
            await this.checkBox.check();
        } catch {
            await this.checkBox.click();
        }
    }

    async submitRegistration() {
        await this.registerBtn.click();
        await this.accountCreatedLoginBUtton.click();
    }

    generateUniqueEmail() {
        return `user${Math.random().toString(36).slice(2, 9)}@gmail.com`;
    }

    async validRegistration(customData = null) {
        const data = customData || registrationData.validRegistration;
        const registeredUsername = this.generateUniqueEmail();
        const registeredPassword = "Es11k@wawa";

        await this.fillRegistrationForm(
            data.firstName,
            data.lastName,
            registeredUsername,
            data.phoneNumber,
            registeredPassword,
            registeredPassword
        );

        await this.agreeToTerms();
        await this.submitRegistration();

        console.log(`✓ Registration successful - Email: ${registeredUsername}`);
        return { registeredUsername, registeredPassword };
    }
}

module.exports = { RegistrationPage };