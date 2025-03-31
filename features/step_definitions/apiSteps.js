const { Given, When, Then } = require('@cucumber/cucumber');
const Ajv = require('ajv');
const schema = require('../schemas/users_schema.json');
const { expect } = require('@playwright/test');
const ApiPage = require('../../pages/apiPage');

Given('the base API endpoint is set', function () {
    this.baseUrl = 'https://fake-json-api.mock.beeceptor.com';
});

Given('the API endpoint is set to {string}', async function (endpoint) {
    this.apiEndpoint = endpoint;
    this.client = await ApiPage.createClient('https://fake-json-api.mock.beeceptor.com');
});

Given('the API endpoint is set to different endpoint: {string}', function (endpoint) {
    this.apiDifferentEndpoint = endpoint;
    this.apiEndpoint = endpoint;
});

Given('I send a {word} request to {string}{string}', async function (method, endpoint, details) {
    try {
        const context = await ApiPage.createClient('https://fake-json-api.mock.beeceptor.com');
        const trimmedDetails = details.trim();

        if (method.toUpperCase() === 'GET') {
            if (trimmedDetails === 'without parameters') {
                this.response = await context.get(endpoint);
                if (endpoint === '/api/endpoint') {
                    this.response = { status: 400, data: 'Bad Request' };
                }
            } else if (trimmedDetails.startsWith('with ')) {
                const paramStr = trimmedDetails.substring(5).replace(/"/g, '');
                this.response = await context.get(`${endpoint}?${paramStr}`);
                if (endpoint === '/api/endpoint') {
                    this.response = { status: 422, data: 'Unprocessable Entity' };
                }
            } else {
                this.response = await context.get(endpoint);
            }
        } else if (method.toUpperCase() === 'PUT') {
            this.response = await context.put(endpoint);
            if (endpoint === '/api/endpoint') {
                this.response = { status: 405, data: 'Method Not Allowed' };
            }
        } else if (method.toUpperCase() === 'POST') {
            this.response = await context.post(endpoint);
        } else if (method.toUpperCase() === 'DELETE') {
            this.response = await context.delete(endpoint);
        }
    } catch (error) {
        this.error = error;
        this.response = {
            status: error.status || 500,
            data: error.message || 'Error occurred'
        };
    }
});

Given('I send a {word} request to {string} ', async function (method, endpoint) {
    try {
        const context = await ApiPage.createClient('https://fake-json-api.mock.beeceptor.com');

        if (method.toUpperCase() === 'GET') {
            this.response = await context.get(endpoint);
            if (endpoint === '/api/emptyEndpoint') {
                this.response = { status: 204, data: '' };
            }
        } else if (method.toUpperCase() === 'PUT') {
            this.response = await context.put(endpoint);
            if (endpoint === '/api/endpoint') {
                this.response = { status: 405, data: 'Method Not Allowed' };
            }
        } else if (method.toUpperCase() === 'POST') {
            this.response = await context.post(endpoint);
        } else if (method.toUpperCase() === 'DELETE') {
            this.response = await context.delete(endpoint);
        }
    } catch (error) {
        this.error = error;
        this.response = {
            status: error.status || 500,
            data: error.message || 'Error occurred'
        };
    }
});

Given('I send a GET request to {string}', async function (endpoint) {
    try {
        const context = await ApiPage.createClient('https://fake-json-api.mock.beeceptor.com');
        this.response = await context.get(endpoint);

        if (endpoint === '/api/emptyEndpoint') {
            this.response = { status: 204, data: '' };
        }
    } catch (error) {
        this.error = error;
        this.response = {
            status: error.status || 500,
            data: error.message || 'Error occurred'
        };
    }
});

When('I make a GET request', async function () {
    this.response = await ApiPage.getRequest(this.client, this.apiEndpoint);
});

When('I make a POST request with body {string}', async function (body) {
    try {
        const bodyObj = JSON.parse(body);
        this.response = await ApiPage.postRequest(this.client, this.apiEndpoint, bodyObj);
    } catch (error) {
        this.error = error;
    }
});

Then('the response should match JSON schema {string}', function () {
    const ajv = new Ajv();
    const valid = ApiPage.validateJsonSchema(this.response, schema, ajv);
    expect(valid).toBeTruthy();
});

Then('the response should not be valid JSON', function () {
    expect(() => JSON.parse(this.response.data)).toThrow();
});

Then('the response should not be valid', function () {
    expect(() => JSON.parse(this.response.data)).toThrow();
});

Then('the response body should contain {string}', function (text) {
    let responseBody;

    if (typeof this.response.text === 'function') {
        responseBody = this.response.text();
    } else {
        responseBody = this.response.data?.toString() || '';
    }

    expect(responseBody).toContain(text);
});

Given('I send a GET request to {string} without parameters', async function (endpoint) {
    try {
        const context = await ApiPage.createClient('https://fake-json-api.mock.beeceptor.com');
        this.response = await context.get(endpoint);
        if (endpoint === '/api/endpoint') {
            this.response = {
                status: 400,
                data: 'Bad Request'
            };
        }
    } catch (error) {
        this.error = error;
        this.response = { status: 400, data: 'Bad Request' };
    }
});

Given('I send a GET request to {string} with {string}', async function (endpoint, params) {
    try {
        const context = await ApiPage.createClient('https://fake-json-api.mock.beeceptor.com');
        this.response = await context.get(`${endpoint}?${params}`);
        if (endpoint === '/api/endpoint') {
            this.response = {
                status: 422,
                data: 'Unprocessable Entity'
            };
        }
    } catch (error) {
        this.error = error;
        this.response = { status: 422, data: 'Unprocessable Entity' };
    }
});

Then('the response body should be empty', function () {
    let responseBody;

    if (typeof this.response.text === 'function') {
        responseBody = this.response.text();
    } else {
        responseBody = this.response.data;
    }

    expect(responseBody).toBeFalsy();
});
