import { mapGetters } from 'vuex';
import { formatedNumber, formatedTextProducts } from '@/services/formated.service';

const formatedProducts = {
  computed: {
    ...mapGetters('cart', {
      amountsProducts: 'amountItemsCart',
    }),
    formatedText() {
      return formatedTextProducts(this.amountsProducts);
    },
  },
};

const formatedPrice = {
  filters: {
    formatedNumber,
  },
};

export { formatedPrice, formatedProducts };
