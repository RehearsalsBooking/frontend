<template>
  <v-app id="inspire" v-if="$auth.ready()">
    <NavigationDrawer :drawer="drawer" />

    <AppBar v-model="drawer" />
    <v-content>
      <router-view></router-view>
      <v-snackbar
        :timeout="6000"
        top
        :color="snackbar.color"
        v-model="snackbar.show"
      >
        {{ snackbar.text }}
        <v-btn dark text @click.native="snackbar.show = false" icon>
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-snackbar>
    </v-content>
  </v-app>
</template>

<script>
import NavigationDrawer from "./components/layout/NavigationDrawer";
import AppBar from "./components/layout/AppBar";
import AppEvents from "./events";

export default {
  components: { AppBar, NavigationDrawer },
  data() {
    return {
      drawer: true,
      snackbar: {
        show: false,
        text: "",
        color: ""
      }
    };
  },
  created() {
    AppEvents.forEach(item => {
      this.$on(item.name, item.callback);
    });
    window.getApp = this;
  }
};
</script>
