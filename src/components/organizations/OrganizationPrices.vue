<template>
  <div class="d-flex">
    <v-btn rounded color="primary" @click="showModal = true"> Цены </v-btn>
    <Dialog v-model="showModal">
      <v-card>
        <v-card-title>
          <div class="mx-auto">Цены</div>
        </v-card-title>
        <v-card-text>
          <PriceCalendar :prices="prices" />
        </v-card-text>
      </v-card>
    </Dialog>
  </div>
</template>

<script>
import Dialog from "../common/Dialog";
import PriceCalendar from "@/components/organizations/PriceCalendar";

export default {
  name: "OrganizationPrices",
  props: {
    prices: Array,
  },
  components: { PriceCalendar, Dialog },
  data() {
    return {
      showModal: false,
    };
  },
};
</script>
