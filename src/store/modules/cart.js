import { CartError, CartService } from '@/services/cart.service';

const countingTotalPrice = (accum, item) => item.amount * item.product.price + accum;
const countingAmountsProducts = (accum, product) => accum + product.amount;
const startAction = ({ commit, dispatch }) => {
  commit('updateCartError', {});
  dispatch('preloader/togglePreloader', true, { root: true });
};
const updateCartData = ({ commit, dispatch, items }) => {
  commit('updateCartProductsData', items);
  commit('syncCartProducts');
  dispatch('preloader/togglePreloader', false, { root: true });
};

const cart = {
  namespaced: true,

  state: {
    cartProducts: [],
    cartProductsData: [],
    cartSuccessStatus: 0,
    cartError: {},
    userAccessKey: null,
  },

  getters: {
    cartDetailProducts: (state) => state.cartProducts.map((cartItem) => {
      const { product } = state.cartProductsData.find(
        (item) => item.product.id === cartItem.productId,
      );

      return {
        ...cartItem,
        product,
      };
    }),
    cartTotalPrice: (state, getters) => getters.cartDetailProducts.reduce(countingTotalPrice, 0),
    cartSuccessStatus: (state) => state.cartSuccessStatus,
    amountsProducts: (state) => state.cartProducts.reduce(countingAmountsProducts, 0),
    amountItemsCart: (state) => state.cartProducts.length,
  },

  mutations: {
    updateCartProducts(state, { productId, amount }) {
      const { cartProducts } = state;
      const cartItem = cartProducts.find((item) => item.productId === productId);

      if (cartItem) {
        cartItem.amount = amount;
        state.cartProducts = cartProducts;
      }
    },
    updateCartAmount(state, cartData) {
      state.cartProducts = cartData;
    },
    updateCartSuccessStatus(state, statusCode) {
      state.cartSuccessStatus = statusCode;
    },
    updateCartError(state, errorData) {
      state.cartError = errorData;
    },
    updateAccesKey(state, accessKeyValue) {
      state.userAccessKey = accessKeyValue;
    },
    updateCartProductsData(state, productsData) {
      state.cartProductsData = productsData;
    },
    syncCartProducts(state) {
      state.cartProducts = state.cartProductsData.map((productData) => ({
        productId: productData.product.id,
        amount: productData.quantity,
      }));
    },
  },

  actions: {
    async loadCartData(context) {
      const { state, commit, dispatch } = context;

      startAction({ commit, dispatch });

      try {
        const { user, items } = await CartService.getCartData(state.userAccessKey);

        if (!state.userAccessKey) {
          localStorage.setItem('userAccessKey', user.accessKey);
          commit('updateAccesKey', user.accessKey);
        }

        updateCartData({ commit, dispatch, items });

        return true;
      } catch (e) {
        dispatch('preloader/togglePreloader', false, { root: true });

        if (e instanceof CartError) {
          commit('updateCartError', {
            errorCode: e.errorCode,
            errorMessage: e.message,
          });
        }

        return false;
      }
    },

    async addToCart(context, { productId, amount }) {
      const { state, commit, dispatch } = context;

      startAction({ commit, dispatch });
      commit('updateCartSuccessStatus', 0);

      try {
        const productData = {
          productId,
          quantity: amount,
        };
        const { userAccessKey } = state;
        const { data, status } = await CartService.addProductToCart(userAccessKey, productData);

        updateCartData({ commit, dispatch, items: data.items });
        commit('updateCartSuccessStatus', status);

        return true;
      } catch (e) {
        dispatch('preloader/togglePreloader', false, { root: true });

        if (e instanceof CartError) {
          commit('updateCartError', {
            errorCode: e.errorCode,
            errorMessage: e.message,
          });
        }

        return false;
      }
    },

    async updateCartProductAmount(context, { productId, amount }) {
      const { state, commit } = context;

      commit('updateCartError', {});
      commit('updateCartProducts', { productId, amount });

      try {
        const productData = {
          productId,
          quantity: amount,
        };
        const { items } = await CartService.changeProductAtCart(state.userAccessKey, productData);

        commit('updateCartProductsData', items);

        return true;
      } catch (e) {
        if (e instanceof CartError) {
          commit('syncCartProducts');
          commit('updateCartError', {
            errorCode: e.errorCode,
            errorMessage: e.message,
          });
        }

        return false;
      }
    },
    async deleteCartProduct({ state, commit }, productId) {
      const { cartProducts } = state;
      const filteredCart = cartProducts.filter((product) => product.productId !== productId);

      commit('updateCartError', {});
      commit('updateCartAmount', filteredCart);

      try {
        const productData = {
          productId,
        };
        const { items } = await CartService.deleteProductAtCart(state.userAccessKey, productData);

        commit('updateCartProductsData', items);

        return true;
      } catch (e) {
        if (e instanceof CartError) {
          commit('syncCartProducts');
          commit('updateCartError', {
            errorCode: e.errorCode,
            errorMessage: e.message,
          });
        }

        return false;
      }
    },
  },
};

export default cart;
