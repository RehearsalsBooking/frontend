<template>
  <div>
    <TimeStampPeriod
      v-model="from"
      @change="timestampChanged"
      :max="to"
      label="Начало"
    />
    <TimeStampPeriod
      @change="timestampChanged"
      v-model="to"
      :min="from"
      :errorMessage="errorMessage"
      label="Конец"
    />
  </div>
</template>
<script>
import TimeStampPeriod from "./TimeStampPeriod";

export default {
  name: "RehearsalTimeInput",
  components: { TimeStampPeriod },
  props: {
    period: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      errorMessage: "",
      from: this.period.from,
      to: this.period.to
    };
  },
  methods: {
    timestampChanged() {
      if (this.isFromAndToEqual()) {
        this.errorMessage = "Выберите другое время";
        return;
      }
      this.$emit("update:period", { from: this.from, to: this.to });
      this.$emit("change");
    },

    isFromAndToEqual() {
      return this.from && this.to && this.from === this.to;
    }
  }
};
</script>
