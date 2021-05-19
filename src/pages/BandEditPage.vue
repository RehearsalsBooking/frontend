<template>
  <v-container fluid>
    <v-tabs v-model="activeTab" background-color="transparent" color="basil">
      <v-tab v-for="tab in tabs" :key="tab.name" :to="tab.route">
        {{ tab.name }}
      </v-tab>
    </v-tabs>
    <router-view />
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
      activeTab: `bands/${this.id}/edit`,
      tabs: [
        { name: "Общая информация", route: { name: "band-edit-main-info" } },
        { name: "Состав", route: { name: "band-edit-members" } },
        { name: "Приглашения", route: { name: "band-edit-invites" } },
      ],
    };
  },
};
</script>
