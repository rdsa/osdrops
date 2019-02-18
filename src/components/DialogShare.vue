<template>
  <div class="no-height">
    <v-dialog v-model="dialog" max-width="600px">
      <v-btn
        title="Share"
        slot="activator"
        color="primary"
        :ripple="false"
        @click="genURL"
        dark
        fixed
        bottom
        right
        fab
        ><v-icon>share</v-icon></v-btn
      >
      <v-card>
        <v-card-title class="subheading text-xs-center"
          >Use the following url to share your log</v-card-title
        >
        <v-card-text>
          <v-text-field
            label="RSN (optional)"
            v-model="rsn"
            maxlength="12"
            :append-outer-icon="'send'"
            @click:append-outer="add"
            @keyup.enter="add"
          ></v-text-field>
          <textarea
            v-model="url"
            class="url-textarea"
            ref="url"
            readonly
          ></textarea>
        </v-card-text>
        <v-card-actions>
          <v-btn flat @click.stop="dialog = false">Close</v-btn>
          <v-spacer></v-spacer>
          <v-icon color="primary" @click="copy" title="Copy to clipboard"
            >file_copy</v-icon
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar color="primary" :timeout="2500" v-model="snackbar">
      {{ message }}
      <v-btn dark flat @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data: () => ({
    dialog: false,
    snackbar: false,
    message: "",
    urlParams: new URLSearchParams(window.location.search),
    baseUrl: window.location.href + "log?",
    url: "",
    rsn: ""
  }),
  methods: {
    ...mapActions(["addRSN"]),
    genURL: function() {
      const items = Object.keys(this.$store.getters.getItems);
      const clues = Object.values(this.$store.getters.getClues);

      this.urlParams.set("items", items.join("."));
      this.urlParams.set("clues", clues.join("."));
      if (this.$store.getters.getRSN !== "") {
        this.urlParams.set("rsn", this.$store.getters.getRSN);
      } else {
        this.urlParams.delete("rsn");
      }
      this.url = this.baseUrl + this.urlParams;
    },
    copy: function() {
      this.$refs.url.select();
      document.execCommand("copy");

      this.message = "Copied to clipboard";
      this.snackbar = true;
    },
    add: function() {
      this.rsn = this.rsn.replace(/[^0-9a-zA-Z_-\s]/g, "");
      this.addRSN(this.rsn);
      if (this.rsn !== "") {
        this.urlParams.set("rsn", this.rsn);
      } else {
        this.urlParams.delete("rsn");
      }
      this.url = this.baseUrl + this.urlParams;
      this.message = "RSN added";
      this.snackbar = true;
    }
  },
  computed: {
    cleared: function() {
      return this.$store.getters.isCleared;
    }
  },
  watch: {
    cleared: function() {
      this.rsn = "";
    }
  },
  created: function() {
    this.rsn = this.$store.getters.getRSN;
  }
};
</script>

<style scoped>
.url-textarea {
  resize: none;
  width: 100%;
  padding: 0.5em;
  min-height: 10em;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
}
.v-card {
  margin: 0;
}
.no-height {
  height: 0;
}
</style>
