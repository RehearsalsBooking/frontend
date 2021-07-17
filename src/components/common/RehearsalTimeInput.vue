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
      <TimeIntervalInput v-model="time" />
    </v-col>
    <v-col cols="12" md="1">
      <v-btn v-if="!isPeriodEmpty" icon @click="reset">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>
<script>
import FormattedDatePicker from "./FormattedDatePicker";
import TimeIntervalInput from "@/pages/management/TimeIntervalInput";

export default {
  name: "RehearsalTimeInput",
  components: { TimeIntervalInput, FormattedDatePicker },
  props: {
    period: {
      required: true,
    },
  },
  data() {
    return {
      date: this.parseDate(this.period.from),
      time: {
        from: "",
        to: "",
      },
    };
  },
  mounted() {
    this.time.from = this.parseTime(this.period.from);
    this.time.to = this.parseTime(this.period.to);
  },
  computed: {
    from() {
      return this.compileTimestamp(this.date, this.time.from);
    },
    to() {
      return this.compileTimestamp(this.date, this.time.to);
    },
    today() {
      let date = new Date();
      let year = date.getFullYear();
      let month = `${date.getMonth() + 1}`.padStart(2, "0");
      let day = `${date.getDate()}`.padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
    isPeriodEmpty() {
      return (
        this.period === undefined ||
        (this.period.from === null &&
          this.period.to === null &&
          this.date === null)
      );
    },
  },
  watch: {
    period(value) {
      if (value) {
        this.date = this.parseDate(value.from);
        this.time.from = this.parseTime(value.from);
        this.time.to = this.parseTime(value.to);
      }
    },
    time() {
      this.timestampChanged();
    },
  },
  methods: {
    compileTimestamp(date, time) {
      if (date && time) {
        return `${date} ${time}`;
      }
      return null;
    },
    timestampChanged() {
      if (this.from && this.to) {
        this.$emit("update:period", { from: this.from, to: this.to });
        this.$emit("change");
      }
    },
    parseDate(timestamp) {
      return timestamp ? timestamp.split(" ")[0] : null;
    },
    parseTime(timestamp) {
      if (timestamp === null) {
        return "";
      }
      return timestamp.split(" ")[1];
    },
    reset() {
      this.date = this.parseDate(this.period.from);
      this.time = {
        from: "",
        to: "",
      };
    },
  },
};
</script>
