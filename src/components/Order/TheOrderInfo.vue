<template>
  <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <p class="cart__message">
            Благодарим за&nbsp;выбор нашего магазина. На&nbsp;
            Вашу почту придет письмо с&nbsp;деталями заказа.
            Наши менеджеры свяжутся с&nbsp;Вами в&nbsp;течение часа для уточнения деталей доставки.
          </p>

          <ul class="dictionary">
            <li class="dictionary__item">
              <span class="dictionary__key">
                Получатель
              </span>
              <span class="dictionary__value">
                {{ orderData.name }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Адрес доставки
              </span>
              <span class="dictionary__value">
                {{ orderData.address }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Телефон
              </span>
              <span class="dictionary__value">
                {{ orderData.phone  | formatedNumber }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Email
              </span>
              <span class="dictionary__value">
                {{ orderData.email }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Способ оплаты
              </span>
              <span class="dictionary__value">
                картой при получении
              </span>
            </li>
          </ul>
        </div>

        <cart-block
          btn-type="button"
          :is-show-btn="false"
        >
          <order-list
            :order-products="cartProducts"
          />

          <order-total
            :cost-of-delivery="500"
            :products-total="amountsProducts"
            :price-total="totalPrice"
          />
        </cart-block>
      </form>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { formatedPrice } from '@/mixins/formated.mixin';
import CartBlock from '@/components/Cart/CartBlock.vue';
import OrderList from './OrderList.vue';
import OrderTotal from './OrderTotal.vue';

export default {
  name: 'TheOrderInfo',

  mixins: [formatedPrice],

  components: {
    CartBlock,
    OrderList,
    OrderTotal,
  },

  computed: {
    ...mapGetters('order', ['orderData']),
    cartProducts() {
      if (this.orderData.basket) {
        const { items } = this.orderData.basket;
        console.log('items: ', items);
        return items.map((item) => ({
          productId: item.product.id,
          amount: item.quantity,
          product: item.product,
        }));
      }

      return [];
    },

    amountsProducts() {
      if (this.cartProducts.length) {
        return this.cartProducts.reduce((accum, item) => accum + item.amount, 0);
      }

      return 0;
    },

    totalPrice() {
      return this.orderData.totalPrice ? this.orderData.totalPrice : 0;
    },
  },

  created() {
    const hasOrderData = this.orderData && this.orderData.id === this.$route.params.orderId;

    if (!hasOrderData) {
      this.getOrderProduct(this.$route.params.orderId);
    }
  },

  methods: {
    ...mapActions('order', ['getOrderProduct']),
  },
};
</script>
