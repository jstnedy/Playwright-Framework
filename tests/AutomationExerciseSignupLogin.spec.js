const { test } = require('@playwright/test');
const { AutomationExerciseAuthPage } = require('../pageObjects/AutomationExerciseAuthPage');

test.describe('Automation Exercise Signup and Login', () => {
    test('@Web should signup a new user, logout, and login again successfully', async ({ page }) => {
        const authPage = new AutomationExerciseAuthPage(page);

        const uniqueStamp = Date.now();
        const user = {
            name: 'Justine Test',
            email: `justine.test.${uniqueStamp}@mailinator.com`,
            password: 'Password123!',
            day: '10',
            month: '5',
            year: '1995',
            firstName: 'Justine',
            lastName: 'Tester',
            address: '123 Test Street',
            country: 'United States',
            state: 'California',
            city: 'San Diego',
            zipcode: '92101',
            mobileNumber: '6195550101'
        };

        await authPage.goToHomePage();
        await authPage.openSignupLoginPage();
        await authPage.signup(user.name, user.email);
        await authPage.fillAccountInformation(user);
        await authPage.createAccount();
        await authPage.continueToHomeAfterAccountCreation();
        await authPage.verifyLoggedInAs(user.name);

        await authPage.logout();
        await authPage.login(user.email, user.password);
        await authPage.verifyLoggedInAs(user.name);
    });
});
