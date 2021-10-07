<template>
  <ul class="catalog__list">
    <product-item
      v-for="(product, idx) in productList"
      :key="idx"
      :product="product"
    />
  </ul>
</template>

<script>
import ProductItem from './ProductItem.vue';

export default {
  props: {
    productList: {
      type: Array,
      default() {
        return [];
      },
    },
  },

  components: {
    ProductItem,
  },
};
</script>
