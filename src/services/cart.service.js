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

  async addProductToCart(userAccessKey, productData) {
    const requestData = {
      method: 'post',
      url: '/api/baskets/products',
      params: {
        userAccessKey,
      },
      data: productData,
    };

    try {
      const { data } = await ApiService.customRequest(requestData);

      return data;
    } catch (error) {
      throw new CartError(error.response.status, error.response.data.error.message);
    }
  },
};

export { CartError, CartService };
