import Vue from 'vue';
import App from './App.vue';
import router from './router/index';
import store from './store/index';
import ApiService from './services/api.service';
import baseURL from './services/config.service';

Vue.config.productionTip = false;
ApiService.init(baseURL);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
