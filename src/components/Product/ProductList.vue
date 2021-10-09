<template>
  <ul class="catalog__list">
    <product-item
      v-for="product in productList"
      :key="product.id"
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
