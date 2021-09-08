<template>
  <v-container fluid>
    <OrganizationStatisticsTotal :id="id" :key="id + 't'" />
    <OrganizationStatisticsGrouped :id="id" :key="id + 'g'" class="mt-6" />
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
