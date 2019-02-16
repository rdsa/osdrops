<template>
  <v-flex xs6>
    <v-layout align-center justify-center>
      <v-flex xs5>
        <img
          :class="['clue-icon', { unlocked: count >= threshold }]"
          :src="getSrc()"
          :alt="title"
          :title="title"
        />
      </v-flex>
      <v-flex xs7>
        <v-text-field
          class="clue-input"
          color="main-color"
          type="number"
          min="0"
          v-model="count"
          :label="difficulty"
          :readonly="!editable"
          :hide-details="true"
        />
      </v-flex>
    </v-layout>
  </v-flex>
</template>

<script>
export default {
  props: {
    clue: Object,
    editable: Boolean
  },
  data() {
    return {
      difficulty: this.clue.difficulty,
      threshold: this.clue.threshold,
      title: this.clue.title,
      src: this.clue.title.toLowerCase().replace(/ /g, "_") + ".png"
    };
  },
  methods: {
    getSrc() {
      return require(`@/assets/img/${this.src}`);
    }
  },
  computed: {
    count: {
      get() {
        return this.editable
          ? this.$store.getters.getClueCount(this.difficulty)
          : this.$store.getters.getTempClueCount(this.difficulty);
      },
      set(value) {
        this.$store.dispatch("setClues", {
          difficulty: this.difficulty,
          count: value
        });
      }
    }
  }
};
</script>

<style scoped>
.clue-icon {
  margin: 0 0.5em;
  opacity: 0.35;
}
.clue-input {
  width: 4em;
  margin: 1em 1em 1em 0;
}
.unlocked {
  opacity: 1;
}
</style>
