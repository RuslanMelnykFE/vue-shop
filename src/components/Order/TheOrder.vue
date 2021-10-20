<template>
  <section class="cart">
    <form
      class="cart__form form"
      action="#"
      method="POST"
      @submit.stop.prevent="submitOrderForm"
    >
        <div class="cart__field">
          <div class="cart__data">
            <base-form-input
              v-bind="fieldsData.name"
              v-model="formData.name"
              :error="requestError.name"
            />

            <base-form-input
              v-bind="fieldsData.address"
              v-model="formData.address"
              :error="requestError.address"
            />

            <base-form-input
              v-bind="fieldsData.phone"
              v-model="formData.phone"
              :error="requestError.phone"
            />

            <base-form-input
              v-bind="fieldsData.email"
              v-model="formData.email"
              :error="requestError.email"
            />

            <base-form-textarea
              v-bind="fieldsData.comment"
              v-model="formData.comment"
            />
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only"
                  type="radio" name="delivery" value="0" checked="">
                  <span class="options__value">
                    Самовывоз <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="500">
                  <span class="options__value">
                    Курьером <b>500 у.е.</b>
                  </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="card">
                  <span class="options__value">
                    Картой при получении
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="cash">
                  <span class="options__value">
                    Наличными при получении
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <cart-block
          btn-type="submit"
          btn-text="Оформить заказ"
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
        <div
          class="cart__error form__error-block"
          v-if="queryError || formError.text"
        >
          <h4>Заявка не отправлена!</h4>
          <p v-if="queryError">
            Похоже произошла ошибка. Попробуйте отправить снова или перезагрузите страницу.
          </p>
          <p v-if="formError">
            {{ formError.text }}
          </p>
        </div>
    </form>
  </section>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex';
import BaseFormInput from '@/components/Form/BaseFormInput.vue';
import BaseFormTextarea from '@/components/Form/BaseFormTextarea.vue';
import CartBlock from '@/components/Cart/CartBlock.vue';
import OrderList from './OrderList.vue';
import OrderTotal from './OrderTotal.vue';

export default {
  name: 'TheOrder',

  components: {
    BaseFormInput,
    BaseFormTextarea,
    CartBlock,
    OrderList,
    OrderTotal,
  },

  data: () => ({
    formData: {},
  }),

  computed: {
    ...mapGetters('order', ['orderData', 'orderDataError', 'orderStatus']),
    ...mapGetters('cart', {
      cartProducts: 'cartDetailProducts',
      totalPrice: 'cartTotalPrice',
      amountsProducts: 'amountsProducts',
    }),
    formError() {
      return this.orderDataError.errorMessage ? this.orderDataError.errorMessage : {};
    },
    requestError() {
      return this.formError.request ? this.formError.request : {};
    },
    queryError() {
      return this.formError.query ? this.formError.query : null;
    },
    fieldsData() {
      return {
        name: {
          inputName: 'name',
          placeholder: 'Введите ваше полное имя',
          label: 'ФИО',
        },
        address: {
          inputName: 'address',
          placeholder: 'Введите ваш адрес',
          label: 'Адрес доставки',
        },
        phone: {
          inputType: 'tel',
          inputName: 'phone',
          placeholder: 'Введите ваш телефон',
          label: 'Телефон',
        },
        email: {
          inputType: 'email',
          inputName: 'email',
          placeholder: 'Введи ваш Email',
          label: 'Email',
        },
        comment: {
          textareaName: 'comments',
          placeholder: 'Ваши пожелания',
          label: 'Комментарий к заказу',
        },
      };
    },
  },

  watch: {
    orderStatus(newVal) {
      if (newVal) {
        this.formData = {};
        this.updateOrderStatus(null);
        this.$router.push({ name: 'orders', params: { orderId: this.orderData.id } });
      }
    },
  },

  methods: {
    ...mapActions('order', ['orderProducts']),
    ...mapMutations('order', ['updateOrderStatus']),
    submitOrderForm() {
      this.orderProducts(this.formData);
    },
  },
};
</script>
