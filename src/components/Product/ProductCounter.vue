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
      v-model.number="inputValue"
      @input="amountInput($event.target.value)"
      @blur="amountInput($event.target.value)"
      @focus="amountInput($event.target.value)"
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
      type: [Number, String],
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

  data: () => ({
    inputValue: 1,
    timerId: 0,
  }),

  created() {
    this.inputValue = this.value;
  },

  watch: {
    value(newVal) {
      this.inputValue = newVal;
    },
  },

  methods: {
    amountInput(value) {
      clearTimeout(this.timerId);

      this.timerId = setTimeout(() => {
        if (!Number(value) || value < 1) {
          this.inputValue = 1;
          this.$emit('input', 1);
          return;
        }

        this.$emit('input', this.inputValue);
      }, 500);
    },
    productIncrement() {
      this.$emit('input', this.inputValue + 1);
    },
    productDecrement() {
      if (this.inputValue > 1) {
        this.$emit('input', this.inputValue - 1);
      }
    },
  },
};
</script>
