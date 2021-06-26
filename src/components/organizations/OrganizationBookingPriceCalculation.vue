<template>
  <div>
    <v-card-title>
      <div class="mx-auto">Репетиция будет стоить</div>
    </v-card-title>
    <v-card-text>
      <div class="text-center display-3 text--primary" v-if="price">
        {{ price }} руб
      </div>
      <div class="text-center error--text" v-else-if="priceErrorMessage">
        {{ priceErrorMessage }}
      </div>
      <div class="text-center" v-else>
        Выберите время, чтобы рассчитать стоимость
      </div>
    </v-card-text>
  </div>
</template>
<script>
export default {
  name: "OrganizationBookingPriceCalculation",
  props: {
    price: Number,
    time: Object,
    organizationId: [Number, String],
  },
  data() {
    return {
      priceErrorMessage: "",
    };
  },
  watch: {
    time() {
      this.calculatePrice();
    },
  },
  methods: {
    calculatePrice() {
      if (!(this.time.from && this.time.to)) {
        this.$emit("update:price", null);
        this.priceErrorMessage = "";
        return;
      }

      this.$http
        .get(`organizations/${this.organizationId}/price`, {
          params: {
            starts_at: this.time.from,
            ends_at: this.time.to,
          },
        })
        .then((res) => {
          this.$emit("update:price", res.data);
          this.priceErrorMessage = "";
        })
        .catch((err) => {
          this.$emit("update:price", null);
          if (err.response.status === 422) {
            if (typeof err.response.data === "string") {
              this.priceErrorMessage = err.response.data;
            } else {
              this.priceErrorMessage =
                "Не удалось посчитать стоимость. Выберите другое время";
            }
          }
        });
    },
  },
};
</script>
