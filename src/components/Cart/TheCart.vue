<template>
  <section class="cart">
    <form class="cart__form form" action="#" method="POST">
      <div class="cart__field">
        <ul class="cart__list">
          <cart-item
            v-for="cartItem in cartProducts"
            :key="`cart-${cartItem.product.id}`"
            :cart-product="cartItem"
          />
        </ul>
      </div>

      <div class="cart__block">
        <p class="cart__desc">
          Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
        </p>
        <p class="cart__price">Итого: <span>{{ totalPrice | formatedNumber }} ₽</span></p>

        <button class="cart__button button button--primery" type="submit">
          Оформить заказ
        </button>
      </div>
    </form>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import formatedNumber from '@/services/formatedNumber.service';
import CartItem from './CartItem.vue';

export default {
  name: 'Cart',

  filters: {
    formatedNumber,
  },

  components: {
    CartItem,
  },

  computed: {
    ...mapGetters('cart', {
      cartProducts: 'cartDetailProducts',
      totalPrice: 'cartTotalPrice',
    }),
  },
};
</script>
