<template>
  <v-container fluid>
    <v-row class="justify-space-around">
      <v-col cols="12">
        <OrganizationStatisticsTotal :id="id" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import OrganizationStatisticsTotal from "@/components/organizations/OrganizationStatisticsTotal";
export default {
  name: "OrganizationEditPage",
  components: { OrganizationStatisticsTotal },
  props: {
    id: [String, Number],
  },
  data() {
    return {
      statisticsGrouped: [],
    };
  },
  mounted() {
    this.getStatistics();
  },
  methods: {
    getStatistics() {
      this.$http
        .get(`/management/organizations/${this.id}/statistics/grouped`, {
          params: {
            interval: "day",
          },
        })
        .then((res) => {
          this.statisticsTotal = res.data.data;
        });
    },
  },
};
</script>
