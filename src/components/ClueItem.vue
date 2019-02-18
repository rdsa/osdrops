<template>
  <v-flex xs6>
    <v-layout align-center justify-center>
      <v-flex xs5>
        <img
          :class="['item', { unlocked: count >= threshold }]"
          :src="getSrc()"
          :alt="title"
          :title="title"
        />
      </v-flex>
      <v-flex xs7>
        <v-text-field
          :hide-details="true"
          class="clue-input"
          color="primary"
          type="number"
          min="0"
          :label="difficulty"
          :readonly="!editable"
          v-model="count"
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
        return this.$store.getters.getClueCount({
          difficulty: this.difficulty,
          editable: this.editable
        });
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
