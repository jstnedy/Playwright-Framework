const { test } = require('@playwright/test');

// You must extend 'test', not just 'base'
exports.customTest = test.extend({
    testDataForOrder: async ({}, use) => {
        await use({
            productName1: "Zara Coat 3",
            productName2: "Adidas Orignal",
            productName3: "iphone 13 pro",
        });
    }
});