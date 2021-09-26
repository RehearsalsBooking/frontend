<template>
  <v-container>
    <v-layout align-center justify-center>
      <v-row align="start">
        <v-col cols="12" md="10" align-self="center">
          <h1 class="text-center">Мои группы</h1>
        </v-col>
        <v-col
          cols="12"
          md="2"
          class="justify-center d-flex"
          align-self="center"
        >
          <v-btn color="primary" block rounded :to="{ name: 'band-create' }">
            Создать группу
          </v-btn>
        </v-col>
        <v-tabs class="mb-6 mt-3">
          <v-tab :to="{ name: 'active-bands' }"> Активные </v-tab>
          <v-tab :to="{ name: 'inactive-bands' }"> Прошлые</v-tab>
        </v-tabs>
        <v-col>
          <router-view :key="$route.fullPath" />
        </v-col>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "UserBandsPage",
  data() {
    return {
      tab: 1,
    };
  },
};
</script>
