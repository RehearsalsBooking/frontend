<template>
  <v-container fluid>
    <v-row class="justify-space-around">
      <v-col cols="12">
        <div>
          <h1 class="text-center">Управление ценами</h1>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <OrganizationRoomSelect :organizationId="id" v-model="room" />
    </v-row>
    <v-row class="justify-space-around">
      <v-col md="7" cols="12">
        <AddPrice :roomId="room" />
      </v-col>
    </v-row>
    <v-row class="justify-space-around">
      <v-col cols="12">
        <div>
          <PriceCalendar
            :prices="prices"
            v-if="prices.length > 0"
            for-manager
            :roomId="room"
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
import OrganizationRoomSelect from "@/components/organizations/OrganizationRoomSelect";

export default {
  name: "OrganizationPricesPage",
  components: { OrganizationRoomSelect, AddPrice, PriceCalendar },
  props: {
    id: [String, Number],
  },
  data() {
    return {
      prices: [],
      room: null,
    };
  },
  watch: {
    id() {
      this.getOrganizationPrices();
    },
    room() {
      this.getOrganizationPrices();
    },
  },
  mounted() {
    EventBus.$on("prices-changed", () => this.getOrganizationPrices());
  },
  methods: {
    getOrganizationPrices() {
      if (this.room) {
        this.$http.get(`/rooms/${this.room}/prices`).then((res) => {
          this.prices = res.data.data;
        });
      }
    },
  },
};
</script>
