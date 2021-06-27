<template>
  <v-col cols="12">
    <div class="mt-6">
      <h1>Ближайшие репетиции</h1>
      <RehearsalsDetailed
        :is-fetching="isUpcomingRehearsalsFetching"
        :rehearsals="upcomingRehearsals"
        :for-manager="false"
      >
        <template #no-rehearsals>
          Пока не запланировано ни одной репетиции
        </template>
      </RehearsalsDetailed>
    </div>
    <div class="mt-6">
      <h1>Расписание</h1>
      <RehearsalsTimetable
        show-detailed
        :rehearsals="allRehearsals"
        @calendarDatesChanged="getAllRehearsals"
        :for-manager="false"
      />
    </div>
  </v-col>
</template>

<script>
import RehearsalsDetailed from "@/components/rehearsals/RehearsalsDetailed";
import RehearsalsTimetable from "@/components/rehearsals/RehearsalsTimetable";

export default {
  name: "UserSchedule",
  components: { RehearsalsTimetable, RehearsalsDetailed },
  props: {
    userId: Number,
  },
  data() {
    return {
      upcomingRehearsals: [],
      allRehearsals: [],
      isUpcomingRehearsalsFetching: true,
    };
  },
  mounted() {
    this.getUpcomingRehearsals();
  },
  methods: {
    getUpcomingRehearsals() {
      this.isUpcomingRehearsalsFetching = true;
      this.$http
        .get(`/users/${this.userId}/rehearsals`, {
          params: { from: new Date().toISOString(), limit: 3 },
        })
        .then((res) => (this.upcomingRehearsals = res.data.data))
        .finally(() => (this.isUpcomingRehearsalsFetching = false));
    },
    getAllRehearsals({ end, start }) {
      this.$http
        .get("/rehearsals", {
          params: Object.assign(
            { user_id: this.userId },
            start && { from: start.date + " 00:00:00" },
            end && { to: end.date + " 23:59:59" }
          ),
        })
        .then((res) => (this.allRehearsals = res.data.data))
        .catch((res) => {
          this.$snackbar(res.response.data);
        });
    },
  },
};
</script>

<style scoped></style>
