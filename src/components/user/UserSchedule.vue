<template>
  <v-col cols="12">
    <div class="mt-6">
      <h1 class="text-center">Ближайшие репетиции</h1>
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
      <h1 class="text-center">Расписание</h1>
      <RehearsalsFilter v-model="filters" :bands="bands" with-individual />
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
import { EventBus } from "@/event-bus";
import RehearsalsFilter from "@/components/rehearsals/RehearsalsFilter";
import { mapGetters } from "vuex";

export default {
  name: "UserSchedule",
  components: { RehearsalsFilter, RehearsalsTimetable, RehearsalsDetailed },
  props: {
    userId: Number,
  },
  data() {
    return {
      upcomingRehearsals: [],
      allRehearsals: [],
      isUpcomingRehearsalsFetching: true,
      filters: {},
      start: null,
      end: null,
    };
  },
  computed: {
    ...mapGetters({
      user: "auth/getUser",
    }),
    bands() {
      return this.user.bands;
    },
  },
  mounted() {
    this.getUpcomingRehearsals();
    EventBus.$on("rehearsals-changed", () => this.getUpcomingRehearsals());
  },
  watch: {
    filters: {
      deep: true,
      handler: function () {
        this.getAllRehearsals({});
      },
    },
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
      if (start) {
        this.start = start;
      }
      if (end) {
        this.end = end;
      }
      this.$http
        .get("/rehearsals", {
          params: Object.assign(
            { user_id: this.userId },
            this.start && { from: this.start.date + " 00:00:00" },
            this.end && { to: this.end.date + " 23:59:59" },
            { ...this.filters }
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
