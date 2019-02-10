<template>
  <v-card v-show="!empty">
    <div class="card-header">
      <span class="subheading main-color--text--darker">{{ card.title }}</span>
      <v-progress-circular :value="step" :rotate="270" color="main-color">
        <v-icon v-if="step === 100" color="main-color">done</v-icon>
      </v-progress-circular>
    </div>
    <div :class="card.grid">
      <Item
        v-for="item in filteredItems"
        :key="item.id"
        :item="item"
        :editable="editable"
        :cumulative="card.cumulative"
        @add="add"
        @remove="remove"
      />
    </div>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
  components: {
    Item: () => import("./Item.vue")
  },
  props: {
    card: Object,
    editable: Boolean
  },
  data() {
    return {
      items: this.card.items,
      total: this.card.items.length,
      title: this.card.title,
      unlocked: 0
    };
  },
  methods: {
    ...mapActions(["addItem", "removeItem"]),
    add: function(item) {
      if (this.card.cumulative) {
        const index = this.items.indexOf(item);
        this.items.slice(0, index).forEach(i => {
          if (!this.$store.getters.isUnlocked(i.id)) {
            this.addItem(i.id);
            this.unlocked += 1;
            i.unlocked = true;
          }
        });
      }
      this.addItem(item.id);
      this.unlocked += 1;
      item.unlocked = true;
    },
    remove: function(item) {
      if (this.card.cumulative) {
        const index = this.items.indexOf(item);
        const unlockedItemsAfterIndex = this.items
          .slice(index + 1)
          .filter(i => this.$store.getters.isUnlocked(i.id));
        if (unlockedItemsAfterIndex.length > 0) {
          unlockedItemsAfterIndex.forEach(i => {
            this.removeItem(i.id);
            this.unlocked -= 1;
            i.unlocked = false;
          });
        } else {
          this.removeItem(item.id);
          this.unlocked -= 1;
          item.unlocked = false;
        }
      } else {
        this.removeItem(item.id);
        this.unlocked -= 1;
        item.unlocked = false;
      }
    }
  },
  computed: {
    step: function() {
      return 100 * (this.unlocked / this.total);
    },
    filteredItems: function() {
      if (
        this.$store.state.search.length === 0 ||
        this.card.title
          .toLowerCase()
          .includes(this.$store.state.search.toLowerCase())
      ) {
        return this.items;
      } else {
        return this.items.filter(item =>
          item.title
            .toLowerCase()
            .includes(this.$store.state.search.toLowerCase())
        );
      }
    },
    empty: function() {
      return this.filteredItems.length === 0;
    },
    cleared: function() {
      return this.$store.getters.isCleared;
    }
  },
  watch: {
    empty: function() {
      this.card.empty = this.empty;
    },
    cleared: function() {
      if (this.editable) {
        this.unlocked = 0;
        this.items.forEach(i => {
          i.unlocked = false;
        });
      }
    }
  },
  mounted: function() {
    if (this.editable) {
      this.unlocked = this.items
        .map(item => this.$store.getters.isUnlocked(item.id))
        .filter(Boolean).length;
    } else {
      this.unlocked = this.items
        .map(item => this.$store.getters.isInTempData(item.id))
        .filter(Boolean).length;
    }
  }
};
</script>

<style scoped>
.v-card {
  margin: 1em;
  width: 20em;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1em;
}

.grid-horizontal {
  display: inline-grid;
  grid-gap: 11px;
  grid-auto-flow: row;
  grid-template-rows: repeat(auto-fit, 1fr);
}

.grid-vertical {
  display: inline-grid;
  grid-gap: 11px;
  grid-auto-flow: column;
  grid-template-columns: repeat(auto-fit, 1fr);
}

.grid-v2 {
  grid-template-rows: repeat(2, 1fr);
}

.grid-v3 {
  grid-template-rows: repeat(3, 1fr);
}

.grid-v4 {
  grid-template-rows: repeat(4, 1fr);
}

.grid-v5 {
  grid-template-rows: repeat(5, 1fr);
}

.grid-v6 {
  grid-template-rows: repeat(6, 1fr);
}

.grid-h2 {
  grid-template-columns: repeat(2, 1fr);
}

.grid-h3 {
  grid-template-columns: repeat(3, 1fr);
}

.grid-h4 {
  grid-template-columns: repeat(4, 1fr);
}

.grid-h5 {
  grid-template-columns: repeat(5, 1fr);
}

.grid-h6 {
  grid-template-columns: repeat(6, 1fr);
}
</style>
