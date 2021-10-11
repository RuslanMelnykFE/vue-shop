<template>
  <li class="catalog__item">
    <router-link
      class="catalog__pic"
      :to="{ name: 'product', params: { productId: product.id } }"
    >
      <img :src="product.image" srcset="img/radio@2x.jpg 2x" alt="Название товара" />
    </router-link>

    <h3 class="catalog__title">
      <router-link :to="{ name: 'product', params: { productId: product.id } }">
        {{ product.title }}
      </router-link>
    </h3>

    <span class="catalog__price">
      {{ product.price | formatedNumber }} ₽
    </span>

    <ul class="colors colors--black">
      <input-radio-color-item
        v-for="color in product.colors"
        :key="`${product.id}-${color}`"
        :color="color"
        input-name="color-1"
        v-model="productColor"
      />
    </ul>
  </li>
</template>

<script>
import formatedNumber from '@/services/formatedNumber.service';
import gotoPage from '@/services/gotoPage.service';

import InputRadioColorItem from '@/components/Form/InputRadioColorItem.vue';

export default {
  name: 'ProductItem',

  components: {
    InputRadioColorItem,
  },

  filters: {
    formatedNumber,
  },

  props: {
    product: {
      type: Object,
      default() {
        return {};
      },
    },
  },

  data: () => ({
    productColor: '',
  }),

  methods: {
    gotoPage,
  },
};
</script>
