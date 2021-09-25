<template>
  <v-row align="center" justify="center">
    <v-row align="center" justify="center">
      <v-col
        cols="12"
        md="5"
        class="pt-0 mb-0 mb-sm-3 mt-2"
        align-self="center"
      >
        <formatted-date-picker
          label="Дата"
          v-model="date"
          :min="today"
          @change="timestampChanged"
        />
      </v-col>
      <v-col cols="12" md="4" class="overflow-visible">
        <TimeIntervalInput ref="timeInput" v-model="time" />
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12">
        <v-btn
          v-if="!isPeriodEmpty"
          text
          block
          rounded
          class="mb-2"
          color="error"
          @click="reset"
        >
          Сбросить
        </v-btn>
      </v-col>
    </v-row>
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
      return this.time.from === "" && this.time.to === "" && this.date === null;
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
      this.date = null;
      this.time = {
        from: "",
        to: "",
      };
      this.$refs.timeInput.reset();
    },
  },
};
</script>
