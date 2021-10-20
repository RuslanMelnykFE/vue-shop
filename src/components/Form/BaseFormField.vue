<template>
  <label class="form__label">
    <slot/>
    <span v-if="label" class="form__value">
      {{ label }}
    </span>
    <span v-show="error" class="form__error">
      {{ error }}
    </span>
  </label>
</template>

<script>
export default {
  name: 'BaseFormField',

  props: {
    label: {
      type: String,
      default: '',
    },
    error: {
      type: String,
      default: '',
    },
  },
};
</script>
