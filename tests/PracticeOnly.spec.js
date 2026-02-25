const { test } = require('@playwright/test');
const { PracticeOnly } = require('../pageObjects/PracticeOnly');

test('Practice Test Automation - Login Page', async ({ page }) => {
    let practiceOnly = new PracticeOnly(page);
        await practiceOnly.goToHomePage();
        await practiceOnly.fillCredentialsAndLogin('student', 'Password123'); 

    });
