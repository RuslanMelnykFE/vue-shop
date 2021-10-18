<template>
  <main class="content container">
    <template v-if="productError.errorCode">
      <div class="item__form">
        <h3 class="header__info">
          {{ productError.errorMessage }}
        </h3>

        <button
          class="button button--primery"
          @click.prevent="loadProduct($route.params.productId)"
        >
          Попробуйте еще раз
        </button>
      </div>
    </template>
    <template
      v-if="!productError.errorCode"
    >
      <div class="content__top">
        <ul class="breadcrumbs">
          <li class="breadcrumbs__item">
            <router-link class="breadcrumbs__link" :to="{ name: 'main' }">
              Каталог
            </router-link>
          </li>
          <li class="breadcrumbs__item">
            <router-link class="breadcrumbs__link" :to="{ name: 'main' }">
              {{ currentCategory }}
            </router-link>
          </li>
          <li class="breadcrumbs__item">
            <a class="breadcrumbs__link">
              {{ currentProduct.title }}
            </a>
          </li>
        </ul>
      </div>

      <the-product
        :product="currentProduct"
      />
    </template>
  </main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import TheProduct from '@/components/Product/TheProduct.vue';

export default {
  name: 'ViewProduct',

  components: {
    TheProduct,
  },

  computed: {
    ...mapGetters('product', ['productData', 'productError']),
    currentProduct() {
      return this.productData ? this.productData : {};
    },

    currentCategory() {
      return this.currentProduct.category ? this.currentProduct.category.title : '';
    },
  },

  watch: {
    '$route.params': {
      handler(newVal) {
        const { productId } = newVal;
        this.loadProduct(productId);
      },
      immediate: true,
    },
  },

  methods: {
    ...mapActions('product', {
      loadProduct: 'loadProductData',
    }),
  },
};
</script>
