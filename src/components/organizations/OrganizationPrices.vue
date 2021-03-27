<template>
  <div class="d-flex">
    <v-btn rounded color="primary" @click="showModal = true"> Цены </v-btn>
    <Dialog v-model="showModal">
      <v-card>
        <v-card-title>
          <div class="mx-auto">Цены</div>
        </v-card-title>
        <v-card-text>
          <v-calendar
            ref="calendar"
            type="week"
            class="prices"
            :short-intervals="false"
            :short-weekdays="false"
            :first-interval="firstInterval"
            :interval-count="intervalCount"
            :interval-height="30"
            :weekdays="[1, 2, 3, 4, 5, 6, 0]"
            :events="priceEvents"
            :event-color="getEventColor"
            locale="ru-RU"
            @change="transformPricesToEvents"
          />
        </v-card-text>
      </v-card>
    </Dialog>
  </div>
</template>

<script>
import generateGradient from "../../utils/gradient_generator";
import Dialog from "../common/Dialog";

export default {
  name: "OrganizationPrices",
  props: {
    prices: Array,
  },
  components: { Dialog },
  data() {
    return {
      showModal: false,
      priceEvents: [],
      firstInterval: 0,
      priceColors: {},
    };
  },
  computed: {
    intervalCount() {
      return 24 - this.firstInterval;
    },
  },
  mounted() {
    this.generatePriceColors();
    this.setCalendarIntervalBoundaries();
  },
  methods: {
    generatePriceColors() {
      let orderedPrices = this.prices.map((price) => price.price).sort();
      let prices = [...new Set(orderedPrices)]; //remove duplicates
      let colors = generateGradient("#16c630", "#e04205", prices.length);
      colors.forEach((color, index) => {
        this.priceColors[prices[index]] = color;
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
      let startDate = new Date(this.$refs.calendar.lastStart.date);
      this.prices.forEach((price) => {
        let date = new Date(startDate.toString());
        date.setDate(date.getDate() + price.day);
        this.priceEvents.push({
          start: this.addDateToTime(date, price.starts_at),
          end: this.addDateToTime(date, price.ends_at),
          name: price.price.slice(0, -3) + " руб/ч",
          price: price.price,
        });
      });
    },
    addDateToTime(date, time) {
      let year = date.getFullYear();
      let month = `${date.getMonth() + 1}`.padStart(2, "0");
      let day = `${date.getDate()}`.padStart(2, "0");
      return `${year}-${month}-${day} ${time}`;
    },
  },
};
</script>

<style lang="scss">
.prices {
  .v-calendar-daily_head-day-label {
    display: none !important;
  }
  .v-calendar-daily_head-day.v-past .v-calendar-daily_head-weekday {
    color: inherit !important;
  }
}
</style>
