<template>
  <section class="section" v-show="!empty">
    <template v-if="!compact">
      <v-divider></v-divider>
      <h2 class="section-title">{{ title }}</h2>
    </template>
    <div class="section-content">
      <ClueCard v-if="title === 'Treasure Trails'" :editable="editable" />
      <ItemCard
        v-for="card in cards"
        :key="card.title"
        :card="card"
        :editable="editable"
        :compact="compact"
      />
    </div>
  </section>
</template>

<script>
import ItemCard from "./ItemCard.vue";
import ClueCard from "./ClueCard.vue";

export default {
  components: {
    ItemCard,
    ClueCard
  },
  props: {
    title: String,
    cards: Array,
    editable: Boolean,
    compact: Boolean
  },
  computed: {
    empty: function() {
      return this.cards.filter(c => !c.empty).length === 0;
    }
  }
};
</script>

<style scoped>
.section {
  margin-bottom: 1rem;
}
.section-title {
  margin-top: 1rem;
}
.section-content {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
}
.v-card {
  margin: 1rem;
  width: 20em;
}
.compact {
  margin: 0.1rem;
}
</style>
