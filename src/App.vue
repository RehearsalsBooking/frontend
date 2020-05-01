<template>
  <v-app id="inspire" v-if="$auth.ready()">
    <NavigationDrawer :drawer="drawer" />

    <AppBar v-model="drawer" />
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import NavigationDrawer from "./components/layout/NavigationDrawer";
import AppBar from "./components/layout/AppBar";

export default {
  components: { AppBar, NavigationDrawer },
  data() {
    return {
      drawer: true
    };
  }
};
</script>
