const { request } = require('@playwright/test');

class ApiPage {
  static async createClient(baseURL) {
    return await request.newContext({
      baseURL
    });
  }

  static async getRequest(client, url) {
    if (client) {
      return await client.get(url);
    } else {
      const context = await request.newContext();
      return await context.get(url);
    }
  }

  static async postRequest(client, url, body) {
    if (client) {
      return await client.post(url, { data: body });
    } else {
      const context = await request.newContext();
      return await context.post(url, { data: body });
    }
  }

  static async putRequest(client, url, body) {
    if (client) {
      return await client.put(url, { data: body });
    } else {
      const context = await request.newContext();
      return await context.put(url, { data: body });
    }
  }

  static async deleteRequest(client, url) {
    if (client) {
      return await client.delete(url);
    } else {
      const context = await request.newContext();
      return await context.delete(url);
    }
  }

  static validateJsonSchema(response, schema, ajv) {
    const validate = ajv.compile(schema);
    const valid = validate(response);
    return valid;
  }
}

module.exports = ApiPage;
