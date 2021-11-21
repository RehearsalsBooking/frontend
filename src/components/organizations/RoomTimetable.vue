<template>
  <v-container>
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
  name: "RoomTimetable",
  components: { RehearsalsTimetable },
  props: {
    room: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      rehearsals: [],
      start: null,
      end: null,
      loaded: false,
    };
  },
  watch: {
    room() {
      this.rehearsals = [];
      this.getRehearsals({});
    },
  },
  methods: {
    getRehearsals({ start, end }) {
      if (start) {
        this.start = start;
      }
      if (end) {
        this.end = end;
      }
      this.loaded = false;
      this.$http
        .get("/rehearsals", {
          params: {
            room_id: this.room,
            from: this.start.date + " 00:00:00",
            to: this.end.date + " 23:59:59",
          },
        })
        .then((res) => (this.rehearsals = res.data.data))
        .catch((res) => {
          this.$snackbar(res.response.data);
        })
        .finally(() => (this.loaded = true));
    },
    setFocus(date) {
      this.$refs.timetable.setFocus(date);
    },
  },
};
</script>
