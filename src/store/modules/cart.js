import products from '@/data/products';

const countingTotalPrice = (accum, item) => item.amount * item.product.price + accum;
const countingAmountsProducts = (accum, product) => accum + product.amount;

const cart = {
  namespaced: true,

  state: {
    cartProducts: [],
  },

  getters: {
    cartDetailProducts: (state) => state.cartProducts.map((cartItem) => ({
      ...cartItem,
      product: products.find((productsItem) => productsItem.id === cartItem.productId),
    })),
    cartTotalPrice: (state, getters) => getters.cartDetailProducts.reduce(countingTotalPrice, 0),
    amountsProducts: (state) => state.cartProducts.reduce(countingAmountsProducts, 0),
    amountItemsCart: (state) => state.cartProducts.length,
  },

  mutations: {
    updateCartAmount(state, cartData) {
      state.cartProducts = cartData;
    },
  },

  actions: {
    addToCart({ state, commit }, { productId, amount }) {
      const { cartProducts } = state;
      const cartItem = cartProducts.find((product) => product.productId === productId);

      if (cartItem) {
        cartItem.amount += amount;
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
