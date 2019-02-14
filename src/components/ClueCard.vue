<template>
  <v-card v-show="search">
    <div class="card-header">
      <span class="main-color--text--darker subheading">{{ title }}</span>
    </div>
    <v-layout row wrap>
      <ClueItem
        v-for="clue in clues"
        :key="clue.difficulty"
        :clue="clue"
        :editable="editable"
      />
      <v-flex xs6>
        <v-layout align-center justify-center>
          <v-flex xs7 offset-xs5>
            <v-text-field
              class="clue-input"
              color="main-color"
              label="Total"
              v-model="total"
              readonly
            />
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import clueData from "@/assets/json/clue-data.json";
import ClueItem from "@/components/ClueItem.vue";

export default {
  components: {
    ClueItem
  },
  props: {
    editable: Boolean
  },
  data: () => ({
    title: "Clue Count",
    clues: clueData
  }),
  computed: {
    search: function() {
      return this.$store.state.search.length === 0;
    },
    total: function() {
      return this.editable
        ? this.$store.getters.getTotalClueCount
        : this.$store.getters.getTempTotalClueCount;
    }
  }
};
</script>

<style scoped>
.clue-input {
  width: 4em;
  margin: 1em 1em 1em 0;
}
</style>
