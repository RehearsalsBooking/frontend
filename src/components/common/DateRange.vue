<template>
  <div>
    <v-select
      :items="dateRanges"
      v-model="selectedRange"
      item-value="value"
      item-text="name"
      label="Период"
    >
      <template v-slot:selection="{ item }">
        <template v-if="item.value === 'custom'">
          {{ customPeriodString }}
        </template>
        <template v-else>{{ item.name }}</template>
      </template>
      <template v-slot:append-item v-if="selectedRange === 'custom'">
        <v-list-item @click="dateRangeDialog = true">
          <v-list-item-content>
            <v-list-item-title> Выбрать другой период </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-select>
    <v-dialog ref="dialog" v-model="dateRangeDialog" persistent width="290px">
      <v-date-picker
        v-model="customPeriod"
        range
        scrollable
        show-current
        color="primary"
      >
        <v-spacer></v-spacer>
        <v-btn text color="error" @click="cancelCustomPeriodSelection">
          Отмена
        </v-btn>
        <v-btn text color="success" @click="selectCustomPeriod"> Выбрать</v-btn>
      </v-date-picker>
    </v-dialog>
  </div>
</template>
<script>
import moment from "moment";

export default {
  name: "DateRange",
  props: {
    value: Object,
  },
  data() {
    return {
      selectedRange: "month",
      dateRanges: [
        {
          name: "За сегодня",
          value: "today",
        },
        {
          name: "За эту неделю",
          value: "week",
        },
        {
          name: "За этот месяц",
          value: "month",
        },
        {
          name: "За этот год",
          value: "year",
        },
        {
          name: "За все время",
          value: "total",
        },
        {
          name: "Выбрать период",
          value: "custom",
        },
      ],
      dateRangeDialog: false,
      customPeriod: [null, null],
    };
  },
  mounted() {
    this.emitPeriod("month");
  },
  computed: {
    customPeriodString() {
      if (this.dateRangeDialog) {
        return "Выбрать период";
      }
      return `c ${moment(this.customPeriod[0]).format("DD.MM.YY")} по ${moment(
        this.customPeriod[1]
      ).format("DD.MM.YY")}`;
    },
  },
  watch: {
    selectedRange(val) {
      switch (val) {
        case "today":
          this.emitPeriod("day");
          break;

        case "week":
          this.emitPeriod("week");
          break;

        case "month":
          this.emitPeriod("month");
          break;

        case "year":
          this.emitPeriod("year");
          break;

        case "total":
          this.$emit("input", {
            from: null,
            to: null,
          });
          break;

        case "custom":
          this.dateRangeDialog = true;
          break;
      }
    },
  },
  methods: {
    emitPeriod(unitOfTime) {
      this.$emit("input", {
        from: this.formatDate(moment().startOf(unitOfTime)),
        to: this.formatDate(moment().endOf(unitOfTime)),
      });
    },
    formatDate(date) {
      return date.format("YYYY-MM-DD");
    },
    selectCustomPeriod() {
      this.reorderCustomPeriod();
      this.$emit("input", {
        from: this.formatDate(moment(this.customPeriod[0])),
        to: this.formatDate(moment(this.customPeriod[1])),
      });
      this.dateRangeDialog = false;
    },
    cancelCustomPeriodSelection() {
      this.selectedRange = "month";
      this.customPeriod = [null, null];
      this.dateRangeDialog = false;
      this.emitPeriod("month");
    },
    reorderCustomPeriod() {
      if (moment(this.customPeriod[0]).isAfter(moment(this.customPeriod[1]))) {
        this.customPeriod = [this.customPeriod[1], this.customPeriod[0]];
      }
    },
  },
};
</script>
<style scoped>
h1 {
  color: black !important;
}
</style>
