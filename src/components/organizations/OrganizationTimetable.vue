<template>
  <v-row>
    <RehearsalsTimetable
      @calendarDatesChanged="getRehearsals"
      :rehearsals="rehearsals"
    />
  </v-row>
</template>

<script>
import RehearsalsTimetable from "@/components/rehearsals/RehearsalsTimetable";

export default {
  name: "OrganizationTimetable",
  components: { RehearsalsTimetable },
  props: {
    organization: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      rehearsals: [],
    };
  },
  methods: {
    getRehearsals({ start, end }) {
      this.$http
        .get("/rehearsals", {
          params: Object.assign(
            { organization_id: this.organization.id },
            start && { from: start.date + " 00:00:00" },
            end && { to: end.date + " 23:59:59" }
          ),
        })
        .then((res) => (this.rehearsals = res.data.data))
        .catch((res) => {
          this.$snackbar(res.response.data);
        });
    },
  },
};
</script>
