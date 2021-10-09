<template>
  <li class="catalog__item">
    <a class="catalog__pic" href="#">
      <img :src="product.image" srcset="img/radio@2x.jpg 2x" alt="Название товара" />
    </a>

    <h3 class="catalog__title">
      <a href="#">
        {{ product.title }}
      </a>
    </h3>

    <span class="catalog__price">
      {{ product.price }} ₽
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
import InputRadioColorItem from '@/components/Form/InputRadioColorItem.vue';

export default {
  name: 'ProductItem',

  components: {
    InputRadioColorItem,
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
};
</script>
