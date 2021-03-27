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
        style="text-decoration: none"
        :to="'/'"
        >Rehearsals booking</router-link
      >
    </v-toolbar-title>
    <v-spacer />
    <template v-if="$auth.check()">
      {{ $auth.user().name }}
    </template>
    <v-btn v-else text @click="$authorize()">Войти</v-btn>
  </v-app-bar>
</template>
<script>
export default {
  name: "AppBar",
  props: {
    value: Boolean,
  },
};
</script>
