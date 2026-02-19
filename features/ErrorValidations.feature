Feature: Ecommerce Validations

  @Validation
  @nonExistingUsers
  Scenario Outline: Place order with non-existing user
    Given I log in with invalid username "<username>" and password "<password>"
    Then I should see an error message indicating invalid login

  Examples:
      | username           | password  |
      | invalid@gmail.com  | es11kawa  |
      | invalid2@gmail.com | wrongpass |
