<template>
  <v-row align="center" justify="center">
    <v-col cols="12" md="5">
      <formatted-date-picker
        label="Дата"
        v-model="date"
        :min="today"
        @change="timestampChanged"
      />
    </v-col>
    <v-col cols="12" md="4">
      <vue-timepicker
        class="mb-2"
        minute-interval="30"
        v-model="fromTime"
        @change="fromTimeChanged"
        close-on-complete
        auto-scroll
        placeholder="Начало"
      />
      <vue-timepicker
        minute-interval="30"
        placeholder="Конец"
        v-model="toTime"
        @change="timestampChanged"
        close-on-complete
        auto-scroll
        hide-disabled-hours
        :disabled="isTimeObjectEmpty(this.fromTime)"
        :hour-range="availableToHours"
      />
    </v-col>
    <v-col cols="12" md="1">
      <v-btn icon @click="reset"><v-icon>mdi-delete</v-icon></v-btn>
    </v-col>
  </v-row>
</template>
<script>
import FormattedDatePicker from "./FormattedDatePicker";
import VueTimepicker from "vue2-timepicker/src/vue-timepicker.vue";

export default {
  name: "TimeStampPeriod",
  components: { FormattedDatePicker, VueTimepicker },
  props: {
    period: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      errorMessage: "",
      date: this.parseDate(this.period.from),
      fromTime: this.parseTime(this.period.from),
      toTime: this.parseTime(this.period.to),
      availableToHours: []
    };
  },
  computed: {
    from() {
      return this.compileTimestamp(this.date, this.fromTime);
    },
    to() {
      return this.compileTimestamp(this.date, this.toTime);
    },
    today() {
      let date = new Date();
      let year = date.getFullYear();
      let month = `${date.getMonth() + 1}`.padStart(2, "0");
      let day = `${date.getDate()}`.padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
  },
  watch: {
    period(value) {
      this.date = this.parseDate(value.from);
      this.fromTime = this.parseTime(value.from);
      this.toTime = this.parseTime(value.to);
    }
  },
  methods: {
    generateAvailableHours(min) {
      let availableHours = [];

      for (let i = min; i <= 24; i++) {
        availableHours.push(i);
      }

      return availableHours;
    },
    getMinimumHourForToTime() {
      let fromH = parseInt(this.fromTime.HH);

      if (this.fromTime.mm === "00") {
        return fromH;
      }

      return fromH + 1;
    },
    compileTimestamp(date, time) {
      if (date && !this.isTimeObjectEmpty(time)) {
        return `${date} ${this.timeToString(time)}`;
      }
      return null;
    },
    fromTimeChanged() {
      this.toTime = {
        HH: null,
        mm: null
      };

      if (this.isTimeObjectEmpty(this.fromTime)) {
        this.availableToHours = [];
      } else {
        this.availableToHours = this.generateAvailableHours(
          this.getMinimumHourForToTime()
        );
      }

      this.timestampChanged();
    },
    timestampChanged() {
      if (this.from && this.to) {
        this.$emit("update:period", { from: this.from, to: this.to });
        this.$emit("change");
      }
    },
    isTimeObjectEmpty(time) {
      return !(parseInt(time.HH) >= 0 && parseInt(time.mm) >= 0);
    },
    timeToString(time) {
      return `${time.HH}:${time.mm}`;
    },
    reset() {
      this.$emit("update:period", { from: null, to: null });
      this.$emit("change");
    },
    parseDate(timestamp) {
      return timestamp ? timestamp.split(" ")[0] : null;
    },
    parseTime(timestamp) {
      if (timestamp === null) {
        return {
          HH: null,
          mm: null
        };
      }

      let time = timestamp.split(" ")[1];

      return {
        HH: time.split(":")[0],
        mm: time.split(":")[1]
      };
    }
  }
};
</script>
