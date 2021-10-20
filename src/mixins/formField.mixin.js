import BaseFormField from '@/components/Form/BaseFormField.vue';

export default {
  props: {
    placeholder: {
      type: String,
      default: '',
    },
    value: {
      type: [String, Number],
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    error: {
      type: String,
      default: '',
    },
  },

  components: {
    BaseFormField,
  },
};
