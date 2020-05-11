<template>
  <v-row class="justify-space-around">
    <v-col cols="4">
      <v-card class="px-4">
        <v-card-title> <div class="mx-auto">Выберите время</div></v-card-title>
        <v-card-text>
          <RehearsalTimeInput :period.sync="time" @change="calculatePrice" />
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="4" v-if="userBands.length > 0">
      <v-card class="px-4">
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
            v-model="bandId"
          />
        </v-fade-transition> </v-card
    ></v-col>
    <v-col cols="4" class="d-flex flex-column align-center ">
      <v-card height="100%" class="d-flex flex-column justify-lg-space-between">
        <v-card-title>
          <div class="mx-auto">Репетиция будет стоить</div>
        </v-card-title>
        <v-card-text>
          <div class="text-center display-3 text--primary" v-if="price">
            {{ price }} руб
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
      </v-card></v-col
    >
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
      onBehalfOfBand: false
    };
  },
  computed: {
    userBands() {
      if (!this.$auth.user().bands) {
        return [];
      }
      return this.$auth.user().bands.filter(band => band.is_admin);
    }
  },
  methods: {
    calculatePrice() {
      if (this.time.from && this.time.to) {
        this.price = this.getPrice();
        return;
      }
      this.price = null;
    },
    getPrice() {
      return Math.floor(Math.random() * 10000);
    },
    bookRehearsal() {
      this.$authorize(() => {
        this.loading = true;
        this.$http
          .post("rehearsals", {
            organization_id: this.organization.id,
            starts_at: this.time.from,
            ends_at: this.time.to
          })
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

<style scoped></style>
