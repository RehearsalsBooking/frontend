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
        >Festic
        <template v-if="env !== 'production'">DEMO</template>
      </router-link>
    </v-toolbar-title>
    <v-spacer />
    <template v-if="isAuthenticated !== undefined">
      <template v-if="isAuthenticated">
        {{ user.name }}
        <v-avatar size="36" class="ml-4">
          <ImageWithPlaceholder :src="user.avatar ? user.avatar.thumb : ''" />
        </v-avatar>
      </template>
      <v-btn v-else text @click="$router.push({ name: 'login' })">Войти</v-btn>
    </template>
  </v-app-bar>
</template>
<script>
import ImageWithPlaceholder from "@/pages/ImageWithPlaceholder";
import { mapGetters } from "vuex";
export default {
  name: "AppBar",
  components: { ImageWithPlaceholder },
  props: {
    value: Boolean,
  },
  computed: {
    env() {
      return process.env.VUE_APP_ENV;
    },
    ...mapGetters({
      isAuthenticated: "auth/isAuthenticated",
      user: "auth/getUser",
    }),
  },
};
</script>
