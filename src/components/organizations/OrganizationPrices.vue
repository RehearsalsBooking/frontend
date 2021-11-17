<template>
  <div class="d-flex">
    <v-btn rounded color="primary" @click="showModal = true"> Цены </v-btn>
    <Dialog v-model="showModal">
      <v-card min-height="500px">
        <v-card-title>
          <div class="mx-auto">Цены</div>
        </v-card-title>
        <v-card-text>
          <OrganizationRoomSelect
            :organization="organization"
            v-model="room"
            @change="getRoomPrices"
          />
          <v-progress-circular
            indeterminate
            color="primary"
            v-if="isPricesLoading"
          />
          <PriceCalendar :prices="prices" v-else />
        </v-card-text>
      </v-card>
    </Dialog>
  </div>
</template>

<script>
import Dialog from "../common/Dialog";
import PriceCalendar from "@/components/organizations/PriceCalendar";
import OrganizationRoomSelect from "@/components/organizations/OrganizationRoomSelect";

export default {
  name: "OrganizationPrices",
  props: {
    organization: Object,
  },
  components: { OrganizationRoomSelect, PriceCalendar, Dialog },
  data() {
    return {
      showModal: false,
      room: null,
      prices: [],
      isPricesLoading: true,
    };
  },
  methods: {
    getRoomPrices() {
      this.isPricesLoading = true;
      this.$http
        .get(`/rooms/${this.room}/prices`)
        .then((res) => {
          this.prices = res.data.data;
          this.isPricesLoading = false;
        })
        .catch((res) => {
          this.$snackbar(res.response.data);
        });
    },
  },
};
</script>
