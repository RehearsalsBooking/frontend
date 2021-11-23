<template>
  <div>
    <v-row>
      <v-col cols="12" class="pb-0">
        <h1 class="text-center">Общая статистика</h1>
      </v-col>
    </v-row>
    <v-fade-transition mode="out-in">
      <v-row v-if="isLoading" key="statistics-loading">
        <v-col md="6" cols="12" v-for="n in 2" :key="n">
          <v-skeleton-loader transition="fade" type="list-item-two-line" />
        </v-col>
      </v-row>
      <v-row v-else key="statistics-loaded">
        <v-col md="6" cols="12">
          <v-card>
            <v-card-text>
              <div class="d-flex flex-column justify-center align-center">
                <h1 class="font-weight-bold">{{ rehearsalsCount }}</h1>
                <h3>репетиций</h3>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col md="6" cols="12">
          <v-card>
            <v-card-text>
              <div class="d-flex flex-column justify-center align-center">
                <h1 class="font-weight-bold">{{ income }}</h1>
                <h3>заработано</h3>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-fade-transition>
  </div>
</template>

<script>
export default {
  name: "OrganizationStatisticsTotal",
  props: {
    id: [String, Number],
    rooms: Array,
    dateRange: Object,
  },
  data() {
    return {
      stats: [],
      isLoading: false,
    };
  },
  computed: {
    rehearsalsCount() {
      if (this.stats.length) {
        return this.stats[0]?.count;
      }
      return "-";
    },
    income() {
      if (this.stats.length) {
        return `${this.stats[0]?.income || 0} ₽`;
      }
      return "-";
    },
  },
  watch: {
    dateRange() {
      this.getTotalStatistics();
    },
    rooms() {
      this.getTotalStatistics();
    },
  },
  methods: {
    getTotalStatistics() {
      this.isLoading = true;
      this.$http
        .get(`/management/organizations/${this.id}/statistics/total`, {
          params: Object.assign(
            {},
            this.dateRange.from && { from: this.dateRange.from },
            this.dateRange.to && { to: this.dateRange.to },
            this.rooms.length && { rooms: this.rooms }
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

<style scoped>
h1 {
  color: black !important;
}
</style>
