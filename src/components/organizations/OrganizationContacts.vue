<template>
  <v-row class="mt-3">
    <v-col cols="12" md="3">
      <OrganizationContactInfo :organization="organization" />
    </v-col>
    <v-col cols="12" md="9" style="min-height: 320px">
      <OrganizationMap :organization="organization" />
    </v-col>
  </v-row>
</template>
<script>
import OrganizationMap from "./OrganizationMap";
import OrganizationContactInfo from "./OrganizationContactInfo";

export default {
  name: "OrganizationContacts",
  components: { OrganizationContactInfo, OrganizationMap },
  props: {
    organization: Object,
  },
};
</script>
