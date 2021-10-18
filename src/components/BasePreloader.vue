<template>
  <div
    class="preloader"
    :class="{'preloader_active': isShowPreloader}"
  >
    <svg
      version="1.1" id="L2"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
      viewBox="0 0 100 100" enable-background="new 0 0 100 100"
      xml:space="preserve"
      class="preloader__icon"
    >
      <circle
        fill="none" stroke="#272727"
        stroke-width="4" stroke-miterlimit="10" cx="50" cy="50" r="48"/>
      <line
        fill="none"
        stroke-linecap="round"
        stroke="#272727" stroke-width="4" stroke-miterlimit="10" x1="50" y1="50" x2="85" y2="50.5">
        <animateTransform
            attributeName="transform"
            dur="2s"
            type="rotate"
            from="0 50 50"
            to="360 50 50"
            repeatCount="indefinite" />
      </line>
      <line
        fill="none"
        stroke-linecap="round"
        stroke="#272727" stroke-width="4" stroke-miterlimit="10" x1="50" y1="50" x2="49.5" y2="74">
        <animateTransform
            attributeName="transform"
            dur="15s"
            type="rotate"
            from="0 50 50"
            to="360 50 50"
            repeatCount="indefinite" />
      </line>
    </svg>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'BasePreloader',

  computed: {
    ...mapGetters('preloader', ['isShowPreloader']),
  },
};
</script>

<style>
.preloader {
  position: fixed;
  top: 0;
  left: 0;
  display: none;
  justify-content: center;
  align-items: center;
  min-width: 100vw;
  width: 100%;
  min-height: 100vh;
  height: 100%;
  background-color: #fff;
  opacity: .9;
}

.preloader_active {
  display: flex;
}
.preloader__icon {
  flex: 0 0 100px;
  max-width: 100px;
  height: 100px;
}
</style>
