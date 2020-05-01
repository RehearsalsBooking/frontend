<template>
  <v-app-bar
    :clipped-left="$vuetify.breakpoint.lgAndUp"
    app
    color="primary"
    dark
  >
    <v-app-bar-nav-icon @click.stop="$emit('input', !value)" />
    <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
      <router-link
        class="hidden-sm-and-down white--text"
        style="text-decoration:none;"
        :to="'/'"
        >Rehearsals booking</router-link
      >
    </v-toolbar-title>
    <v-spacer />
    <v-btn icon large v-if="$auth.check()">
      <v-avatar size="32px" item>
        <v-img
          src="https://cdn.vuetifyjs.com/images/logos/logo.svg"
          alt="Vuetify"
        />
      </v-avatar>
      {{ $auth.user() }}
    </v-btn>
    <v-btn v-else text @click="loginDialog = true">Войти</v-btn>
    <Login v-model="loginDialog" />
  </v-app-bar>
</template>
<script>
import Login from "../auth/Login";

export default {
  name: "AppBar",
  components: { Login },
  props: {
    value: Boolean
  },
  data() {
    return {
      loginDialog: false
    };
  }
};
</script>
