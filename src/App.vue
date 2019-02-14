<template>
  <v-app id="app">
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
  }
};
</script>

<style>
*:not(i) {
  font-family: "Nunito", sans-serif !important;
}
.main-color {
  background: #039be5 !important;
}
.main-color--darker {
  background: #006db3 !important;
}
.main-color--light {
  background: #63ccff !important;
}
.main-color--text {
  color: #039be5 !important;
}
.main-color--text--darker {
  color: #006db3 !important;
}
.main-color--text--light {
  color: #63ccff !important;
}
.v-card {
  padding: 1rem;
  margin: 1rem;
  width: auto;
  border-radius: 8px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
* {
  box-sizing: border-box;
}
</style>
