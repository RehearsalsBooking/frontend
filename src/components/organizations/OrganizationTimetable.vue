<template>
  <v-container>
    <OrganizationRoomSelect
      @change="getRehearsals"
      v-model="room"
      :organization="organization"
    />
    <v-row>
      <RehearsalsTimetable
        ref="timetable"
        @calendarDatesChanged="getRehearsals"
        :rehearsals="rehearsals"
        :for-manager="false"
        v-if="room"
      />
      <v-col v-else class="text-center">
        <v-progress-circular indeterminate color="primary" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import RehearsalsTimetable from "@/components/rehearsals/RehearsalsTimetable";
import OrganizationRoomSelect from "@/components/organizations/OrganizationRoomSelect";

export default {
  name: "OrganizationTimetable",
  components: { OrganizationRoomSelect, RehearsalsTimetable },
  props: {
    organization: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      rehearsals: [],
      room: null,
      start: null,
      end: null,
    };
  },
  mounted() {
    this.getRooms();
  },
  methods: {
    getRehearsals({ start, end }) {
      if (start) {
        this.start = start;
      }
      if (end) {
        this.end = end;
      }
      this.$http
        .get("/rehearsals", {
          params: {
            organization_id: this.organization.id,
            room_id: this.room,
            from: this.start.date + " 00:00:00",
            to: this.end.date + " 23:59:59",
          },
        })
        .then((res) => (this.rehearsals = res.data.data))
        .catch((res) => {
          this.$snackbar(res.response.data);
        });
    },
    setFocus(date) {
      this.$refs.timetable.setFocus(date);
    },
  },
};
</script>
