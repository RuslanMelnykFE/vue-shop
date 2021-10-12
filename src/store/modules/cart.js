import { CartError, CartService } from '@/services/cart.service';

const countingTotalPrice = (accum, item) => item.amount * item.product.price + accum;
const countingAmountsProducts = (accum, product) => accum + product.amount;

const cart = {
  namespaced: true,

  state: {
    cartProducts: [],
    cartProductsData: [],
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
    amountsProducts: (state) => state.cartProducts.reduce(countingAmountsProducts, 0),
    amountItemsCart: (state) => state.cartProducts.length,
  },

  mutations: {
    updateCartAmount(state, cartData) {
      state.cartProducts = cartData;
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
    async getCartData({ state, commit }) {
      commit('updateCartError', {});
      try {
        const { user, items } = await CartService.getCartData(state.userAccessKey);

        if (!state.userAccessKey) {
          localStorage.setItem('userAccessKey', user.accessKey);
          commit('updateAccesKey', user.accessKey);
        }

        commit('updateCartProductsData', items);
        commit('syncCartProducts');

        return true;
      } catch (e) {
        if (e instanceof CartError) {
          commit('updateCartError', {
            errorCode: e.errorCode,
            errorMessage: e.message,
          });
        }

        return false;
      }
    },
    addToCart({ state, commit }, { productId, amount }) {
      const { cartProducts } = state;
      const cartItem = cartProducts.find((product) => product.productId === productId);

      if (cartItem) {
        cartItem.amount = amount;
        commit('updateCartAmount', cartProducts);
        return;
      }

      commit('updateCartAmount', [...cartProducts, { productId, amount }]);
    },
    updateCartProductAmount({ state, commit }, { productId, amount }) {
      const { cartProducts } = state;
      const cartItem = cartProducts.find((product) => product.productId === productId);

      if (cartItem) {
        cartItem.amount = amount;
        commit('updateCartAmount', cartProducts);
      }
    },
    deleteCartProduct({ state, commit }, productId) {
      const { cartProducts } = state;
      const filteredCart = cartProducts.filter((product) => product.productId !== productId);

      commit('updateCartAmount', filteredCart);
    },
  },
};

export default cart;
