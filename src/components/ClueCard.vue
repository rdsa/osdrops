<template>
  <v-card v-show="search">
    <div class="text-xs-left">
      <span class="subheading">{{ title }}</span>
    </div>
    <v-layout row wrap>
      <ClueItem
        v-for="clue in clues"
        :key="clue.difficulty"
        :clue="clue"
        :editable="editable"
      />
      <v-flex xs12>
        <v-layout align-center justify-center>
          <v-flex>
            <v-text-field
              :hide-details="true"
              class="clue-input"
              color="primary"
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
      return this.$store.getters.getTotalClueCount(this.editable);
    }
  }
};
</script>

<style>
.clue-input {
  width: 4em;
  margin: 0.75em 0;
  margin-left: auto;
  margin-right: auto;
}
</style>
