<template>
  <div class="text-xs-center">
    <v-container>
      <template v-if="!editable && rsn !== ''">
        <h2 class="main-color--text--darker">{{ rsn }} Collection Log</h2>
      </template>
      <ItemSearch />
      <ItemSection
        v-for="(section, title) in sections"
        :title="title"
        :cards="section"
        :editable="editable"
        :key="title"
      />
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
    editable: !window.location.href.includes("/log")
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
  created: function() {
    if (!this.editable) {
      if (this.$route.query.items && this.$route.query.clues) {
        let tempItems = {};
        const items = this.$route.query.items.split(".");
        for (const key of items) {
          tempItems[key] = "";
        }

        const tempClues = {};
        const paramClues = this.$route.query.clues.split(".");
        const diff = ["Easy", "Medium", "Hard", "Elite", "Master"];
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
