<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="#" @click.prevent="gotoPage('main')">
            Каталог
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="#" @click.prevent="gotoPage('main')">
            {{ currentCategory }}
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            {{ currentProduct.title }}
          </a>
        </li>
      </ul>
    </div>

    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img
            width="570"
            height="570"
            :src="currentProduct.image"
            :alt="currentProduct.title"
          />
        </div>

          <ul class="pics__list">
            <li class="pics__item">
              <a href="" class="pics__link pics__link--current">
                <img
                  width="98"
                  height="98"
                  src="img/phone-square-1.jpg"
                  srcset="img/phone-square-1@2x.jpg 2x"
                  alt="Название товара"
                />
              </a>
            </li>
            <li class="pics__item">
              <a href="" class="pics__link">
                <img
                  width="98"
                  height="98"
                  src="img/phone-square-2.jpg"
                  srcset="img/phone-square-2@2x.jpg 2x"
                  alt="Название товара"
                />
              </a>
            </li>
            <li class="pics__item">
              <a href="" class="pics__link">
                <img
                  width="98"
                  height="98"
                  src="img/phone-square-3.jpg"
                  srcset="img/phone-square-3@2x.jpg 2x"
                  alt="Название товара"
                />
              </a>
            </li>
            <li class="pics__item">
              <a class="pics__link" href="#">
                <img
                  width="98"
                  height="98"
                  src="img/phone-square-4.jpg"
                  srcset="img/phone-square-4@2x.jpg 2x"
                  alt="Название товара"
                />
              </a>
            </li>
          </ul>

      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{ currentProduct.id }}</span>
        <h2 class="item__title">
          {{ currentProduct.title }}
        </h2>

        <div class="item__form">
          <form class="form" action="#" method="POST">
            <b class="item__price">
              {{ currentProduct.price | formatedNumber }} ₽
            </b>

            <fieldset class="form__block">
              <legend class="form__legend">Цвет:</legend>
              <ul class="colors">
                <input-radio-color-item
                  v-for="color in currentProduct.colors"
                  :key="`item-${currentProduct.id}-${color}`"
                  :color="color"
                  input-name="color-item"
                  v-model="productColor"
                />
              </ul>
            </fieldset>

              <fieldset class="form__block">
                <legend class="form__legend">Объемб в ГБ:</legend>

                <ul class="sizes sizes--primery">
                  <li class="sizes__item">
                    <label class="sizes__label">
                      <input
                        class="sizes__radio sr-only"
                        type="radio"
                        name="sizes-item"
                        value="32"
                      />
                      <span class="sizes__value">
                        32gb
                      </span>
                    </label>
                  </li>
                  <li class="sizes__item">
                    <label class="sizes__label">
                      <input
                        class="sizes__radio sr-only"
                        type="radio"
                        name="sizes-item"
                        value="64"
                      />
                      <span class="sizes__value">
                        64gb
                      </span>
                    </label>
                  </li>
                  <li class="sizes__item">
                    <label class="sizes__label">
                      <input
                        class="sizes__radio sr-only"
                        type="radio"
                        name="sizes-item"
                        value="128"
                        checked=""
                      />
                      <span class="sizes__value">
                        128gb
                      </span>
                    </label>
                  </li>
                </ul>
              </fieldset>

              <div class="item__row">
                <div class="form__counter">
                  <button type="button" aria-label="Убрать один товар">
                    <svg width="12" height="12" fill="currentColor">
                      <use xlink:href="#icon-minus"></use>
                    </svg>
                  </button>

                  <input type="text" value="1" name="count" />

                  <button type="button" aria-label="Добавить один товар">
                    <svg width="12" height="12" fill="currentColor">
                      <use xlink:href="#icon-plus"></use>
                    </svg>
                  </button>
                </div>

                <button class="button button--primery" type="submit">
                  В корзину
                </button>
              </div>
            </form>
          </div>
        </div>

        <div class="item__desc">
          <ul class="tabs">
            <li class="tabs__item">
              <a class="tabs__link">
                Описание
              </a>
            </li>
            <li class="tabs__item">
              <a class="tabs__link tabs__link--current" href="#">
                Характеристики
              </a>
            </li>
            <li class="tabs__item">
              <a class="tabs__link" href="#">
                Гарантия
              </a>
            </li>
            <li class="tabs__item">
              <a class="tabs__link" href="#">
                Оплата и доставка
              </a>
            </li>
          </ul>

          <div class="item__content">
            <h3>Беспроводная связь</h3>
            <p>Wi-Fi, Bluetooth 4.0, ANT+</p>

            <h3>Поддерживаемые спутники</h3>
            <p>GPS, ГЛОНАСС, BEIDOU Galileo и QZSS</p>

            <h3>Аккумулятор</h3>
            <p>перезаряжаемый USB</p>

            <h3>Время автономной работы</h3>
            <p>до 15 часов</p>

            <h3>Тип аккумулятора</h3>
            <p>литий-ионный</p>

            <h3>Водонепроницаемость</h3>
            <p>IPX7</p>

            <h3>Фирменное приложение</h3>
            <p>ELEMNT от Wahoo Fitness</p>

            <h3>Совместимость</h3>
            <p>iOS 9.0 и последующие, Android 4.3 и старше</p>
          </div>
        </div>
    </section>
  </main>
</template>

<script>
import formatedNumber from '@/services/formatedNumber.service';
import gotoPage from '@/services/gotoPage.service';
import products from '@/data/products';
import categories from '@/data/categories';
import InputRadioColorItem from '@/components/Form/InputRadioColorItem.vue';

export default {
  name: 'ViewProduct',

  components: {
    InputRadioColorItem,
  },

  filters: {
    formatedNumber,
  },

  props: {
    viewParams: {
      type: Object,
      default() {
        return {};
      },
    },
  },

  data: () => ({
    productColor: '',
  }),

  computed: {
    currentProduct() {
      return products.find((product) => product.id === this.viewParams.id);
    },

    currentCategory() {
      const { categoryId } = this.currentProduct;

      return categories.find((category) => category.id === categoryId).title;
    },
  },

  methods: {
    gotoPage,
  },
};
</script>
