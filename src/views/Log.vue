<template>
  <div class="text-xs-center">
    <v-container>
      <template v-if="!editable && rsn !== ''">
        <h2 class="primary--text">{{ rsn }} Collection Log</h2>
      </template>
      <ItemSearch />
      <template v-if="compact">
        <ItemSection :cards="cards" :editable="editable" :compact="compact" />
      </template>
      <template v-else>
        <ItemSection
          v-for="(section, title) in sections"
          :title="title"
          :cards="section"
          :editable="editable"
          :key="title"
        />
      </template>
      <template v-if="editable">
        <DialogBinary
          :cardText="'Remove all items?'"
          :btnText="'Remove all items'"
          :action="'Remove'"
          :snackText="'All items removed'"
          @confirm="clearStorage"
        />
        <DialogShare />
      </template>
      <template v-else>
        <DialogBinary
          :cardText="'Replace your log with this one?'"
          :btnText="'Replace Log'"
          :action="'Replace'"
          :snackText="'Log Replaced'"
          @confirm="replace"
        />
      </template>
    </v-container>
    <BackToTop />
  </div>
</template>

<script>
import ItemSection from "@/components/ItemSection.vue";
import ItemSearch from "@/components/ItemSearch.vue";
import BackToTop from "@/components/BackToTop.vue";
import DialogBinary from "@/components/DialogBinary.vue";
import DialogShare from "@/components/DialogShare.vue";
import itemData from "@/assets/json/item-data.json";
import { mapActions } from "vuex";

export default {
  components: {
    DialogBinary,
    DialogShare,
    ItemSection,
    ItemSearch,
    BackToTop
  },
  data: () => ({
    sections: itemData,
    rsn: "",
    editable: !window.location.href.includes("/log"),
    cards: []
  }),
  methods: {
    ...mapActions(["clear", "addItem", "setSessionData", "replaceLog"]),
    clearStorage: function() {
      this.clear();
    },
    replace: function() {
      this.replaceLog();
    }
  },
  computed: {
    compact: function() {
      return this.$store.getters.isCompactTheme;
    }
  },
  created: function() {
    this.cards = [].concat.apply([], Object.values(itemData));
    if (!this.editable) {
      if (this.$route.query.items && this.$route.query.clues) {
        let tempItems = {};
        const items = this.$route.query.items.split(".");
        for (const key of items) {
          tempItems[key] = "";
        }

        const tempClues = {};
        const paramClues = this.$route.query.clues.split(".");
        const diff = ["Beginner", "Easy", "Medium", "Hard", "Elite", "Master"];
        diff.forEach((key, i) => {
          tempClues[key] = paramClues[i];
        });

        this.setSessionData({
          items: tempItems,
          clues: tempClues
        });
      }
      if (this.$route.query.rsn) {
        this.rsn = this.$route.query.rsn.endsWith("s")
          ? this.$route.query.rsn + "'"
          : this.$route.query.rsn + "'s";
      }
      window.history.pushState(
        {},
        document.title,
        window.location.href.split("?")[0]
      );
    }
  }
};
</script>

<style>
.item {
  opacity: 0.3;
}
.unlocked {
  opacity: 1;
}
</style>
