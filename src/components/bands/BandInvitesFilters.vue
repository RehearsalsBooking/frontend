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
import constants from "@/constants";

export default {
  name: "BandInvitesFilters",
  data() {
    return {
      pending: true,
    };
  },
  methods: {
    sendFilters() {
      let filters = Object.assign(
        {},
        this.pending && { status: [constants.INVITE_STATUS_PENDING] }
      );
      this.$emit("filtersChanged", filters);
    },
  },
};
</script>
