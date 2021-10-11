<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img
        :src="cartProduct.product.image"
        width="120"
        height="120"
        :alt="cartProduct.product.title"
      />
    </div>
    <h3 class="product__title">
      {{ cartProduct.product.title }}
    </h3>
    <p class="product__info">Объем: <span>128GB</span></p>
    <span class="product__code">
      Артикул: {{ cartProduct.product.id }}
    </span>

    <product-counter
      width-button="10"
      height-button="10"
      v-model.number="productAmount"
      class="product__counter"
    />

    <b class="product__price">
      {{ getSumProducts(cartProduct.amount, cartProduct.product.price) | formatedNumber }} ₽
    </b>

    <button
      class="product__del button-del"
      type="button"
      aria-label="Удалить товар из корзины"
      @click.prevent="deleteProduct(cartProduct.product.id)"
    >
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
import { mapActions } from 'vuex';
import formatedNumber from '@/services/formatedNumber.service';
import ProductCounter from '@/components/Product/ProductCounter.vue';

export default {
  name: 'CartItem',

  filters: {
    formatedNumber,
  },

  components: {
    ProductCounter,
  },

  props: {
    cartProduct: {
      type: Object,
      required: true,
    },
  },

  computed: {
    productAmount: {
      get() {
        return this.cartProduct.amount;
      },
      set(value) {
        this.updateProductAmount({ productId: this.cartProduct.productId, amount: value || 0 });
      },
    },
  },

  methods: {
    ...mapActions('cart', {
      updateProductAmount: 'updateCartProductAmount',
      deleteProduct: 'deleteCartProduct',
    }),

    getSumProducts(productAmount, productPrice) {
      return productAmount * productPrice;
    },
  },
};
</script>
