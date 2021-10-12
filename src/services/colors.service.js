import ApiService from './api.service';

class ColorsError extends Error {
  constructor(errorCode, message) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.errorCode = errorCode;
  }
}

const ColorsService = {
  async getColors() {
    try {
      const { data } = await ApiService.get('/api/colors');
      return data;
    } catch (error) {
      throw new ColorsError(error.response.status, error.response.data.message);
    }
  },
};

export { ColorsError, ColorsService };
