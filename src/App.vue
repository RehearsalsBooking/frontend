<template>
  <v-app id="inspire">
    <NavigationDrawer :drawer="drawer" />

    <AppBar v-model="drawer" />
    <v-content>
      <v-container class="fill-height" fluid>
        todo
      </v-container>
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
