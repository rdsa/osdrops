<template>
  <section v-show="!empty">
    <hr class="main-color" />
    <h2 class="main-color--text--darker">{{ title }}</h2>
    <v-layout justify-center>
      <v-flex xs12 md11>
        <div class="section-content">
          <ClueCard v-if="title === 'Treasure Trails'" :editable="editable" />
          <ItemCard
            v-for="card in cards"
            :key="card.title"
            :card="card"
            :editable="editable"
          />
        </div>
      </v-flex>
    </v-layout>
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
    editable: Boolean
  },
  computed: {
    empty: function() {
      return this.cards.filter(c => !c.empty).length === 0;
    }
  }
};
</script>

<style scoped>
hr {
  border-width: 0;
  height: 1px;
}
h2 {
  margin: 1rem;
}
section {
  margin: 1rem 0 1rem 0;
}
.section-content {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
}
</style>
