<template>
  <v-card>
    <v-card-title>
      <div class="text-center" style="width: 100%">Добавить цену</div>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="4">
          <v-select
            label="День недели"
            v-model="dayOfWeek"
            :items="daysOfWeek"
            item-value="id"
            item-text="name"
          />
        </v-col>
        <v-col cols="4">
          <vue-timepicker
            minute-interval="30"
            v-model="fromTime"
            close-on-complete
            auto-scroll
            placeholder="Начало"
          />
          <vue-timepicker
            inputClass="skip-error-style"
            minute-interval="30"
            placeholder="Конец"
            v-model="toTime"
            close-on-complete
            auto-scroll
            hide-disabled-hours
            :disabled="isFromTimeEmpty || tillTheEndOfDay"
            :hour-range="availableToHours"
          />
          <v-checkbox
            label="До конца дня"
            v-model="tillTheEndOfDay"
            dense
            hide-details
            :disabled="isFromTimeEmpty"
            class="mt-1"
          />
        </v-col>
        <v-col cols="4">
          <v-text-field type="number" label="Цена за час" v-model="price" />
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn color="success" block rounded @click="addPrice">Добавить</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import VueTimepicker from "vue2-timepicker/src/vue-timepicker.vue";

export default {
  name: "AddPrice",
  components: { VueTimepicker },
  props: {
    organizationId: [Number, String],
  },
  data() {
    return {
      fromTime: {
        HH: null,
        mm: null,
      },
      toTime: {
        HH: null,
        mm: null,
      },
      price: null,
      dayOfWeek: null,
      availableToHours: [],
      tillTheEndOfDay: false,
      daysOfWeek: [
        {
          id: 0,
          name: "Понедельник",
        },
        {
          id: 1,
          name: "Вторник",
        },
        {
          id: 2,
          name: "Среда",
        },
        {
          id: 3,
          name: "Четверг",
        },
        {
          id: 4,
          name: "Пятница",
        },
        {
          id: 5,
          name: "Суббота",
        },
        {
          id: 6,
          name: "Воскресенье",
        },
      ],
    };
  },
  computed: {
    isFromTimeEmpty() {
      return this.isTimeObjectEmpty(this.fromTime);
    },
    toTimeIsBeforeFromTime() {
      if (this.toTime.HH < this.fromTime.HH) {
        return true;
      }
      if (this.toTime.HH === this.fromTime.HH) {
        return this.toTime.mm < this.fromTime.mm;
      }
      return false;
    },
  },
  mounted() {
    if (this.toTimeIsBeforeFromTime) {
      this.toTime = {
        HH: null,
        mm: null,
      };
      this.reset();
    }
    if (this.toTime.HH === "23" && this.toTime.mm === "59") {
      this.tillTheEndOfDay = true;
    }
  },
  watch: {
    tillTheEndOfDay(value) {
      if (value) {
        this.toTime = {
          HH: "23",
          mm: "59",
        };
      } else {
        this.toTime = {
          HH: null,
          mm: null,
        };
        this.availableToHours = this.generateAvailableHours(
          this.getMinimumHourForToTime()
        );
      }
    },
    fromTime: {
      deep: true,
      handler: function () {
        this.availableToHours = this.generateAvailableHours(
          this.getMinimumHourForToTime()
        );
      },
    },
  },
  methods: {
    generateAvailableHours(min) {
      let availableHours = [];

      for (let i = min; i < 24; i++) {
        availableHours.push(i);
      }

      return availableHours;
    },
    getMinimumHourForToTime() {
      let fromH = parseInt(this.fromTime.HH);

      if (this.fromTime.mm === "00") {
        return fromH;
      }

      return fromH + 1;
    },
    isTimeObjectEmpty(time) {
      return !(parseInt(time.HH) >= 0 && parseInt(time.mm) >= 0);
    },
    timeToString(time) {
      return `${time.HH}:${time.mm}`;
    },

    addPrice() {
      this.$http
        .post(`management/organizations/${this.organizationId}/prices`, {
          day: this.dayOfWeek,
          price: this.price,
          starts_at: this.timeToString(this.fromTime),
          ends_at: this.timeToString(this.toTime),
        })
        .then(() => {
          this.$snackbar("Цена успешно добавлена", "success");
          this.$emit("prices-updated");
        })
        .catch((err) => {
          this.$snackbar(err.response.data.message, "error");
        });
    },
  },
};
</script>
