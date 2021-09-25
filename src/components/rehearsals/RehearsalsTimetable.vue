<template>
  <v-col>
    <v-row>
      <v-col sm="6" md="1" class="justify-center d-flex pb-0">
        <v-btn outlined color="grey darken-2" @click="setToday">
          Сегодня
        </v-btn>
      </v-col>
      <v-col sm="6" md="1" class="justify-center justify-md-start d-flex pb-0">
        <v-btn fab text small color="grey darken-2" @click="prev">
          <v-icon small>mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn fab text small color="grey darken-2" @click="next">
          <v-icon small>mdi-chevron-right</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="fill-height">
      <v-col class="pt-0">
        <v-sheet style="width: 100%">
          <v-toolbar flat class="justify-center d-flex">
            <v-toolbar-title>{{ title }}</v-toolbar-title>
          </v-toolbar>
          <v-calendar
            ref="calendar"
            :short-intervals="true"
            :short-weekdays="true"
            :interval-height="30"
            interval-width="30"
            :weekdays="[1, 2, 3, 4, 5, 6, 0]"
            :events="transformedRehearsals"
            locale="ru-RU"
            :now="today"
            :type="type"
            v-model="focus"
            :first-interval="firstInterval"
            :interval-count="intervalCount"
            :event-color="getRehearsalColor"
            @change="calendarDatesChanged"
            @click:event="showRehearsalDetails"
          />
          <v-menu
            v-model="selectedOpen"
            :close-on-content-click="false"
            :activator="selectedElement"
            offset-x
            rounded="xl"
          >
            <RehearsalTile
              outlined
              :rehearsal="selectedRehearsal"
              :forManager="forManager"
            />
          </v-menu>
        </v-sheet>
      </v-col>
    </v-row>
  </v-col>
</template>
<script>
import RehearsalTile from "@/components/rehearsals/RehearsalDetailed";
import { EventBus } from "@/event-bus";

export default {
  name: "RehearsalsTimetable",
  components: { RehearsalTile },
  props: {
    rehearsals: Array,
    showDetailed: {
      type: Boolean,
      default: false,
    },
    forManager: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      firstInterval: 0,
      focus: "",
      type: this.$vuetify.breakpoint.mdAndUp ? "week" : "4day",
      today: this.formatDate(new Date()),
      start: null,
      end: null,
      selectedRehearsal: {},
      selectedElement: null,
      selectedOpen: false,
    };
  },
  mounted() {
    EventBus.$on("rehearsals-changed", () =>
      this.calendarDatesChanged({ start: this.start, end: this.end })
    );
  },
  computed: {
    intervalCount() {
      return 24 - this.firstInterval;
    },
    title() {
      const { start, end } = this;
      if (!start || !end) {
        return "";
      }
      const months =
        "января,февраля,марта,апреля,мая,июня,июля,августа,сентября,октября,ноября,декабря".split(
          ","
        );
      const startMonth = months[start.month - 1];
      const endMonth = months[end.month - 1];

      const startDay = start.day;
      const endDay = end.day;

      return `${startDay} ${startMonth} - ${endDay} ${endMonth}`;
    },
    transformedRehearsals() {
      return this.transformRehearsalsForCalendar(this.rehearsals);
    },
  },
  methods: {
    getRehearsalColor(rehearsal) {
      return rehearsal.color;
    },
    transformRehearsalsForCalendar(rehearsalsFromBackend) {
      let events = rehearsalsFromBackend.map((rehearsal) => {
        return {
          id: rehearsal.id,
          start: rehearsal.starts_at,
          end: rehearsal.ends_at,
          name: "Занято",
          color: rehearsal.is_participant ? "secondary" : "primary",
        };
      });

      this.setFirstIntervalForCalendar(rehearsalsFromBackend);

      return events;
    },
    getRehearsalStartTime(rehearsal) {
      return rehearsal.starts_at.slice(-9);
    },
    setFirstIntervalForCalendar(rehearsals) {
      if (rehearsals.length > 0) {
        let minimumTime = rehearsals.reduce(
          (min, rehearsal) =>
            this.getRehearsalStartTime(rehearsal) < min
              ? this.getRehearsalStartTime(rehearsal)
              : min,
          this.getRehearsalStartTime(rehearsals[0])
        );

        this.firstInterval = +/(\d{2}):(\d{2}):(\d{2})/.exec(minimumTime)[1];
      }
    },
    calendarDatesChanged({ start, end }) {
      this.$emit("calendarDatesChanged", { start, end });
      this.start = start;
      this.end = end;
    },
    setToday() {
      this.focus = this.today;
    },
    setFocus(date) {
      let startOld = this.start.date;
      this.focus = date;
      this.$nextTick(() => {
        let startNew = this.start.date;
        // if calendar period is not changed
        // then refresh rehearsals manually
        // otherwise calendarDatesChanged event will be triggered
        if (startNew === startOld) {
          this.$emit("calendarDatesChanged", this.start.date, this.end.date);
        }
      });
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    formatDate(date) {
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    },
    showRehearsalDetails({ nativeEvent, event }) {
      if (!this.showDetailed) {
        return;
      }

      const open = async () => {
        this.selectedRehearsal = await this.getRehearsal(event.id);
        this.selectedElement = nativeEvent.target;
        requestAnimationFrame(() =>
          requestAnimationFrame(() => (this.selectedOpen = true))
        );
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        requestAnimationFrame(() => requestAnimationFrame(() => open()));
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
    async getRehearsal(id) {
      const rehearsal = await this.$http.get(`rehearsals/${id}`);
      return rehearsal.data.data;
    },
  },
};
</script>
