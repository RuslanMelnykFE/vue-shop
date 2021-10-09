<template>
  <ul class="catalog__pagination pagination">
    <li class="pagination__item">
      <a
        href="#"
        class="pagination__link pagination__link--arrow"
        :class="{'pagination__link--disabled': currentPage === 1}"
        aria-label="Предыдущая страница"
        @click.prevent="prevPage"
      >
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-left"></use>
        </svg>
      </a>
    </li>
    <li
      v-for="pageNumber in totalPages"
      :key="`page-number-${pageNumber}`"
      class="pagination__item"
    >
      <a
        href="#"
        class="pagination__link"
        :class="{'pagination__link--current': pageNumber === currentPage}"
        @click.prevent="pageSelect(pageNumber)"
      >
        {{ pageNumber }}
      </a>
    </li>
    <li class="pagination__item">
      <a
        href="#"
        class="pagination__link pagination__link--arrow"
        :class="{'pagination__link--disabled': currentPage === totalPages}"
        aria-label="Следующая страница"
        @click.prevent="nextPage"
      >
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-right"></use>
        </svg>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'BasePagination',

  model: {
    prop: 'currentPage',
    event: 'pageSelect',
  },

  props: {
    currentPage: {
      type: Number,
      default: 1,
    },
    elementsPerPage: {
      type: Number,
      default: 1,
    },
    totalElements: {
      type: Number,
      default: 1,
    },
  },

  computed: {
    totalPages() {
      return Math.ceil(this.totalElements / this.elementsPerPage);
    },
  },

  methods: {
    pageSelect(pageNumber) {
      this.$emit('pageSelect', pageNumber);
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.$emit('pageSelect', this.currentPage + 1);
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.$emit('pageSelect', this.currentPage - 1);
      }
    },
  },
};
</script>
