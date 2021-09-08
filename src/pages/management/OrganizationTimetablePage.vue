<template>
  <v-container fluid>
    <v-row class="justify-space-around">
      <v-col cols="12">
        <div class="mt-6">
          <h1>Ближайшие репетиции</h1>
          <RehearsalsDetailed
            :is-fetching="isUpcomingRehearsalsFetching"
            :rehearsals="upcomingRehearsals"
            :forManager="true"
          >
            <template #no-rehearsals>
              Пока не запланировано ни одной репетиции
            </template>
          </RehearsalsDetailed>
        </div>
        <div class="mt-6">
          <h1>Забронировать репетицию</h1>
          <OrganizationBooking
            :organizationId="id"
            :with-band-selection="false"
          />
        </div>
        <div class="mt-6">
          <h1>Расписание</h1>
          <RehearsalsFilter v-model="filters" />
          <RehearsalsTimetable
            show-detailed
            :forManager="true"
            :rehearsals="rehearsals"
            @calendarDatesChanged="getOrganizationRehearsals"
          />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import RehearsalsDetailed from "@/components/rehearsals/RehearsalsDetailed";
import RehearsalsTimetable from "@/components/rehearsals/RehearsalsTimetable";
import OrganizationBooking from "@/components/organizations/OrganizationBooking";
import { EventBus } from "@/event-bus";
import RehearsalsFilter from "@/components/rehearsals/RehearsalsFilter";

export default {
  name: "OrganizationTimetablePage",
  components: {
    RehearsalsFilter,
    OrganizationBooking,
    RehearsalsTimetable,
    RehearsalsDetailed,
  },
  props: {
    id: [String, Number],
  },
  data() {
    return {
      rehearsals: [],
      upcomingRehearsals: [],
      isUpcomingRehearsalsFetching: false,
      filters: {},
      start: null,
      end: null,
    };
  },
  mounted() {
    this.getUpcomingRehearsals();
    EventBus.$on("rehearsals-changed", this.getUpcomingRehearsals);
  },
  watch: {
    filters: {
      deep: true,
      handler: function () {
        this.getOrganizationRehearsals({});
      },
    },
    id() {
      this.getUpcomingRehearsals();
      this.getOrganizationRehearsals({});
    },
  },
  methods: {
    getUpcomingRehearsals() {
      this.isUpcomingRehearsalsFetching = true;
      this.$http
        .get(`/management/organizations/${this.id}/rehearsals`, {
          params: { limit: 3, from: new Date().toISOString() },
        })
        .then((res) => {
          this.upcomingRehearsals = res.data.data;
        })
        .finally(() => (this.isUpcomingRehearsalsFetching = false));
    },
    getOrganizationRehearsals({ end, start }) {
      if (start) {
        this.start = start;
      }
      if (end) {
        this.end = end;
      }
      this.$http
        .get(`/rehearsals`, {
          params: Object.assign(
            { organization_id: this.id },
            this.start && { from: this.start.date + " 00:00:00" },
            this.end && { to: this.end.date + " 23:59:59" },
            { ...this.filters }
          ),
        })
        .then((res) => {
          this.rehearsals = res.data.data;
        });
    },
  },
};
</script>
