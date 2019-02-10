<template>
  <div>
    <v-toolbar dark fixed dense class="grey darken-4" app>
      <v-toolbar-side-icon
        dark
        @click.stop="drawer = !drawer"
        class="hidden-md-and-up"
      ></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" class="main-color--text--light nav-title"
          >OS Drops</router-link
        >
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <template v-for="route in routes">
          <v-btn
            :key="route.name"
            flat
            class="text-capitalize subheading font-weight-regular"
            active-class="main-color--text--light"
            :to="route.to"
          >
            {{ route.name }}
          </v-btn>
        </template>
      </v-toolbar-items>
    </v-toolbar>
    <v-navigation-drawer
      app
      temporary
      fixed
      clipped
      dark
      class="grey darken-4"
      width="225"
      v-model="drawer"
    >
      <v-list>
        <v-list-tile
          v-for="route in routes"
          :key="route.name"
          active-class="main-color--text--light"
          :to="route.to"
        >
          <v-list-tile-action>
            <v-icon v-if="route.icon !== ''">{{ route.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>
            {{ route.name }}
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    routes: [
      { name: "Log", icon: "check_circle_outline", to: "/" },
      { name: "About", icon: "info", to: "/about" },
      { name: "Donate", icon: "favorite", to: "/donate" }
    ]
  })
};
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
