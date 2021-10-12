<template>
  <aside class="filter">
    <h2 class="filter__title">Фильтры</h2>

    <form class="filter__form form" action="#" method="get" @submit.prevent="submitForm">
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label class="form__label form__label--price">
          <input class="form__input" type="text" name="min-price" v-model.number="priceFromValue" />
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price">
          <input class="form__input" type="text" name="max-price" v-model.number="priceToValue" />
          <span class="form__value">До</span>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Категория</legend>
        <label class="form__label form__label--select">
          <select class="form__select" type="text" name="category" v-model.number="categoryIdValue">
            <option value="0">Все категории</option>

            <option
              v-for="category in categories"
              :key="`category-id-${category.id}`"
              :value="category.id"
            >
              {{ category.title }}
            </option>
          </select>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Цвет</legend>
        <ul class="colors">
          <input-radio-color-item
            v-for="color in colors"
            :key="`color-filter-${color.id}`"
            :color="color"
            input-name="color"
            v-model.number="colorValue"
          />
        </ul>
      </fieldset>

      <fieldset class="form__block">
              <legend class="form__legend">Объемб в ГБ</legend>
              <ul class="check-list">
                <li class="check-list__item">
                  <label class="check-list__label">
                    <input
                      class="check-list__check sr-only"
                      type="checkbox"
                      name="volume"
                      value="8"
                      checked=""
                    />
                    <span class="check-list__desc">
                      8
                      <span>(313)</span>
                    </span>
                  </label>
                </li>
                <li class="check-list__item">
                  <label class="check-list__label">
                    <input
                      class="check-list__check sr-only"
                      type="checkbox"
                      name="volume"
                      value="16"
                    />
                    <span class="check-list__desc">
                      16
                      <span>(461)</span>
                    </span>
                  </label>
                </li>
                <li class="check-list__item">
                  <label class="check-list__label">
                    <input
                      class="check-list__check sr-only"
                      type="checkbox"
                      name="volume"
                      value="32"
                    />
                    <span class="check-list__desc">
                      32
                      <span>(313)</span>
                    </span>
                  </label>
                </li>
                <li class="check-list__item">
                  <label class="check-list__label">
                    <input
                      class="check-list__check sr-only"
                      type="checkbox"
                      name="volume"
                      value="64"
                    />
                    <span class="check-list__desc">
                      64
                      <span>(313)</span>
                    </span>
                  </label>
                </li>
                <li class="check-list__item">
                  <label class="check-list__label">
                    <input
                      class="check-list__check sr-only"
                      type="checkbox"
                      name="volume"
                      value="128"
                    />
                    <span class="check-list__desc">
                      128
                      <span>(313)</span>
                    </span>
                  </label>
                </li>
                <li class="check-list__item">
                  <label class="check-list__label">
                    <input
                      class="check-list__check sr-only"
                      type="checkbox"
                      name="volume"
                      value="264"
                    />
                    <span class="check-list__desc">
                      264
                      <span>(313)</span>
                    </span>
                  </label>
                </li>
              </ul>
      </fieldset>

      <button class="filter__submit button button--primery" type="submit">
        Применить
      </button>
      <button
        class="filter__reset button button--second"
        type="button"
        @click.prevent="resetForm"
      >
        Сбросить
      </button>
    </form>
  </aside>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import InputRadioColorItem from '@/components/Form/InputRadioColorItem.vue';

export default {
  name: 'ProductFilter',

  components: {
    InputRadioColorItem,
  },

  props: {
    priceFrom: {
      type: Number,
      default: 0,
      require: true,
    },
    priceTo: {
      type: Number,
      default: 0,
      require: true,
    },
    categoryId: {
      type: Number,
      default: 0,
      require: true,
    },
    productColor: {
      type: [String, Number],
      default: 0,
      require: true,
    },
  },

  data: () => ({
    priceFromValue: 0,
    priceToValue: 0,
    categoryIdValue: 0,
    colorValue: 0,
  }),

  computed: {
    ...mapGetters('product', ['productCategories']),
    ...mapGetters('colors', ['colorsData']),
    categories() {
      return this.productCategories.length ? this.productCategories : [];
    },
    colors() {
      return this.colorsData.length ? this.colorsData : [];
    },
  },

  created() {
    this.loadProductCategories();
    this.loadColorsData();
  },

  watch: {
    priceFrom(newVal) {
      this.priceFromValue = newVal;
    },
    priceTo(newVal) {
      this.priceToValue = newVal;
    },
    categoryId(newVal) {
      this.categoryIdValue = newVal;
    },
    productColor(newVal) {
      this.colorValue = newVal;
    },
  },

  methods: {
    ...mapActions('product', ['loadProductCategories']),
    ...mapActions('colors', ['loadColorsData']),
    submitForm() {
      this.$emit('update:priceFrom', this.priceFromValue);
      this.$emit('update:priceTo', this.priceToValue);
      this.$emit('update:categoryId', this.categoryIdValue);
      this.$emit('update:productColor', this.colorValue);
    },
    resetForm() {
      this.$emit('update:priceFrom', 0);
      this.$emit('update:priceTo', 0);
      this.$emit('update:categoryId', 0);
      this.$emit('update:productColor', 0);
    },
  },
};
</script>
