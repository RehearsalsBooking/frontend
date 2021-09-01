<template>
  <v-container>
    <v-layout align-center justify-center>
      <v-row align="start">
        <v-col cols="10" align-self="center"><h1>Мои группы</h1></v-col>
        <v-col cols="2" align-self="center">
          <v-btn color="primary" rounded :to="{ name: 'band-create' }">
            Создать группу
          </v-btn>
        </v-col>
        <v-tabs background-color="transparent" color="basil" class="mb-6">
          <v-tab :to="{ name: 'active-bands' }"> Активные группы</v-tab>
          <v-tab :to="{ name: 'inactive-bands' }"> Прошлые группы</v-tab>
        </v-tabs>
        <router-view :key="$route.fullPath" />
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
