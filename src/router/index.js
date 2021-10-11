import Vue from 'vue';
import VueRouter from 'vue-router';
import ViewMain from '@/views/ViewMain.vue';

Vue.use(VueRouter);

const routes = [
  {
    name: 'main',
    path: '/',
    component: ViewMain,
  },
  {
    name: 'product',
    path: '/product/:productId',
    component: () => import('@/views/ViewProduct.vue'),
  },
  {
    name: 'cart',
    path: '/cart',
    component: () => import('@/views/ViewCart.vue'),
  },
  {
    name: 'notFoundPage',
    path: '*',
    component: () => import('@/views/ViewNotFoundPage.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
