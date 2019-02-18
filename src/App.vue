<template>
  <v-app id="app" :dark="dark">
    <AppNavbar />
    <v-content>
      <transition name="router-fade" enter-active-class="animated fadeIn">
        <router-view :key="$route.path" />
      </transition>
    </v-content>
    <AppFooter />
  </v-app>
</template>

<script>
import AppNavbar from "@/components/AppNavbar.vue";
import AppFooter from "@/components/AppFooter.vue";

export default {
  name: "app",
  components: {
    AppNavbar,
    AppFooter
  },
  computed: {
    dark: function() {
      return this.$store.getters.isDarkTheme;
    }
  }
};
</script>

<style>
*:not(i) {
  font-family: Nunito, sans-serif !important;
}
.v-card {
  padding: 1rem;
  margin: 1rem;
  border-radius: 8px;
}
.card-header {
  margin-bottom: 1rem;
}
</style>
