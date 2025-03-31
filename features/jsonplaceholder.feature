Feature: JSONPlaceholder Mock API

    Background: Default Parameters
        Given I use the JSONPlaceholder API with base URL "https://json-placeholder.mock.beeceptor.com"

    Scenario Outline: Verify GET list endpoints
        Given the endpoint is "<endpoint>"
        When I send a GET request
        Then the response status should be 200
        And the response array length should be <expectedLength>

        Examples:
            | endpoint   | expectedLength |
            | /comments  | 20             |
            | /companies | 10             |
            | /posts     | 10             |
            | /roles     | 5              |
            | /todos     | 20             |
            | /users     | 20             |

    Scenario Outline: Verify GET single-item endpoints
        Given the endpoint is "<endpoint>"
        When I send a GET request
        Then the response status should be 200
        And the response should contain the field "id"

        Examples:
            | endpoint     |
            | /comments/1  |
            | /companies/1 |
            | /posts/1     |
            | /roles/1     |
            | /todos/1     |
            | /users/1     |

    Scenario Outline: Verify authentication endpoints
        Given the endpoint is "/login"
        When I send a POST request with body '<requestBody>'
        Then the response status should be <statusCode>
        And the response should contain the field "<responseField>"

        Examples:
            | scenario         | requestBody                                          | statusCode | responseField |
            | successful login | {"username":"michael","password":"success-password"} | 200        | token         |
            | invalid login    | {"username":"user123","password":"failed-password"}  | 401        | error         |

    Scenario Outline: Handle error cases
        Given the endpoint is "<endpoint>"
        When I send a <method> request
        Then the response status should be <statusCode>

        Examples:
            | scenario         | endpoint                            | method | statusCode |
            | invalid endpoint | http://example.com/invalid-endpoint | GET    | 404        |
