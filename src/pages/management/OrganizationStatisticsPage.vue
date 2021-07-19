<template>
  <v-container fluid>
    <OrganizationStatisticsTotal :id="id" />
    <OrganizationStatisticsGrouped :id="id" class="mt-6" />
  </v-container>
</template>

<script>
import OrganizationStatisticsTotal from "@/components/organizations/OrganizationStatisticsTotal";
import OrganizationStatisticsGrouped from "@/components/organizations/OrganizationStatisticsGrouped";
export default {
  name: "OrganizationEditPage",
  components: { OrganizationStatisticsGrouped, OrganizationStatisticsTotal },
  props: {
    id: [String, Number],
  },
};
</script>
