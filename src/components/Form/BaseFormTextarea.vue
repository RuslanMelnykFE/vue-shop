<template>
  <base-form-field
    :label="label"
    :error="error"
  >
    <textarea
      :name="textareaName"
      :value='value'
      class="form__input form__input--area"
      :placeholder="placeholder"
      @input.prevent="$emit('input', $event.target.value)"
    ></textarea>
  </base-form-field>
</template>

<script>
import formField from '@/mixins/formField.mixin';

export default {
  name: 'BaseFormTextarea',

  mixins: [formField],

  props: {
    textareaName: {
      type: String,
      required: true,
    },
  },
};
</script>
