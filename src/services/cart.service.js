import ApiService from './api.service';

class CartError extends Error {
  constructor(errorCode, message) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.errorCode = errorCode;
  }
}

const CartService = {
  async getCartData(userAccessKey) {
    const requestData = {
      method: 'get',
      url: '/api/baskets',
      params: {
        userAccessKey,
      },
    };

    try {
      const { data } = await ApiService.customRequest(requestData);

      return data;
    } catch (error) {
      throw new CartError(error.response.status, error.response.data.error.message);
    }
  },

  setRequestData({ method, userAccessKey, productData }) {
    return {
      method,
      url: '/api/baskets/products',
      params: {
        userAccessKey,
      },
      data: productData,
    };
  },

  async addProductToCart(userAccessKey, productData) {
    const requestData = this.setRequestData({ method: 'post', userAccessKey, productData });

    try {
      const { data, status } = await ApiService.customRequest(requestData);

      return { data, status };
    } catch (error) {
      throw new CartError(error.response.status, error.response.data.error.message);
    }
  },

  async changeProductAtCart(userAccessKey, productData) {
    const requestData = this.setRequestData({ method: 'put', userAccessKey, productData });

    try {
      const { data } = await ApiService.customRequest(requestData);

      return data;
    } catch (error) {
      throw new CartError(error.response.status, error.response.data.error.message);
    }
  },

  async deleteProductAtCart(userAccessKey, productData) {
    const requestData = this.setRequestData({ method: 'delete', userAccessKey, productData });

    try {
      const { data } = await ApiService.customRequest(requestData);

      return data;
    } catch (error) {
      throw new CartError(error.response.status, error.response.data.error.message);
    }
  },
};

export { CartError, CartService };
