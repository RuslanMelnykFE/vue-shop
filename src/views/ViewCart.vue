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
import { mapGetters } from 'vuex';
import TheCart from '@/components/Cart/TheCart.vue';

export default {
  name: 'ViewCart',

  components: {
    TheCart,
  },

  computed: {
    ...mapGetters('cart', ['amountsProducts']),
    formatedText() {
      if (this.amountsProducts === 1) {
        return 'товар';
      }

      if (this.amountsProducts > 4 && this.amountsProducts < 21) {
        return 'товаров';
      }

      if (this.amountsProducts > 20) {
        const amountText = String(this.amountsProducts);
        const lastChar = Number(amountText[amountText.length - 1]);

        if (lastChar === 1) {
          return 'товар';
        }

        if ((lastChar > 4 && lastChar < 10) || lastChar === 0) {
          return 'товаров';
        }
      }

      return 'товара';
    },
  },
};
</script>
