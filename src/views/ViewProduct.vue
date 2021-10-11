<template>
  <main class="content container">
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
  </main>
</template>

<script>
import products from '@/data/products';
import categories from '@/data/categories';
import TheProduct from '@/components/Product/TheProduct.vue';

export default {
  name: 'ViewProduct',

  components: {
    TheProduct,
  },

  computed: {
    currentProduct() {
      const { productId } = this.$route.params;
      return products.find((product) => product.id === productId);
    },

    currentCategory() {
      const { categoryId } = this.currentProduct;

      return categories.find((category) => category.id === categoryId).title;
    },
  },
};
</script>
