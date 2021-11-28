<template>
  <v-container fluid class="pt-0">
    <v-row>
      <OrganizationRoomSelect v-model="room" :organizationId="id" />
    </v-row>
    <v-row class="justify-space-around" v-if="room">
      <v-col cols="12" class="pt-0">
        <div class="mt-6">
          <h1 class="text-center">Ближайшие репетиции</h1>
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
          <h1>Расписание</h1>
          <RehearsalsFilter v-model="filters" />
          <RehearsalsTimetable
            show-detailed
            :forManager="true"
            :rehearsals="rehearsals"
            ref="timetable"
            id="timetable"
            @calendarDatesChanged="getOrganizationRehearsals"
          />
        </div>
        <div class="mt-6">
          <h1 class="text-center">Забронировать репетицию</h1>
          <OrganizationBooking
            :room-id="room"
            :with-band-selection="false"
            @rehearsalAdded="rehearsalAdded"
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
import OrganizationRoomSelect from "@/components/organizations/OrganizationRoomSelect";

export default {
  name: "OrganizationTimetablePage",
  components: {
    OrganizationRoomSelect,
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
      room: null,
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
    room() {
      this.getUpcomingRehearsals();
      this.getOrganizationRehearsals({});
    },
  },
  methods: {
    getUpcomingRehearsals() {
      this.isUpcomingRehearsalsFetching = true;
      this.$http
        .get(`/management/organizations/${this.id}/rehearsals`, {
          params: {
            limit: 3,
            from: new Date().toISOString(),
            room_id: this.room,
          },
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
      this.rehearsals = [];
      this.$http
        .get(`/rehearsals`, {
          params: Object.assign(
            { organization_id: this.id, room_id: this.room },
            this.start && { from: this.start.date + " 00:00:00" },
            this.end && { to: this.end.date + " 23:59:59" },
            { ...this.filters }
          ),
        })
        .then((res) => {
          this.rehearsals = res.data.data;
        });
    },
    rehearsalAdded(rehearsalParams) {
      this.scrollToCalendar();
      this.$refs.timetable.setFocus(rehearsalParams.starts_at.split(" ")[0]);
    },
    scrollToCalendar() {
      this.$vuetify.goTo("#timetable", {
        duration: 650,
        offset: 0,
        easing: "easeOutCubic",
      });
    },
  },
};
</script>
