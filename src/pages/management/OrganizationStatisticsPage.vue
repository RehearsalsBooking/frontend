<template>
  <v-container fluid>
    <v-row>
      <v-col cols="6" class="pb-0">
        <OrganizationRoomMultipleSelect v-model="rooms" :organization-id="id" />
      </v-col>
      <v-col cols="6" class="pb-0">
        <DateRange v-model="dateRange" />
      </v-col>
    </v-row>
    <OrganizationStatisticsTotal
      :id="id"
      :key="id + 't'"
      :rooms="rooms"
      :dateRange="dateRange"
    />
    <OrganizationStatisticsGrouped
      :id="id"
      :key="id + 'g'"
      class="mt-6"
      :rooms="rooms"
      :dateRange="dateRange"
    />
  </v-container>
</template>

<script>
import OrganizationStatisticsTotal from "@/components/organizations/OrganizationStatisticsTotal";
import OrganizationStatisticsGrouped from "@/components/organizations/OrganizationStatisticsGrouped";
import OrganizationRoomMultipleSelect from "@/components/organizations/OrganizationRoomMultipleSelect";
import DateRange from "@/components/common/DateRange";
export default {
  name: "OrganizationEditPage",
  components: {
    DateRange,
    OrganizationRoomMultipleSelect,
    OrganizationStatisticsGrouped,
    OrganizationStatisticsTotal,
  },
  props: {
    id: [String, Number],
  },
  data() {
    return {
      rooms: [],
      dateRange: {
        from: null,
        to: null,
      },
    };
  },
};
</script>
