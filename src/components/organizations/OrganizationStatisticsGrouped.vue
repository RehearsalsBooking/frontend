<template>
  <div>
    <v-row>
      <h1>Статистика по периодам</h1>
    </v-row>
    <v-row>
      <v-col cols="3">
        <DateRange v-model="dateRange" />
      </v-col>
      <v-col cols="3">
        <v-select
          label="Группировать по"
          v-model="interval"
          :items="availableIntervals"
          item-text="name"
          item-value="value"
        />
      </v-col>
    </v-row>
    <v-fade-transition mode="out-in">
      <v-row v-if="isLoading" key="statistics-loading">
        <v-col cols="12">
          <v-skeleton-loader transition="fade" type="graph" />
        </v-col>
      </v-row>
      <v-row v-else key="statistics-loaded">
        <v-col cols="12">
          <apexchart :series="series" :options="chartOptions" height="350px" />
        </v-col>
      </v-row>
    </v-fade-transition>
  </div>
</template>

<script>
import DateRange from "@/components/common/DateRange";

export default {
  name: "OrganizationStatisticsGrouped",
  components: { DateRange },
  props: {
    id: [String, Number],
  },
  data() {
    return {
      stats: [],
      dateRange: {
        from: null,
        to: null,
      },
      interval: "day",
      availableIntervals: [
        { name: "По дню", value: "day" },
        { name: "По месяцу", value: "month" },
        { name: "По году", value: "year" },
      ],
      isLoading: false,
      chartOptions: {
        chart: {
          dropShadow: false,
          toolbar: false,
        },
        dataLabels: {
          enabled: true,
        },
        stroke: {
          curve: "smooth",
          width: [0, 4],
        },
        title: {
          text: "Количество репетиций и прибыль",
        },
        xaxis: {
          type: "datetime",
          labels: {
            datetimeFormatter: {
              year: "yyyy",
              month: "MMM",
              day: "dd MMM",
              hour: "",
            },
          },
        },
        yaxis: [
          {
            title: {
              text: "Прибыль",
            },
          },
          {
            opposite: true,
            title: {
              text: "Репетиций",
            },
          },
        ],
      },
    };
  },
  computed: {
    series() {
      let series = [
        {
          name: "Прибыль",
          type: "column",
          data: [],
        },
        {
          name: "Репетиций",
          type: "line",
          data: [],
        },
      ];
      this.stats.forEach((stat) => {
        series[0].data.push({ x: stat.x, y: stat.income });
        series[1].data.push({ x: stat.x, y: stat.count });
      });
      return series;
    },
  },
  watch: {
    dateRange() {
      this.getGroupedStatistics();
    },
    interval() {
      this.getGroupedStatistics();
    },
  },
  methods: {
    getGroupedStatistics() {
      this.isLoading = true;
      this.$http
        .get(`/management/organizations/${this.id}/statistics/grouped`, {
          params: Object.assign(
            { interval: this.interval },
            this.dateRange.from && { from: this.dateRange.from },
            this.dateRange.to && { to: this.dateRange.to }
          ),
        })
        .then((res) => {
          this.stats = res.data;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>
