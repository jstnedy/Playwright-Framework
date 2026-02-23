const { test, expect } = require('@playwright/test');

test.describe('Automation Practice Happy Path', () => {
  test('@Web happy path flow on AutomationPractice page', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

    await expect(page).toHaveTitle(/Practice Page/i);

    await page.locator('#radio2').check();
    await expect(page.locator('#radio2')).toBeChecked();

    await page.locator('#checkBoxOption2').check();
    await expect(page.locator('#checkBoxOption2')).toBeChecked();

    await page.locator('#dropdown-class-example').selectOption({ label: 'Option2' });
    await expect(page.locator('#dropdown-class-example')).toHaveValue('option2');

    await page.locator('#autocomplete').fill('ind');
    await page.locator('.ui-menu-item-wrapper', { hasText: 'India' }).click();
    await expect(page.locator('#autocomplete')).toHaveValue('India');

    page.once('dialog', async dialog => {
      expect(dialog.type()).toBe('alert');
      expect(dialog.message()).toContain('JUSTINE');
      await dialog.accept();
    });
    await page.locator('#name').fill('JUSTINE');
    await page.locator('#alertbtn').click();

    page.once('dialog', async dialog => {
      expect(dialog.type()).toBe('confirm');
      expect(dialog.message()).toContain('JUSTINE');
      await dialog.accept();
    });
    await page.locator('#confirmbtn').click();
  });
});
