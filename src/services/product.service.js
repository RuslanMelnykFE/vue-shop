import ApiService from './api.service';

class ProductError extends Error {
  constructor(errorCode, message) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.errorCode = errorCode;
  }
}

const ProductService = {
  async getProductCategories() {
    try {
      const { data } = await ApiService.get('/api/productCategories');

      return data;
    } catch (error) {
      throw new ProductError(error.response.status, error.response.data.error.message);
    }
  },

  async getProducts(params) {
    const requestData = {
      method: 'get',
      url: '/api/products',
      params,
    };

    try {
      const { data } = await ApiService.customRequest(requestData);

      return data;
    } catch (error) {
      throw new ProductError(error.response.status, error.response.data.error.message);
    }
  },

  async getProduct(productId) {
    try {
      const { data } = await ApiService.get(`/api/products/${productId}`);

      return data;
    } catch (error) {
      throw new ProductError(error.response.status, error.response.data.error.message);
    }
  },
};

export { ProductError, ProductService };
