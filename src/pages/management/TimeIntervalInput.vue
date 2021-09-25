<template>
  <div class="d-flex flex-column justify-center time-interval-input">
    <vue-timepicker
      minute-interval="30"
      class="mb-1"
      input-width="100%"
      v-model="fromTime"
      close-on-complete
      auto-scroll
      placeholder="Начало"
    />
    <vue-timepicker
      inputClass="skip-error-style"
      minute-interval="30"
      placeholder="Конец"
      class="mb-1"
      input-width="100%"
      v-model="toTime"
      close-on-complete
      auto-scroll
      hide-disabled-hours
      :disabled="isFromTimeEmpty || tillTheEndOfDay"
      :hour-range="availableToHours"
    />
    <v-checkbox
      label="До конца дня"
      v-model="tillTheEndOfDay"
      dense
      hide-details
      :disabled="isFromTimeEmpty"
      class="mt-1"
    />
  </div>
</template>
<script>
import VueTimepicker from "vue2-timepicker/src/vue-timepicker.vue";

export default {
  name: "TimeIntervalInput",
  components: { VueTimepicker },
  props: {
    value: Object,
  },
  data() {
    return {
      fromTime: {
        HH: "",
        mm: "",
      },
      toTime: {
        HH: "",
        mm: "",
      },
      availableToHours: [],
      tillTheEndOfDay: false,
    };
  },
  computed: {
    isFromTimeEmpty() {
      return this.isTimeObjectEmpty(this.fromTime);
    },
    toTimeIsBeforeFromTime() {
      if (this.toTime.HH < this.fromTime.HH) {
        return true;
      }
      if (this.toTime.HH === this.fromTime.HH) {
        return this.toTime.mm < this.fromTime.mm;
      }
      return false;
    },
  },
  mounted() {
    if (this.toTime.HH === "23" && this.toTime.mm === "59") {
      this.tillTheEndOfDay = true;
    }
  },
  watch: {
    tillTheEndOfDay(value) {
      if (value) {
        this.toTime = {
          HH: "23",
          mm: "59",
        };
      } else {
        this.toTime = {
          HH: null,
          mm: null,
        };
        this.availableToHours = this.generateAvailableHours(
          this.getMinimumHourForToTime()
        );
      }
    },
    fromTime: {
      deep: true,
      handler: function () {
        this.availableToHours = this.generateAvailableHours(
          this.getMinimumHourForToTime()
        );
        if (this.toTimeIsBeforeFromTime || this.isFromTimeEmpty) {
          this.toTime = {
            HH: null,
            mm: null,
          };
        }
        this.emitNewTime();
      },
    },
    toTime() {
      this.emitNewTime();
    },
  },
  methods: {
    emitNewTime() {
      this.$emit("input", {
        from: this.timeToString(this.fromTime),
        to: this.timeToString(this.toTime),
      });
    },
    generateAvailableHours(min) {
      let availableHours = [];

      for (let i = min; i < 24; i++) {
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
    isTimeObjectEmpty(time) {
      return !(parseInt(time.HH) >= 0 && parseInt(time.mm) >= 0);
    },
    timeToString(time) {
      if (time.HH && time.mm) {
        return `${time.HH}:${time.mm}`;
      }
      return "";
    },
    reset() {
      this.tillTheEndOfDay = false;
      this.fromTime = {
        HH: "",
        mm: "",
      };
      this.toTime = {
        HH: "",
        mm: "",
      };
      this.availableToHours = [];
    },
  },
};
</script>
<style>
.time-interval-input .vue__time-picker input.display-time.disabled {
  background-color: #f0f0f0;
}
</style>
