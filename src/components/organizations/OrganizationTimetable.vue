<template>
  <v-container>
    <v-row>
      <v-col cols="3" v-if="!roomsLoaded">
        <v-progress-circular indeterminate color="primary" />
      </v-col>
      <v-col v-else-if="rooms.length > 1">
        <v-select
          label="Комната"
          :items="rooms"
          v-model="room"
          @change="getRehearsals"
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
    getRooms() {
      this.$http
        .get(`/organizations/${this.organization.id}/rooms`)
        .then((res) => {
          this.rooms = res.data.data;
          this.room = this.rooms[0].id;
          this.roomsLoaded = true;
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
