<template>
  <div class="cart__total">
    <p>
      Доставка: <b>{{ costOfDelivery | formatedNumber }} у.е.</b>
    </p>
    <p>
      Итого: <b>{{ productsTotal | formatedNumber }}</b>
      {{ formatedProductsText }} на сумму <b>{{ priceTotal | formatedNumber }} у.е.</b>
    </p>
  </div>
</template>

<script>
import { formatedPrice } from '@/mixins/formated.mixin';
import { formatedTextProducts } from '@/services/formated.service';

export default {
  name: 'OrderTotal',

  mixins: [formatedPrice],

  props: {
    costOfDelivery: {
      type: Number,
      default: 0,
    },
    productsTotal: {
      type: Number,
      default: 0,
    },
    priceTotal: {
      type: Number,
      default: 0,
    },
  },

  computed: {
    formatedProductsText() {
      return formatedTextProducts(this.productsTotal);
    },
  },
};
</script>
