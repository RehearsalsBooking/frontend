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
  mounted() {
    this.login({
      provider: this.provider,
      query: window.location.search,
    })
      .then(() => {
        this.$router.push("/");
      })
      .catch(() => {
        this.isError = true;
      });
  },
  methods: {
    ...mapActions({
      login: "auth/loginViaOauthToken",
    }),
  },
};
</script>
