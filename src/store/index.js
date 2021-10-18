import Vue from 'vue';
import Vuex from 'vuex';
import preloader from './modules/preloader';
import product from './modules/product';
import cart from './modules/cart';
import colors from './modules/colors';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    preloader,
    product,
    cart,
    colors,
  },
});

export default store;
