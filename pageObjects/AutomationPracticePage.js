const { expect } = require('@playwright/test');

class AutomationPracticePage {
    constructor(page) {
        this.page = page;
        this.baseUrl = 'https://rahulshettyacademy.com/AutomationPractice/';

        this.radioOption2 = page.locator("input[type='radio']").nth(1);
        this.checkBoxOption2 = page.locator("input[type='checkbox']").nth(1);
        this.dropdown = page.getByRole('combobox').first();
        this.autocomplete = page.getByRole('textbox', { name: 'Type to Select Countries' });
        this.countryOption = page.getByText('India', { exact: true });
        this.nameInput = page.getByPlaceholder('Enter Your Name');
        this.alertButton = page.locator('#alertbtn');
        this.confirmButton = page.locator('#confirmbtn');
    }

    async goToPage() {
        await this.page.goto(this.baseUrl, {
            waitUntil: 'domcontentloaded',
            timeout: 60_000
        });
        await this.radioOption2.waitFor({ state: 'visible', timeout: 30_000 }).catch(async () => {
            await this.page.reload({ waitUntil: 'domcontentloaded' });
            await this.radioOption2.waitFor({ state: 'visible', timeout: 30_000 });
        });
    }

    async verifyPageTitle() {
        await expect(this.page).toHaveTitle(/Practice Page/i);
    }

    async selectRadioOption2() {
        await this.radioOption2.check();
        await expect(this.radioOption2).toBeChecked();
    }

    async selectCheckboxOption2() {
        await this.checkBoxOption2.check();
        await expect(this.checkBoxOption2).toBeChecked();
    }

    async selectDropdownOption2() {
        await this.dropdown.selectOption({ label: 'Option2' });
        await expect(this.dropdown).toHaveValue('option2');
    }

    async chooseIndiaFromAutocomplete() {
        await this.autocomplete.fill('ind');
        await this.countryOption.click();
        await expect(this.autocomplete).toHaveValue('India');
    }

    async triggerAlertWithName(name) {
        await this.nameInput.fill(name);
        this.page.once('dialog', async (dialog) => {
            expect(dialog.type()).toBe('alert');
            expect(dialog.message()).toContain(name);
            await dialog.accept();
        });
        await this.alertButton.click({ timeout: 10_000 });
    }

    async triggerConfirmWithName(name) {
        this.page.once('dialog', async (dialog) => {
            expect(dialog.type()).toBe('confirm');
            expect(dialog.message().toLowerCase()).toContain('confirm');
            await dialog.accept();
        });
        await this.confirmButton.click({ timeout: 10_000 });
    }
}

module.exports = { AutomationPracticePage };
