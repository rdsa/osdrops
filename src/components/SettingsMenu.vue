<template>
  <v-menu left :close-on-content-click="false" offset-y>
    <v-btn slot="activator" icon>
      <v-icon>settings</v-icon>
    </v-btn>
    <v-list class="menu-list">
      <v-list-tile>
        <v-switch
          v-model="dark"
          label="Dark Theme"
          color="primary"
          :hide-details="true"
        ></v-switch>
      </v-list-tile>
      <v-list-tile>
        <v-switch
          v-model="compact"
          label="Compact Theme"
          color="primary"
          :hide-details="true"
        ></v-switch>
      </v-list-tile>
      <v-list-tile>
        <v-switch
          v-model="onlyUnlocked"
          label="Hide unlocked items"
          color="primary"
          :hide-details="true"
        ></v-switch>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  computed: {
    compact: {
      get() {
        return this.$store.getters.isCompactTheme;
      },
      set() {
        this.$store.dispatch("toggleCompactTheme");
      }
    },
    dark: {
      get() {
        return this.$store.getters.isDarkTheme;
      },
      set() {
        this.$store.dispatch("toggleDarkTheme");
      }
    },
    onlyUnlocked: {
      get() {
        return this.$store.getters.hideUnlocked;
      },
      set() {
        this.$store.dispatch("toggleUnlocked");
      }
    }
  }
};
</script>

<style scoped>
.menu-list {
  padding: 0 0 1.25em 0;
}
</style>
