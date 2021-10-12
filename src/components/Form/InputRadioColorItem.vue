<template>
  <li class="colors__item">
    <label class="colors__label">
      <input
        class="colors__radio sr-only"
        type="radio"
        name="color"
        :value="color.id"
        :checked="value === color.id"
        @input="$emit('input', $event.target.value)"
      />
      <span
        class="colors__value"
        :style="{'background-color': color.code}">
      </span>
    </label>
  </li>
</template>

<script>
export default {
  name: 'InputRadioColorItem',

  props: {
    value: {
      type: [String, Number],
      required: true,
    },
    inputName: {
      type: String,
      required: true,
    },
    color: {
      type: Object,
      required: true,
    },
  },
};
</script>
