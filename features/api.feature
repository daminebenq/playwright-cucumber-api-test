Feature: API Testing

  Background: Default Parameters
    Given the base API endpoint is set

  Scenario Outline: Verify list endpoints
    Given the API endpoint is set to "<endpoint>"
    When I make a GET request
    Then the response status should be 200
    Then the response should contain the field "0.id"

    Examples:
      | endpoint   |
      | /users     |
      | /companies |

  Scenario Outline: Verify single resource endpoints
    Given the API endpoint is set to "<endpoint>/<id>"
    When I make a GET request
    Then the response status should be 200
    Then the response should contain the field "id"

    Examples:
      | endpoint   | id |
      | /users     | 1  |
      | /companies | 1  |

  Scenario Outline: Verify specialized endpoints
    Given the API endpoint is set to "<endpoint>"
    When I make a GET request
    Then the response status should be 200
    Then the response should contain the field "<field>"

    Examples:
      | endpoint       | field      |
      | /customers     | 0.username |
      | /notifications | 0.title    |
      | /              | status     |

  # Negative test cases
  Scenario: Handle invalid user endpoint
    Given the API endpoint is set to "/users/invalid_id"
    When I make a GET request
    Then the response status should be 200
    Then the response should not be valid JSON

  Scenario Outline: Validate HTTP error responses
    Given I send a <method> request to "<endpoint>" <details>
    Then the response status should be <status>
    And the response body should contain "<message>"

    Examples:
      | method | endpoint      | details                 | status | message              |
      | PUT    | /api/endpoint |                         | 405    | Method Not Allowed   |
      | GET    | /api/endpoint | without parameters      | 400    | Bad Request          |
      | GET    | /api/endpoint | with "invalidParam=123" | 422    | Unprocessable Entity |

  Scenario: Test endpoint with empty response
    Given I send a GET request to "/api/emptyEndpoint"
    Then the response status should be 204
    And the response body should be empty
