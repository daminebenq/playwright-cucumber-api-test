# Playwright Cucumber API Test

This project uses Playwright and Cucumber to test API endpoints. It demonstrates how to create and run API tests using BDD principles.

## Prerequisites

- Node.js 14 or higher
- npm or yarn package manager

## Installation
1. Clone the repository.
2. Run the following command to install the dependencies:
   ```bash
   npm install
   ```

## Running Tests
To execute the tests, run:
```bash
npm test
```

## Project Structure
- `pages/`
  - `apiPage.js` (API interactions and request methods)
- `features/`
  - `api.feature` (Cucumber feature file with API test scenarios)
  - `jsonplaceholder.feature` (Test scenarios for JSONPlaceholder API)
  - `schemas/`
    - `jsonplaceholder_user.json` (JSON schema for user validation)
    - `users_schema.json` (JSON schema for users endpoint validation)
  - `step_definitions/`
    - `apiSteps.js` (Step definitions for API tests)
    - `commonSteps.js` (Reusable step definitions across features)
    - `jsonplaceholderSteps.js` (Step definitions specific to JSONPlaceholder API)
- `cucumber.js` (Cucumber configuration)
- `package.json` (Project dependencies and scripts)

## Test Scenario
The test verifies that the GET request to the following endpoint returns a 200 status and contains a field named `data`:
```
https://app.beeceptor.com/mock-server/fake-json-api
```

## Test Scenarios

### Positive Test Cases
1. **Basic Endpoint Verification**:
   - Verify GET requests to various endpoints return 200 status codes
   - Validate that endpoint responses contain expected fields
   - Check array responses have the expected number of items

2. **Authentication Tests**:
   - Verify successful login with valid credentials returns a token
   - Test single resource retrieval (users, companies, comments)

3. **Data Structure Validation**:
   - Validate root endpoint meta information
   - Verify JSON structure of responses using schema validation

### Negative Test Cases
1. **Invalid HTTP Methods**:
   - Verify the response for unsupported HTTP methods like PUT or DELETE
   - Test response codes (405 Method Not Allowed)

2. **Missing or Invalid Parameters**:
   - Test endpoints with missing required parameters
   - Test endpoints with invalid parameter values
   - Validate 400 Bad Request responses
   - Verify 422 Unprocessable Entity for invalid parameters

3. **Edge Cases**:
   - Test endpoints that return empty responses
   - Test endpoints with unexpected data formats
   - Handle invalid endpoints (404 responses)
   - Test invalid resource IDs
   - Verify authentication failures (401 responses)
   - Test empty response bodies (204 No Content)

4. **Error Handling**:
   - Verify error messages in responses
   - Validate handling of non-JSON responses

Refer to the `features/api.feature` and `features/jsonplaceholder.feature` files for detailed scenarios.

## Additional Information

### Writing New Tests
To add new tests:
1. Create a new feature file in the `features` directory
2. Implement step definitions in `features/step_definitions`
3. Run the tests using `npm test`

### Configuring Tests
You can modify the Cucumber configuration in the `cucumber.js` file to customize test execution options.
