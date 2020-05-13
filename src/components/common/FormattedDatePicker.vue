<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        v-model="dateFormatted"
        :label="label"
        prepend-icon="mdi-calendar"
        readonly
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker :value="value" :min="min" :max="max" @input="dateChosen" />
  </v-menu>
</template>

<script>
export default {
  name: "FormattedDatePicker",
  props: {
    value: String,
    min: String,
    max: String,
    label: String
  },
  data() {
    return {
      menu: false
    };
  },
  methods: {
    dateChosen(value) {
      this.$emit("input", value);
      this.$emit("change");
      this.menu = false;
    }
  },
  computed: {
    dateFormatted() {
      if (!this.value) return null;

      const [year, month, day] = this.value.split("-");
      return `${day}.${month}.${year}`;
    }
  }
};
</script>

<style scoped></style>
