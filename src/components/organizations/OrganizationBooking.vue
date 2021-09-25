<template>
  <v-row class="justify-space-around mt-4 mb-4">
    <v-col sm="12" md="4">
      <v-card class="px-4">
        <v-card-title>
          <div class="mx-auto">Выберите время</div>
        </v-card-title>
        <v-card-text>
          <RehearsalTimeInput :period.sync="time" />
        </v-card-text>
      </v-card>
    </v-col>
    <OrganizationBookingBandSelection
      :bandId.sync="bandId"
      v-if="withBandSelection"
    />
    <v-col sm="12" md="4" class="d-flex flex-column align-center">
      <v-card
        height="100%"
        width="100%"
        class="d-flex flex-column justify-lg-space-between"
      >
        <OrganizationBookingPriceCalculation
          :price.sync="price"
          :time="time"
          :organizationId="organizationId"
        />
        <v-card-actions>
          <v-btn
            :disabled="!price"
            rounded
            color="primary"
            block
            class="mb-1"
            @click="bookRehearsal"
          >
            Забронировать
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import RehearsalTimeInput from "../common/RehearsalTimeInput";
import OrganizationBookingBandSelection from "./OrganizationBookingBandSelection";
import OrganizationBookingPriceCalculation from "./OrganizationBookingPriceCalculation";

export default {
  name: "OrganizationBooking",
  components: {
    OrganizationBookingPriceCalculation,
    OrganizationBookingBandSelection,
    RehearsalTimeInput,
  },
  props: {
    organizationId: {
      type: [Number, String],
      required: true,
    },
    withBandSelection: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      time: {
        from: null,
        to: null,
      },
      price: null,
      bandId: null,
    };
  },
  methods: {
    getParamsForBooking() {
      let params = {
        organization_id: this.organizationId,
        starts_at: this.time.from,
        ends_at: this.time.to,
      };
      if (this.bandId) {
        params.band_id = this.bandId;
      }
      return params;
    },
    bookRehearsal() {
      this.$authorize(() => {
        this.$http
          .post("rehearsals", this.getParamsForBooking())
          .then(() => {
            this.$snackbar("Репетиция успешно забронирована");
            this.$emit("rehearsalAdded", this.getParamsForBooking());
            this.resetParams();
          })
          .catch((error) => {
            if (error.response.status === 401) {
              this.$snackbar("Действие не ваторизовано", "error");
            }
            if (error.response.status === 422) {
              this.$snackbar(
                "Ошибка. Попробуйте выбрать другое время",
                "error"
              );
            }
          });
      });
    },
    resetParams() {
      this.time = {
        from: null,
        to: null,
      };
      this.bandId = null;
      this.price = null;
    },
  },
};
</script>
