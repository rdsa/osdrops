<template>
  <transition name="fade">
    <v-btn
      title="Back to Top"
      fixed
      bottom
      left
      fab
      dark
      class="primary hidden-sm-and-down"
      v-scroll="onScroll"
      v-show="show"
      :ripple="false"
      @click="$vuetify.goTo(0)"
    >
      <v-icon dark>keyboard_arrow_up</v-icon>
    </v-btn>
  </transition>
</template>

<script>
export default {
  data: () => ({
    offsetTop: 0,
    show: false
  }),
  methods: {
    onScroll() {
      this.offsetTop = window.pageYOffset || document.documentElement.scrollTop;
      this.show = this.offsetTop > 400;
    }
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
