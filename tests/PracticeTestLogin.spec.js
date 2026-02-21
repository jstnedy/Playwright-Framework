const { test, expect } = require('@playwright/test');
const { LoginPracticeTestPage } = require('../pageObjects/LoginPracticeTestPage');

test.describe('Practice Test Login Page Tests', () => {
    let loginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPracticeTestPage(page);
        await loginPage.navigateToLoginPage();
    });

    test('Verify login page elements are visible', async ({ page }) => {
        expect(await loginPage.usernameInput.isVisible()).toBeTruthy();
        expect(await loginPage.passwordInput.isVisible()).toBeTruthy();
        expect(await loginPage.loginButton.isVisible()).toBeTruthy();
        console.log('✓ All login page elements are visible');
    });

    test('Successful login with correct credentials', async ({ page }) => {
        await loginPage.login('student', 'Password123');
        await loginPage.verifyLoginSuccess();
    });

    test('Failed login with incorrect username', async ({ page }) => {
        await loginPage.login('invaliduser', 'Password123');
        const result = await loginPage.verifyLoginError();
        expect(result).toBeTruthy();
    });

    test('Failed login with incorrect password', async ({ page }) => {
        await loginPage.login('student', 'WrongPassword');
        const result = await loginPage.verifyLoginError();
        expect(result).toBeTruthy();
    });

    test('Verify page URL on login page', async ({ page }) => {
        const url = await loginPage.verifyPageURL('practice-test-login');
        expect(url).toContain('practice-test-login');
    });

    test('Verify password field masks input', async ({ page }) => {
        const passwordType = await loginPage.passwordInput.getAttribute('type');
        expect(passwordType).toBe('password');
        console.log('✓ Password field correctly masks input');
    });

    test('Verify login button is clickable and enabled', async ({ page }) => {
        const isEnabled = await loginPage.loginButton.isEnabled();
        expect(isEnabled).toBeTruthy();
        console.log('✓ Login button is enabled and clickable');
    });

    test('Multiple login attempts - first invalid then valid', async ({ page }) => {
        // First attempt with invalid credentials
        await loginPage.login('wronguser', 'wrongpass');
        await loginPage.page.waitForTimeout(2000);
        
        // Navigate back to login page
        await loginPage.navigateToLoginPage();
        
        // Second attempt with valid credentials
        await loginPage.login('student', 'Password123');
        await loginPage.verifyLoginSuccess();
    });

    test('Verify username field accepts input', async ({ page }) => {
        await loginPage.usernameInput.fill('testuser');
        const value = await loginPage.usernameInput.inputValue();
        expect(value).toBe('testuser');
        console.log('✓ Username field accepts and stores input correctly');
    });

    test('Verify password field accepts input', async ({ page }) => {
        await loginPage.passwordInput.fill('TestPassword123');
        const value = await loginPage.passwordInput.inputValue();
        expect(value).toBe('TestPassword123');
        console.log('✓ Password field accepts and stores input correctly');
    });
});
