<template>
  <div class="cart__block">
    <slot/>

    <button
      v-show="isShowBtn"
      class="cart__button button button--primery"
      :type="btnType"
    >
      {{ btnText }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'CartBlock',

  props: {
    btnType: {
      type: String,
      required: true,
    },
    btnText: {
      type: String,
      default: '',
    },
    isShowBtn: {
      type: Boolean,
      default: true,
    },
  },
};
</script>
