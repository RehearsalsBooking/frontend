<template>
  <v-card class="pa-2">
    <v-card-title class="text-center">
      <div class="text-center mx-auto">Фильтры</div>
    </v-card-title>
    <v-card-text>
      <v-checkbox
        @change="sendFilters"
        v-model="pending"
        label="Только ожидающие ответа"
      />
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: "BandSentInvitesFilters",
  data() {
    return {
      pending: false,
    };
  },
  mounted() {
    this.sendFilters();
  },
  methods: {
    sendFilters() {
      let filters = Object.assign(
        {},
        this.pending && { pending: this.pending }
      );
      this.$emit("filtersChanged", filters);
    },
    resetFilters() {
      this.pending = false;
      this.sendFilters();
    },
  },
};
</script>
