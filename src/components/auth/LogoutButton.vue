<template>
  <v-btn block color="primary" @click="logout"> Выйти</v-btn>
</template>
<script>
export default {
  name: "LogoutButton",
  methods: {
    logout() {
      this.$auth
        .logout({
          redirect: "/",
        })
        .then(() => {
          this.$snackbar("Вы успешно вышли из системы");
          window.getApp.$emit("successfulLogout");
        });
    },
  },
};
</script>
