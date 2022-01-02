<template>
  <v-container fluid>
    <template v-if="!isError">
      Подождите, сейчас мы вас авторизуем...
    </template>
    <template v-else>Что-то пошло не так. Попробуйте еще раз</template>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "AuthRedirectPage",
  props: {
    provider: String,
  },
  data() {
    return {
      isError: false,
    };
  },
  async mounted() {
    try {
      await this.login({
        provider: this.provider,
        query: window.location.search,
      });
      await this.$router.push("/");
    } catch (e) {
      this.isError = true;
    }
  },
  methods: {
    ...mapActions({
      login: "auth/loginViaOauthToken",
    }),
  },
};
</script>
