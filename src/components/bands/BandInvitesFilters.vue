<template>
  <v-checkbox
    @change="sendFilters"
    hide-details
    v-model="pending"
    label="Только ожидающие ответа"
  />
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
