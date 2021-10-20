<template>
  <ul class="cart__orders">
    <li
      v-for="orderProduct in orderProducts"
      :key="`order-product-${orderProduct.product.id}`"
      class="cart__order"
    >
      <h3>{{ orderProduct.product.title }}</h3>
      <b>
        {{ getPrice(orderProduct.amount, orderProduct.product.price) | formatedNumber }} у.е.
      </b>
      <span>Артикул: {{ orderProduct.product.id }}</span>
    </li>
  </ul>
</template>

<script>
import { formatedPrice } from '@/mixins/formated.mixin';

export default {
  name: 'OrderList',

  mixins: [formatedPrice],

  props: {
    orderProducts: {
      type: Array,
      default() {
        return [];
      },
    },
  },

  methods: {
    getPrice(productAmount, productPrice) {
      return productAmount * productPrice;
    },
  },
};
</script>
