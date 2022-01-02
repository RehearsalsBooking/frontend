<template>
  <v-btn block color="primary" @click="onLogout"> Выйти</v-btn>
</template>
<script>
import { mapActions } from "vuex";

export default {
  name: "LogoutButton",
  methods: {
    ...mapActions({
      logout: "auth/logout",
    }),
    onLogout() {
      this.logout().then(() => {
        this.$snackbar("Вы успешно вышли из системы");
        this.$router.push("/");
      });
    },
  },
};
</script>
