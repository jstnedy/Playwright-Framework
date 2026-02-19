Feature: Ecommerce Validations

  @Regression
  @smoke
  @newUser
  Scenario: Place order with newly registered user
    Given I register a new user and log in
    When I add the item "ZARA COAT 3" to the cart
    Then the item "ZARA COAT 3" should be in the cart
    When I place the order with valid details
    Then the order should appear in order history
  
  @Regression
  @existingUser
  Scenario: Place order with existing user
    Given I log in with username "justine.agner1@gmail.com" and password "es11kawa"
    When I add the item "ZARA COAT 3" to the cart
    Then the item "ZARA COAT 3" should be in the cart
    When I place the order with valid details
    Then the order should appear in order history

  @Regression
  @Validation
  @nonExistingUser1
  Scenario Outline: Place order with non-existing user
    Given I log in with invalid username "<username>" and password "<password>"
    Then I should see an error message indicating invalid login

  Examples:
      | username           | password  |
      | invalid@gmail.com  | es11kawa  |
      | invalid2@gmail.com | wrongpass |
