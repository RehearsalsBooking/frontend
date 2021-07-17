<template>
  <v-card v-bind="$attrs">
    <v-card-title>Редактировать цену</v-card-title>
    <v-card-text>
      <v-text-field type="number" label="Цена за час" v-model="newPrice" />
    </v-card-text>
    <v-card-actions>
      <div style="width: 100%">
        <v-btn color="success" class="mb-2" block rounded @click="savePrice">
          Сохранить
        </v-btn>
        <v-btn color="error" block rounded @click="deletePrice">
          Удалить цену
        </v-btn>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script>
import { EventBus } from "@/event-bus";

export default {
  name: "PriceEditCard",
  props: {
    price: Object,
    organizationId: [Number, String],
  },
  data() {
    return {
      newPrice: null,
    };
  },
  watch: {
    price(val) {
      this.newPrice = val.price;
    },
  },
  mounted() {
    this.newPrice = this.price.price;
  },
  methods: {
    savePrice() {
      this.$http
        .put(
          `/management/organizations/${this.organizationId}/prices/${this.price.id}`,
          {
            price: this.newPrice,
          }
        )
        .then(() => {
          this.$snackbar("Цена успешно обновлена", "success");
          EventBus.$emit("prices-changed");
        })
        .catch((err) => {
          this.$snackbar(err.response.data.message, "error");
        });
    },
    deletePrice() {
      this.$http
        .delete(
          `/management/organizations/${this.organizationId}/prices/${this.price.id}`
        )
        .then(() => {
          this.$snackbar("Цена успешно удалена", "success");
          EventBus.$emit("prices-changed");
        })
        .catch((err) => {
          this.$snackbar(err.response.data.message, "error");
        });
    },
  },
};
</script>
