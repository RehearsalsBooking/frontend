<template>
  <v-card>
    <v-card-title>
      <div class="text-center" style="width: 100%">Добавить цену</div>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col md="4" cols="12">
          <v-select
            label="День недели"
            v-model="dayOfWeek"
            :items="daysOfWeek"
            item-value="id"
            item-text="name"
          />
        </v-col>
        <v-col md="4" cols="12">
          <TimeIntervalInput v-model="time" />
        </v-col>
        <v-col md="4" cols="12">
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
import TimeIntervalInput from "@/pages/management/TimeIntervalInput";
import { EventBus } from "@/event-bus";

export default {
  name: "AddPrice",
  components: { TimeIntervalInput },
  props: {
    organizationId: [Number, String],
  },
  data() {
    return {
      time: {
        from: "",
        to: "",
      },
      price: null,
      dayOfWeek: null,
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

  methods: {
    addPrice() {
      this.$http
        .post(`management/organizations/${this.organizationId}/prices`, {
          day: this.dayOfWeek,
          price: this.price,
          starts_at: this.time.from,
          ends_at: this.time.to,
        })
        .then(() => {
          this.$snackbar("Цена успешно добавлена", "success");
          EventBus.$emit("prices-changed");
        })
        .catch((err) => {
          this.$snackbar(err.response.data.message, "error");
        });
    },
  },
};
</script>
