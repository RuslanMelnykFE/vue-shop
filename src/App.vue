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

      <section class="catalog">
        <product-list
          :product-list="products"
        />
        <base-pagination
          v-model="page"
          :elements-per-page="productsPerPage"
          :total-elements="totalProducts"
        />
      </section>
    </div>
  </main>
</template>

<script>
import products from './data/products';
import ProductList from './components/Product/ProductList.vue';
import ProductFilter from './components/Product/ProductFilter.vue';
import BasePagination from './components/Pagination/BasePagination.vue';

export default {
  name: 'App',
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
    filterColor: '',
  }),

  computed: {
    filteredProducts() {
      const filterPriceFrom = (product) => product.price > this.filterPriceFrom;
      const filterPriceTo = (product) => product.price < this.filterPriceTo;
      const filterCategoryId = (product) => product.categoryId === this.filterCategoryId;
      const filterColor = (product) => product.colors.includes(this.filterColor);

      let filteredProducts = products;

      if (this.filterPriceFrom > 0) {
        filteredProducts = filteredProducts.filter(filterPriceFrom);
      }

      if (this.filterPriceTo > 0) {
        filteredProducts = filteredProducts.filter(filterPriceTo);
      }

      if (this.filterCategoryId > 0) {
        filteredProducts = filteredProducts.filter(filterCategoryId);
      }

      if (this.filterColor.length) {
        filteredProducts = filteredProducts.filter(filterColor);
      }

      return filteredProducts;
    },
    products() {
      const startIndex = (this.page - 1) * this.productsPerPage;
      const endIndex = startIndex + this.productsPerPage;

      return this.filteredProducts.slice(startIndex, endIndex);
    },
    totalProducts() {
      return this.filteredProducts.length;
    },
  },

  watch: {
    filteredProducts() {
      this.page = 1;
    },
  },
};
</script>
