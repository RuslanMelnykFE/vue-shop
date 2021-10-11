<template>
  <div class="form__counter">
    <button
      type="button"
      aria-label="Убрать один товар"
      @click.prevent="productDecrement"
    >
      <svg :width="widthButton" :height="heightButton" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <input
      type="text"
      name="count"
      :value="value"
      @input="$emit('input', $event.target.value)"
    />

    <button
      type="button"
      aria-label="Добавить один товар"
      @click.prevent="productIncrement"
    >
      <svg :width="widthButton" :height="heightButton" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  name: 'ProductCounter',

  props: {
    value: {
      type: Number,
      default: 1,
    },
    widthButton: {
      type: String,
      default: '10',
    },
    heightButton: {
      type: String,
      default: '10',
    },
  },

  methods: {
    productIncrement() {
      this.$emit('input', this.value + 1);
    },
    productDecrement() {
      if (this.value > 1) {
        this.$emit('input', this.value - 1);
      }
    },
  },
};
</script>
