<template>
  <div>
    <v-dialog v-model="dialog" max-width="300px">
      <v-btn color="primary" dark :ripple="false" slot="activator">{{
        btnText
      }}</v-btn>
      <v-card>
        <v-card-title class="subheading text-xs-center">{{
          cardText
        }}</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click.stop="cancel">Cancel</v-btn>
          <v-btn color="primary" dark @click="confirm">{{ action }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar color="primary" :timeout="2500" v-model="snackbar">
      {{ snackText }}
      <v-btn dark flat @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  props: {
    cardText: String,
    btnText: String,
    action: String,
    snackText: String
  },
  data: () => ({
    dialog: false,
    snackbar: false
  }),
  methods: {
    confirm: function() {
      this.dialog = false;
      this.snackbar = true;
      this.$emit("confirm");
    },
    cancel: function() {
      this.dialog = false;
    }
  }
};
</script>

<style scoped>
.v-card {
  margin: 0;
}
</style>
