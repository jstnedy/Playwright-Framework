const { LoginPage } = require('../pageObjects/LoginPage');
const { RegistrationPage } = require('../pageObjects/RegistrationPage');
const { DashboardPage } = require('../pageObjects/DashboardPage');
const { CheckoutPage } = require('../pageObjects/CheckOutPage');
const { OrderHistoryPage } = require('../pageObjects/OrdersHistoryPage');
const { AutomationExerciseAuthPage } = require('../pageObjects/AutomationExerciseAuthPage');

class PageObjectManager {
    constructor(page) {
        this.page = page;
        this._registrationPage = null;
        this._loginPage = null;
        this._dashboardPage = null;
        this._checkOutPage = null;
        this._ordersHistoryPage = null;
        this._automationExerciseAuthPage = null;
    }

    get registrationPage() {
        if (!this._registrationPage) {
            this._registrationPage = new RegistrationPage(this.page);
        }
        return this._registrationPage;
    }

    get loginPage() {
        if (!this._loginPage) {
            this._loginPage = new LoginPage(this.page);
        }
        return this._loginPage;
    }

    get dashboardPage() {
        if (!this._dashboardPage) {
            this._dashboardPage = new DashboardPage(this.page);
        }
        return this._dashboardPage;
    }

    get checkOutPage() {
        if (!this._checkOutPage) {
            this._checkOutPage = new CheckoutPage(this.page);
        }
        return this._checkOutPage;
    }

    get ordersHistoryPage() {
        if (!this._ordersHistoryPage) {
            this._ordersHistoryPage = new OrderHistoryPage(this.page);
        }
        return this._ordersHistoryPage;
    }

    get automationExerciseAuthPage() {
        if (!this._automationExerciseAuthPage) {
            this._automationExerciseAuthPage = new AutomationExerciseAuthPage(this.page);
        }
        return this._automationExerciseAuthPage;
    }

    // Legacy getter methods for backwards compatibility
    getRegistrationPage() {
        return this.registrationPage;
    }

    getLoginPage() {
        return this.loginPage;
    }

    getDashboardPage() {
        return this.dashboardPage;
    }

    getCheckOutPage() {
        return this.checkOutPage;
    }

    getOrdersHistoryPage() {
        return this.ordersHistoryPage;
    }

    getAutomationExerciseAuthPage() {
        return this.automationExerciseAuthPage;
    }
}

module.exports = { PageObjectManager };
