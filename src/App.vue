<template>
  <div>
    <base-header/>
    <router-view/>
    <base-footer/>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';
import BaseHeader from '@/components/BaseHeader.vue';
import BaseFooter from '@/components/BaseFooter.vue';

export default {
  name: 'App',

  components: {
    BaseHeader,
    BaseFooter,
  },

  created() {
    const userAccessKey = localStorage.getItem('userAccessKey');

    if (userAccessKey) {
      this.updateAccesKey(userAccessKey);
    }
    this.getCartData();
  },

  methods: {
    ...mapActions('cart', ['getCartData']),
    ...mapMutations('cart', ['updateAccesKey']),
  },
};
</script>
