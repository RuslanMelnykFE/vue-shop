<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        152 товара
      </span>
    </div>

    <div class="content__catalog">
      <product-filter
        :price-from.sync="filterPriceFrom"
        :price-to.sync="filterPriceTo"
        :category-id.sync="filterCategoryId"
        :product-color.sync="filterColor"
      />

      <section class="catalog" v-show="!productsErrorMessage">
        <product-list
          :product-list="products"
        />
        <base-pagination
          v-model="page"
          :elements-per-page="productsPerPage"
          :total-elements="totalProducts"
        />
      </section>

      <h3 v-show="productsErrorMessage">
        {{ productsErrorMessage }}
      </h3>
    </div>
  </main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ProductList from '@/components/Product/ProductList.vue';
import ProductFilter from '@/components/Product/ProductFilter.vue';
import BasePagination from '@/components/Pagination/BasePagination.vue';

export default {
  name: 'ViewMain',
  components: {
    ProductList,
    ProductFilter,
    BasePagination,
  },

  data: () => ({
    page: 1,
    productsPerPage: 3,
    filterPriceTo: 0,
    filterPriceFrom: 0,
    filterCategoryId: 0,
    filterColor: 0,
    loadProductsTimer: 0,
  }),

  computed: {
    ...mapGetters('product', [
      'productsData',
      'productPagination',
      'productsError',
    ]),
    products() {
      return this.productsData.length ? this.productsData : [];
    },
    totalProducts() {
      return this.productsData.length ? this.productPagination.total : 1;
    },
    productsParams() {
      return {
        categoryId: this.filterCategoryId,
        colorId: this.filterColor,
        page: this.page,
        limit: this.productsPerPage,
        minPrice: this.filterPriceFrom,
        maxPrice: this.filterPriceTo,
      };
    },
    productsErrorMessage() {
      if (this.productsError) {
        return this.productsError.errorMessage;
      }

      return null;
    },
  },

  created() {
    this.loadProducts(this.productsParams);
  },

  watch: {
    page() {
      this.loadProducts(this.productsParams);
    },
    productsPerPage() {
      this.loadProducts(this.productsParams);
    },
    filterPriceTo() {
      this.loadProducts(this.productsParams);
    },
    filterPriceFrom() {
      this.loadProducts(this.productsParams);
    },
    filterCategoryId() {
      this.loadProducts(this.productsParams);
    },
    filterColor() {
      this.loadProducts(this.productsParams);
    },
  },

  methods: {
    ...mapActions('product', ['loadProductsData']),
    loadProducts() {
      clearTimeout(this.loadProductsTimer);

      this.loadProductsTimer = setTimeout(() => this.loadProductsData(this.productsParams), 0);
    },
  },
};
</script>
