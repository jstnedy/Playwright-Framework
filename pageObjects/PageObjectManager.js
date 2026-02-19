
const {LoginPage} = require('../pageObjects/LoginPage');
const {RegistrationPage} = require('../pageObjects/RegistrationPage');
const {DashboardPage} = require('../pageObjects/DashboardPage');
const {CheckoutPage} = require('../pageObjects/CheckOutPage');
const {OrderHistoryPage} = require('../pageObjects/OrdersHistoryPage');



class PageObjectManager{

    constructor(page)
    {   
        this.page = page;
        this.registrationPage = new RegistrationPage(this.page);
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.checkOutPage = new CheckoutPage(this.page);
        this.ordersHistoryPage = new OrderHistoryPage(this.page);
    }

getRegistrationPage()
{
    return this.registrationPage;
}

getLoginPage()
{
    return this.loginPage;
}

getDashboardPage()
{
    return this.dashboardPage;
}

getCheckOutPage()
{
    return this.checkOutPage;
}

getOrdersHistoryPage()
{
    return this.ordersHistoryPage;
}
}

module.exports = {PageObjectManager};