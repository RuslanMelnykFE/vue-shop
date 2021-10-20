<template>
  <base-form-field
    :label="label"
    :error="error"
  >
    <input
      :type="inputType"
      :name="inputName"
      :value='value'
      class="form__input"
      :placeholder="placeholder"
      @input.prevent="$emit('input', $event.target.value)"
    >
  </base-form-field>
</template>

<script>
import formField from '@/mixins/formField.mixin';

export default {
  name: 'BaseFormInput',

  mixins: [formField],

  props: {
    inputType: {
      type: String,
      default: 'text',
    },
    inputName: {
      type: String,
      required: true,
    },
  },
};
</script>
