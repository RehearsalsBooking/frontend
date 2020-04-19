<template>
  <v-container>
    <v-layout align-center justify-center>
      <v-row class="text-center">
        <v-col cols="12">
          <h1>404</h1>
          <h2 class="my-3 headline ">Страница не найдена</h2>
          <div>
            <v-btn color="primary" @click="goHome">На главную</v-btn>
          </div>
        </v-col>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  methods: {
    goHome() {
      this.$router.push({ path: "/" });
    }
  }
};
</script>
<style scoped></style>
