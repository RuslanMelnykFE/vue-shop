<template>
  <li class="catalog__item">
    <a
      class="catalog__pic"
      href="#"
      @click.prevent="gotoPage('product', { id: product.id })"
    >
      <img :src="product.image" srcset="img/radio@2x.jpg 2x" alt="Название товара" />
    </a>

    <h3 class="catalog__title">
      <a href="#"  @click.prevent="gotoPage(product.id)">
        {{ product.title }}
      </a>
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
