class APIUtils {
  constructor(apiContext, loginPayload) {
    this.apiContext = apiContext;
    this.loginPayload = loginPayload;
    this.token = null;
  }

  async getToken() {
    if (this.token) {
      return {
        status: 200,
        ok: true,
        body: { token: this.token },
        token: this.token
      };
    }

    const loginResponse = await this.apiContext.post(
      'https://rahulshettyacademy.com/api/ecom/auth/login',
      { data: this.loginPayload }
    );

    const loginResponseJson = await loginResponse.json();

    this.token = loginResponseJson.token;

    return {
      status: loginResponse.status(),
      ok: loginResponse.ok(),
      body: loginResponseJson,
      token: this.token
    };
  }

  async createOrder(orderPayload) {
    // get full login object
    const login = await this.getToken();
    const token = login.token;

    const orderResponse = await this.apiContext.post(
      'https://rahulshettyacademy.com/api/ecom/order/create-order',
      {
        data: orderPayload,
        headers: {
          Authorization: token,
          'Content-Type': 'application/json'
        }
      }
    );

    const orderResponseJson = await orderResponse.json();

    return {
      status: orderResponse.status(),
      ok: orderResponse.ok(),
      token,
      orders: orderResponseJson.orders,
      body: orderResponseJson
    };
  }
}

module.exports = { APIUtils };
