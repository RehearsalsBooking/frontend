<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        :value="value"
        :label="label"
        prepend-icon="mdi-clock-outline"
        readonly
        :error-messages="errorMessage"
        v-on="on"
      ></v-text-field>
    </template>
    <v-time-picker
      v-if="menu"
      :value="value"
      :min="min"
      :max="max"
      :allowed-minutes="[0, 30]"
      format="24hr"
      @input="timeChosen"
      full-width
    ></v-time-picker>
  </v-menu>
</template>

<script>
export default {
  name: "TimePicker",
  props: {
    value: String,
    min: String,
    max: String,
    label: String,
    errorMessage: String
  },
  data() {
    return {
      menu: false
    };
  },
  methods: {
    timeChosen(value) {
      this.menu = false;
      this.$emit("input", value);
    }
  }
};
</script>

<style scoped></style>
