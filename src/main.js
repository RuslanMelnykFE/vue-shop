import Vue from 'vue';
import App from './App.vue';

// TODO: удалить после сдачи дз
import showAlert from './test1';
import { valueText1, valueText2 } from './test2';

showAlert(valueText1);
showAlert(valueText2);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
