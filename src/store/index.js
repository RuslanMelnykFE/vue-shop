import Vue from 'vue';
import Vuex from 'vuex';
import preloader from './modules/preloader';
import product from './modules/product';
import cart from './modules/cart';
import order from './modules/order';
import colors from './modules/colors';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    preloader,
    product,
    cart,
    order,
    colors,
  },
});

export default store;
