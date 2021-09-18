<template>
  <v-app-bar
    :clipped-left="$vuetify.breakpoint.lgAndUp"
    app
    color="primary"
    dark
  >
    <v-app-bar-nav-icon @click.stop="$emit('input', !value)" />
    <v-toolbar-title class="ml-0 pl-4">
      <router-link
        class="hidden-sm-and-down white--text"
        style="text-decoration: none"
        :to="'/'"
        >Festic</router-link
      >
    </v-toolbar-title>
    <v-spacer />
    <template v-if="$auth.check()">
      {{ $auth.user().name }}
      <v-avatar size="36" class="ml-4">
        <ImageWithPlaceholder :src="$auth.user().avatar.thumb" />
      </v-avatar>
    </template>
    <v-btn v-else text @click="$authorize()">Войти</v-btn>
  </v-app-bar>
</template>
<script>
import ImageWithPlaceholder from "@/pages/ImageWithPlaceholder";
export default {
  name: "AppBar",
  components: { ImageWithPlaceholder },
  props: {
    value: Boolean,
  },
};
</script>
