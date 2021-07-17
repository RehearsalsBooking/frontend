<template>
  <v-container fluid>
    <v-row class="justify-space-around">
      <v-col cols="12">
        <div>
          <h1>Управление ценами</h1>
        </div>
      </v-col>
    </v-row>
    <v-row class="justify-space-around">
      <v-col cols="7">
        <AddPrice :organizationId="id" />
      </v-col>
    </v-row>
    <v-row class="justify-space-around">
      <v-col cols="12">
        <div>
          <PriceCalendar
            :prices="prices"
            v-if="prices.length > 0"
            for-manager
            :organization-id="id"
          />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PriceCalendar from "@/components/organizations/PriceCalendar";
import AddPrice from "@/pages/management/AddPrice";
import { EventBus } from "@/event-bus";

export default {
  name: "OrganizationPricesPage",
  components: { AddPrice, PriceCalendar },
  props: {
    id: [String, Number],
  },
  data() {
    return {
      prices: [],
    };
  },
  mounted() {
    this.getOrganizationPrices();
    EventBus.$on("prices-changed", () => this.getOrganizationPrices());
  },
  methods: {
    getOrganizationPrices() {
      this.$http
        .get(`management/organizations/${this.id}/prices`)
        .then((res) => {
          this.prices = res.data.data;
        });
    },
  },
};
</script>
