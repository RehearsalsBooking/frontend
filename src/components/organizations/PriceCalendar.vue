<template>
  <div>
    <Legend :items="legend" class="mb-3 hidden-sm-and-up" />
    <v-calendar
      ref="calendar"
      type="week"
      class="prices"
      :short-intervals="true"
      :short-weekdays="true"
      interval-width="30"
      :first-interval="firstInterval"
      :interval-count="intervalCount"
      :interval-height="30"
      :weekdays="[1, 2, 3, 4, 5, 6, 0]"
      :events="priceEvents"
      :event-color="getEventColor"
      locale="ru-RU"
      @change="transformPricesToEvents"
      @click:event="editPrice"
    >
      <template #event v-if="!$vuetify.breakpoint.smAndUp"></template>
    </v-calendar>
    <v-menu
      v-model="selectedOpen"
      :close-on-content-click="false"
      :activator="selectedElement"
      offset-x
      rounded="xl"
    >
      <PriceEditCard
        :price="selectedPrice"
        :organization-id="organizationId"
        outlined
      />
    </v-menu>
  </div>
</template>
<script>
import generateGradient from "@/utils/gradient_generator";
import PriceEditCard from "@/components/organizations/PriceEditCard";
import { EventBus } from "@/event-bus";
import Legend from "@/components/common/Legend";

export default {
  name: "PriceCalendar",
  components: { Legend, PriceEditCard },
  props: {
    prices: Array,
    forManager: {
      type: Boolean,
      default: false,
    },
    organizationId: [Number, String],
  },
  data() {
    return {
      priceEvents: [],
      firstInterval: 0,
      priceColors: {},
      selectedPrice: {},
      selectedElement: null,
      selectedOpen: false,
      legend: [],
    };
  },
  computed: {
    intervalCount() {
      return 24 - this.firstInterval;
    },
  },
  watch: {
    prices() {
      this.generatePriceColors();
      this.setCalendarIntervalBoundaries();
      this.transformPricesToEvents();
    },
  },
  mounted() {
    this.generatePriceColors();
    this.setCalendarIntervalBoundaries();
    EventBus.$on("prices-changed", () => {
      this.selectedPrice = {};
      this.selectedOpen = false;
      this.selectedElement = null;
    });
  },
  methods: {
    generatePriceColors() {
      let orderedPrices = this.prices
        .map((price) => price.price)
        .sort((a, b) => a - b);
      let prices = [...new Set(orderedPrices)]; //remove duplicates
      let colors = generateGradient("#16c630", "#e04205", prices.length);
      colors.forEach((color, index) => {
        this.priceColors[prices[index]] = color;
        this.legend.push({
          color: color,
          text: prices[index],
        });
      });
    },
    getEventColor(event) {
      return this.priceColors[event.price];
    },
    setCalendarIntervalBoundaries() {
      let minimumTime = this.prices.reduce(
        (min, price) => (price.starts_at < min ? price.starts_at : min),
        this.prices[0].starts_at
      );
      this.firstInterval = +/(\d{2}):(\d{2}):(\d{2})/.exec(minimumTime)[1];
    },
    transformPricesToEvents() {
      this.priceEvents = [];
      let startDate = new Date(this.$refs.calendar.lastStart.date);
      this.prices.forEach((price) => {
        let date = new Date(startDate.toString());
        date.setDate(date.getDate() + price.day);
        this.priceEvents.push({
          start: this.addDateToTime(date, price.starts_at),
          end: this.addDateToTime(date, price.ends_at),
          name: this.$vuetify.breakpoint.mdAndUp
            ? price.price.slice(0, -3) + " руб/ч"
            : "",
          price: price.price,
          id: price.id,
        });
      });
    },
    addDateToTime(date, time) {
      let year = date.getFullYear();
      let month = `${date.getMonth() + 1}`.padStart(2, "0");
      let day = `${date.getDate()}`.padStart(2, "0");
      return `${year}-${month}-${day} ${time}`;
    },
    editPrice({ nativeEvent, event }) {
      if (!this.forManager) {
        return;
      }
      const open = async () => {
        this.selectedPrice = event;
        this.selectedElement = nativeEvent.target;
        requestAnimationFrame(() =>
          requestAnimationFrame(() => (this.selectedOpen = true))
        );
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        requestAnimationFrame(() => requestAnimationFrame(() => open()));
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
  },
};
</script>
<style lang="scss">
.prices {
  .v-calendar-daily_head-day-label {
    display: none !important;
  }
}
</style>
