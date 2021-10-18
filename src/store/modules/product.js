import { ProductError, ProductService } from '@/services/product.service';

const product = {
  namespaced: true,

  state: {
    productCategories: [],
    productsData: [],
    productData: {},
    productPagination: {},
    productCategoriesError: {},
    productsError: {},
    productError: {},
  },

  getters: {
    productCategories: (state) => state.productCategories,
    productsData: (state) => state.productsData,
    productData: (state) => state.productData,
    productPagination: (state) => state.productPagination,
    productCategoriesError: (state) => state.productCategoriesError,
    productsError: (state) => state.productsError,
    productError: (state) => state.productError,
  },

  mutations: {
    updateProductCategories(state, productCategories) {
      state.productCategories = productCategories;
    },
    updateProductsData(state, productsData) {
      state.productsData = productsData;
    },
    updateProductData(state, productData) {
      state.productData = productData;
    },
    updateProductPagination(state, productPagination) {
      state.productPagination = productPagination;
    },
    updateProductCategoriesError(state, productCategoriesError) {
      state.productCategoriesError = productCategoriesError;
    },
    updateProductsError(state, productsError) {
      state.productsError = productsError;
    },
    updateProductError(state, productError) {
      state.productError = productError;
    },
  },

  actions: {
    async loadProductCategories({ dispatch, commit }) {
      commit('updateProductCategoriesError', {});
      dispatch('preloader/togglePreloader', true, { root: true });

      try {
        const { items } = await ProductService.getProductCategories();

        commit('updateProductCategories', items);
        dispatch('preloader/togglePreloader', false, { root: true });

        return true;
      } catch (e) {
        dispatch('preloader/togglePreloader', false, { root: true });

        if (e instanceof ProductError) {
          commit('updateProductCategoriesError', {
            errorCode: e.errorCode,
            errorMessage: e.message,
          });
        }

        return false;
      }
    },

    async loadProductsData({ dispatch, commit }, requestParams) {
      commit('updateProductsError', {});
      dispatch('preloader/togglePreloader', true, { root: true });

      try {
        const { items, pagination } = await ProductService.getProducts(requestParams);

        commit('updateProductsData', items);
        commit('updateProductPagination', pagination);
        dispatch('preloader/togglePreloader', false, { root: true });

        return true;
      } catch (e) {
        dispatch('preloader/togglePreloader', false, { root: true });

        if (e instanceof ProductError) {
          commit('updateProductsError', {
            errorCode: e.errorCode,
            errorMessage: e.message,
          });
        }
        return false;
      }
    },

    async loadProductData({ dispatch, commit }, productId) {
      commit('updateProductError', {});
      dispatch('preloader/togglePreloader', true, { root: true });

      try {
        const data = await ProductService.getProduct(productId);

        commit('updateProductData', data);
        dispatch('preloader/togglePreloader', false, { root: true });

        return true;
      } catch (e) {
        dispatch('preloader/togglePreloader', false, { root: true });

        if (e instanceof ProductError) {
          throw commit('updateProductError', {
            errorCode: e.errorCode,
            errorMessage: e.message,
          });
        }

        return false;
      }
    },
  },
};

export default product;
