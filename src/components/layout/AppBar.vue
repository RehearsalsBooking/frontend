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
    <v-btn icon>
      <v-icon>mdi-bell</v-icon>
    </v-btn>
    <v-btn icon large>
      <v-avatar size="32px" item>
        <v-img
          src="https://cdn.vuetifyjs.com/images/logos/logo.svg"
          alt="Vuetify"
        />
      </v-avatar>
    </v-btn>
  </v-app-bar>
</template>
<script>
export default {
  name: "AppBar",
  props: {
    value: Boolean
  }
};
</script>
