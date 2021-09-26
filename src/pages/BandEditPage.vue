<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <h1 class="text-center">Редактирование группы</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-tabs show-arrows center-active>
          <v-tab v-for="tab in tabs" :key="tab.name" :to="tab.route">
            {{ tab.name }}
          </v-tab>
        </v-tabs>
      </v-col>
    </v-row>
    <v-row>
      <router-view />
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "BandEditPage",
  props: {
    id: [String, Number],
  },
  data() {
    return {
      tabs: [
        { name: "Основное", route: { name: "band-edit-main-info" } },
        { name: "Состав", route: { name: "band-edit-members" } },
        { name: "Приглашения", route: { name: "band-edit-invites" } },
      ],
    };
  },
};
</script>
