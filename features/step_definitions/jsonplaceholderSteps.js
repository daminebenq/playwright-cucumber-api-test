const { Given, When } = require('@cucumber/cucumber');
const { request } = require('@playwright/test');

Given('I use the JSONPlaceholder API with base URL {string}', async function(baseUrl) {
  this.baseUrl = baseUrl;
  this.context = await request.newContext({
    baseURL: this.baseUrl
  });
});

Given('the endpoint is {string}', async function(endpoint) {
  this.endpoint = endpoint;
});

When('I send a GET request', async function() {
  try {
    this.response = await this.context.get(this.endpoint);
  } catch (error) {
    this.error = error;
  }
});

When('I send a POST request with body {string}', async function(bodyStr) {
  try {
    const body = JSON.parse(bodyStr);
    this.response = await this.context.post(this.endpoint, {
      data: body
    });
  } catch (error) {
    this.error = error;
  }
});
