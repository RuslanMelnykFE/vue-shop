<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'main' }">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Корзина
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span v-if="amountsProducts" class="content__info">
        {{ amountsProducts }} {{ formatedText }}
      </span>
    </div>

    <the-cart/>
  </main>
</template>

<script>
import { formatedProducts } from '@/mixins/formated.mixin';
import TheCart from '@/components/Cart/TheCart.vue';

export default {
  name: 'ViewCart',

  mixins: [formatedProducts],

  components: {
    TheCart,
  },
};
</script>
