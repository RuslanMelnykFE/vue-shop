import ApiService from './api.service';

class OrderError extends Error {
  constructor(errorCode, message) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.errorCode = errorCode;
  }
}

const OrderService = {
  async orderProudcts(userAccessKey, orderData) {
    const requestData = {
      method: 'post',
      url: '/api/orders',
      params: {
        userAccessKey,
      },
      data: orderData,
    };

    try {
      const response = await ApiService.customRequest(requestData);
      return response;
    } catch (error) {
      const { response } = error;

      if (response.data.error.request) {
        const { request } = response.data.error;
        throw new OrderError(response.status, { request });
      }

      if (response.data.error.query) {
        const { query } = response.data.error;
        throw new OrderError(response.status, { query });
      }

      throw new OrderError(response.status, { text: response.data.error.message });
    }
  },
  async getOrderProduct(userAccessKey, orderId) {
    const requestData = {
      method: 'get',
      url: `/api/orders/${orderId}`,
      params: {
        userAccessKey,
      },
    };

    try {
      const { data } = await ApiService.customRequest(requestData);
      return data;
    } catch (error) {
      const { response } = error;
      throw OrderError(response.statusCode, response.data.error.message);
    }
  },
};

export { OrderError, OrderService };
