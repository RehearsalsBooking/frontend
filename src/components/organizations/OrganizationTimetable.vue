<template>
  <v-row>
    <v-col cols="12">
      <v-toolbar flat color="white">
        <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
          Сегодня
        </v-btn>
        <v-btn fab text small color="grey darken-2" @click="prev">
          <v-icon small>mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn fab text small color="grey darken-2" @click="next">
          <v-icon small>mdi-chevron-right</v-icon>
        </v-btn>
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-sheet height="750">
        <v-calendar
          ref="calendar"
          :short-intervals="false"
          :interval-height="40"
          :weekdays="[1, 2, 3, 4, 5, 6, 0]"
          :events="rehearsals"
          locale="ru-RU"
          :now="today"
          :type="type"
          v-model="focus"
          :first-interval="firstInterval"
          :interval-count="intervalCount"
          color="primary"
          @change="calendarDatesChanged"
        />
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "OrganizationTimetable",
  props: {
    organization: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      rehearsals: [],
      firstInterval: 0,
      focus: "",
      type: "week",
      today: this.formatDate(new Date()),
      start: null,
      end: null
    };
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
      const months = "января,февраля,марта,апреля,мая,июня,июля,августа,сентября,октября,ноября,декабря".split(
        ","
      );
      const startMonth = months[start.month - 1];
      const endMonth = months[end.month - 1];

      const startYear = start.year;
      const endYear = end.year;
      const suffixYear = startYear === endYear ? "" : endYear;

      const startDay = start.day;
      const endDay = end.day;

      return `${startDay} ${startMonth} ${startYear} - ${endDay} ${endMonth} ${suffixYear}`;
    }
  },
  methods: {
    getRehearsals(from, to) {
      this.$http
        .get("/rehearsals", {
          params: Object.assign(
            { organization_id: this.organization.id },
            from && { from: from + " 00:00:00" },
            to && { to: to + " 23:59:59" }
          )
        })
        .then(
          res =>
            (this.rehearsals = this.transformRehearsalsForCalendar(
              res.data.data
            ))
        )
        .catch(res => {
          this.$snackbar(res.response.data);
        });
    },
    transformRehearsalsForCalendar(rehearsalsFromBackend) {
      let events = rehearsalsFromBackend.map(rehearsal => {
        return {
          start: rehearsal.starts_at,
          end: rehearsal.ends_at,
          name: "Занято"
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
      this.getRehearsals(start.date, end.date);
      this.start = start;
      this.end = end;
    },
    setToday() {
      this.focus = this.today;
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    formatDate(date) {
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    }
  }
};
</script>
