<template>
  <v-layout justify-center>
    <v-flex xs12 sm8 lg6>
      <v-text-field
        solo
        clearable
        v-model="search"
        hide-details
        append-icon="search"
        color="main-color"
        label="Search Items"
        class="search-margin"
      />
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    timeout: null
  }),
  computed: {
    search: {
      get() {
        return this.$store.state.search;
      },
      set(value) {
        clearTimeout(this.timeout);
        value = value === null ? "" : value;
        let time = value.length === 0 ? 50 : 500;
        this.timeout = setTimeout(() => {
          this.$store.dispatch("setSearch", value);
        }, time);
      }
    }
  }
};
</script>

<style scoped>
.search-margin {
  margin: 1rem 0 2.5rem 0;
}
</style>
