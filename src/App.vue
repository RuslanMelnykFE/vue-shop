<template>
  <div>
    <base-header/>
    <router-view/>
    <base-footer/>
    <base-preloader/>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';
import BaseHeader from '@/components/BaseHeader.vue';
import BaseFooter from '@/components/BaseFooter.vue';
import BasePreloader from '@/components/BasePreloader.vue';

export default {
  name: 'App',

  components: {
    BaseHeader,
    BaseFooter,
    BasePreloader,
  },

  created() {
    const userAccessKey = localStorage.getItem('userAccessKey');

    if (userAccessKey) {
      this.updateAccesKey(userAccessKey);
    }
    this.loadCartData();
  },

  methods: {
    ...mapActions('cart', ['loadCartData']),
    ...mapMutations('cart', ['updateAccesKey']),
  },
};
</script>
