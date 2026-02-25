const { test } = require('@playwright/test');
const { AutomationPracticePage } = require('../pageObjects/AutomationPracticePage');

test.describe('Automation Practice Happy Path', () => {
  test('@Web happy path flow on AutomationPractice page', async ({ page }) => {
    const automationPracticePage = new AutomationPracticePage(page);

    await automationPracticePage.goToPage();
    await automationPracticePage.verifyPageTitle();

    await automationPracticePage.selectRadioOption2();
    await automationPracticePage.selectCheckboxOption2();
    await automationPracticePage.selectDropdownOption2();
    await automationPracticePage.chooseIndiaFromAutocomplete();

    await automationPracticePage.triggerAlertWithName('JUSTINE');
    await automationPracticePage.triggerConfirmWithName('JUSTINE');
  });
});
