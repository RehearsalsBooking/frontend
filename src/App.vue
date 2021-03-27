<template>
  <v-app id="inspire" v-if="$auth.ready()">
    <NavigationDrawer :drawer="drawer" />

    <AppBar v-model="drawer" />
    <v-main>
      <router-view></router-view>
      <v-snackbar-notification />
      <AuthorizableAction />
    </v-main>
  </v-app>
</template>

<script>
import NavigationDrawer from "./components/layout/NavigationDrawer";
import AppBar from "./components/layout/AppBar";

export default {
  components: { AppBar, NavigationDrawer },
  data() {
    return {
      drawer: false,
    };
  },
  created() {
    window.getApp = this;
    this.drawer = this.$vuetify.breakpoint.lgAndUp;
  },
};
</script>
