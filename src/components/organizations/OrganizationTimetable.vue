<template>
  <v-container>
    <v-row>
      <v-col cols="3" v-if="roomsLoaded && rooms.length > 1">
        <v-progress-circular indeterminate color="primary" />
      </v-col>
      <v-col v-else>
        <v-select
          label="Комната"
          :items="rooms"
          v-model="room"
          item-text="name"
          item-value="id"
        />
      </v-col>
    </v-row>
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
import moment from "moment";

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
      rooms: [],
      roomsLoaded: false,
      room: null,
    };
  },
  mounted() {
    this.getRooms();
  },
  watch: {
    room() {
      this.getRehearsals({
        start: { date: moment().locale("ru").startOf("week").format("Y-M-D") },
        end: { date: moment().locale("ru").endOf("week").format("Y-M-D") },
      });
    },
  },
  methods: {
    getRehearsals({ start, end }) {
      this.$http
        .get("/rehearsals", {
          params: Object.assign(
            {
              organization_id: this.organization.id,
              room_id: this.room,
            },
            start && { from: start.date + " 00:00:00" },
            end && { to: end.date + " 23:59:59" }
          ),
        })
        .then((res) => (this.rehearsals = res.data.data))
        .catch((res) => {
          this.$snackbar(res.response.data);
        });
    },
    getRooms() {
      this.$http
        .get(`/organizations/${this.organization.id}/rooms`)
        .then((res) => {
          this.rooms = res.data.data;
          this.room = this.rooms[0].id;
        })
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
