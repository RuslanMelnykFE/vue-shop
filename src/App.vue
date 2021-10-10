<template>
  <component
    :is='viewComponent'
    :view-params="currentViewParams"
  />
</template>

<script>
import eventBus from '@/services/eventBus.service';
import ViewMain from '@/views/ViewMain.vue';
import ViewProduct from '@/views/ViewProduct.vue';
import ViewNotFoundPage from '@/views/ViewNotFoundPage.vue';

const routes = {
  main: 'ViewMain',
  product: 'ViewProduct',
};

export default {
  name: 'App',

  components: {
    ViewMain,
    ViewProduct,
    ViewNotFoundPage,
  },

  data: () => ({
    currentView: 'main',
    currentViewParams: {},
  }),

  computed: {
    viewComponent() {
      return routes[this.currentView] || 'ViewNotFoundPage';
    },
  },

  created() {
    eventBus.$on('gotoPage', (viewName, viewParams) => this.gotoPage(viewName, viewParams));
  },

  methods: {
    gotoPage(viewName, viewParams) {
      this.currentView = viewName;
      this.currentViewParams = viewParams || {};
    },
  },
};
</script>
