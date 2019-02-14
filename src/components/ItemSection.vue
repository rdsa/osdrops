<template>
  <section class="section" v-show="!empty">
    <hr class="main-color section-divider" />
    <h2 class="main-color--text--darker section-title">{{ title }}</h2>
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
.section {
  margin-bottom: 1rem;
}
.section-divider {
  border-width: 0;
  height: 1px;
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
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
</style>
