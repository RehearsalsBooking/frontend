<template>
  <v-row align="center">
    <v-col cols="12" md="2">
      <v-text-field disabled :value="label" />
    </v-col>
    <v-col cols="12" md="5">
      <formatted-date-picker
        label="Дата"
        :min="min ? parseDate(min) : null"
        :max="max ? parseDate(max) : null"
        v-model="date"
      />
    </v-col>
    <v-col cols="12" md="4">
      <time-picker
        label="Время"
        :min="min ? parseTime(min) : null"
        :max="max ? parseTime(max) : null"
        v-model="time"
      />
    </v-col>
    <v-col cols="12" md="1" v-if="date || time">
      <v-btn icon @click="reset"><v-icon>mdi-delete</v-icon></v-btn>
    </v-col>
  </v-row>
</template>
<script>
import FormattedDatePicker from "../FormattedDatePicker";
import TimePicker from "../TimePicker";

export default {
  name: "TimeStampPeriod",
  components: { FormattedDatePicker, TimePicker },
  props: {
    label: String,
    min: String,
    max: String,
    value: String
  },
  data() {
    return {
      date: this.parseDate(this.value),
      time: this.parseTime(this.value)
    };
  },
  computed: {},
  methods: {
    computeResultTimestamp(date, time) {
      const ts = `${date} ${time}`;
      console.log(ts);
      this.$emit("input", ts);
    },
    parseDate(timestamp) {
      console.log(timestamp);
      return timestamp.split(" ")[0];
    },
    parseTime(timestamp) {
      return timestamp.split(" ")[1];
    },
    reset() {
      this.date = "";
      this.time = "";
      this.$emit("input", "");
    }
  },
  watch: {
    date(newDate) {
      if (newDate && this.time) {
        this.computeResultTimestamp(newDate, this.time);
      }
    },
    time(newTime) {
      if (this.date && newTime) {
        this.computeResultTimestamp(this.date, newTime);
      }
    }
  }
};
</script>
