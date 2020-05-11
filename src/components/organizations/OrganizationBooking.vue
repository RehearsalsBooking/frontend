<template>
  <v-row class="justify-space-around">
    <v-col cols="4">
      <v-card class="px-4">
        <v-card-title>
          <div class="mx-auto">Выберите время</div>
        </v-card-title>
        <v-card-text>
          <RehearsalTimeInput :period.sync="time" @change="calculatePrice" />
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="4" v-if="userBands.length > 0">
      <v-card class="px-4" height="100%">
        <v-card-title>
          <div class="mx-auto">Выберите тип репетиции</div>
        </v-card-title>
        <v-radio-group v-model="onBehalfOfBand">
          <v-radio label="Индивидуальная" :value="false" />
          <v-radio label="Групповая" :value="true" />
        </v-radio-group>
        <v-fade-transition>
          <v-select
            v-if="onBehalfOfBand"
            label="Выберите группу"
            :items="userBands"
            item-text="name"
            item-value="id"
            v-model="bandId"
          />
        </v-fade-transition>
      </v-card>
    </v-col>
    <v-col cols="4" class="d-flex flex-column align-center ">
      <v-card
        height="100%"
        width="100%"
        class="d-flex flex-column justify-lg-space-between"
      >
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

export default {
  name: "OrganizationBooking",
  components: { RehearsalTimeInput },
  props: {
    organization: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      time: {
        from: null,
        to: null
      },
      price: null,
      bandId: null,
      onBehalfOfBand: false,
      priceErrorMessage: ""
    };
  },
  computed: {
    userBands() {
      if (!this.$auth.check() || !this.$auth.user().bands) {
        return [];
      }
      return this.$auth.user().bands.filter(band => band.is_admin);
    }
  },
  watch: {
    onBehalfOfBand(value) {
      if (value) {
        if (this.userBands.length === 1) {
          this.bandId = this.userBands[0].id;
        }
      } else {
        this.bandId = null;
      }
    }
  },
  methods: {
    calculatePrice() {
      if (!(this.time.from && this.time.to)) {
        this.price = null;
        return;
      }

      this.$http
        .get(`organizations/${this.organization.id}/price`, {
          params: {
            starts_at: this.time.from,
            ends_at: this.time.to
          }
        })
        .then(res => {
          this.price = res.data;
          this.priceErrorMessage = "";
        })
        .catch(err => {
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
    getParamsForBooking() {
      let params = {
        organization_id: this.organization.id,
        starts_at: this.time.from,
        ends_at: this.time.to
      };
      if (this.onBehalfOfBand && this.bandId) {
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
          })
          .catch(error => {
            console.log(error.response);
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
    }
  }
};
</script>
