const registrationData = require('../test-data/RegistrationTestData.json');

class RegistrationPage {
    constructor(page)
    {
        this.page = page;
        // this.registerLink = page.locator(".text-reset");
        this.firstName = page.getByPlaceholder('First Name');
        this.lastName = page.locator("#lastName");
        this.email = page.locator("#userEmail");
        this.phoneNumber = page.locator("#userMobile");
        this.password = page.locator("#userPassword");
        this.confirmPassword = page.locator("#confirmPassword");
        this.checkBox = page.locator(".col-md-1");
        this.registerBtn = page.locator("#login");
        this.accountCreatedLoginBUtton = page.locator("[class='btn btn-primary']");
    }

async goToRegistration() {
  await this.page.goto("https://rahulshettyacademy.com/client/#/auth/register", {
    waitUntil: "domcontentloaded",
    timeout: 60_000,
    });
     // Register page is “ready” when a key field is visible
  await this.email.waitFor({ state: "visible", timeout: 60_000 });
}


   
async validRegistration() {
  
  registrationData.validRegistration; // Access the valid registration data from the JSON file
  const registeredUsername = `user${Math.random().toString(36).slice(2, 9)}@gmail.com`;
  const registeredPassword = "Es11k@wawa";

  await this.firstName.fill(registrationData.validRegistration.firstName);
  await this.lastName.fill(registrationData.validRegistration.lastName);
  await this.email.fill(registeredUsername);
  await this.phoneNumber.fill(registrationData.validRegistration.phoneNumber);
  await this.password.fill(registeredPassword);
  await this.confirmPassword.fill(registeredPassword);

  await this.checkBox.check?.().catch(async () => {
    // if it's not a checkbox input but a label/div, fallback:
    await this.checkBox.click();
  });

  await this.registerBtn.click();
  await this.accountCreatedLoginBUtton.click();

  console.log("Registered Email:", registeredUsername);
  console.log("Registered Password:", registeredPassword);

  return { registeredUsername, registeredPassword };
}
}

module.exports = {RegistrationPage}