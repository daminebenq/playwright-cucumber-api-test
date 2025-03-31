const { Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Then('the response status should be {int}', async function(status) {
  if (!this.response) {
    throw new Error('Response is undefined. Make sure a request was made and the response was stored in this.response');
  }

  if (typeof this.response.status === 'function') {
    expect(this.response.status()).toBe(status);
  } else {
    expect(this.response.status).toBe(status);
  }
});

Then('the response should contain the field {string}', async function(field) {
  let responseBody;

  if (typeof this.response.json === 'function') {
    responseBody = await this.response.json();
  } else {
    responseBody = this.response.data;
  }

  expect(responseBody).toHaveProperty(field);
});

Then('the response array length should be {int}', async function(length) {
  let responseBody;

  if (typeof this.response.json === 'function') {
    responseBody = await this.response.json();
  } else {
    responseBody = this.response.data;
  }

  expect(Array.isArray(responseBody)).toBeTruthy();
  expect(responseBody.length).toBe(length);
});
