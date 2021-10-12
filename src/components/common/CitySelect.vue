<template>
  <v-select
    :loading="isLoading"
    :items="availableCities"
    :value="value"
    @input="$emit('input', $event)"
    @change="$emit('change', $event)"
    item-text="name"
    item-value="id"
    label="Город"
  />
</template>

<script>
export default {
  name: "CitySelect",
  props: { value: [Number, String], cities: Array },
  data() {
    return {
      fetchedCities: [],
      isLoading: false,
    };
  },
  mounted() {
    if (!this.cities) {
      this.getCities();
    }
  },
  computed: {
    availableCities() {
      return this.cities || this.fetchedCities;
    },
  },
  methods: {
    getCities() {
      this.isLoading = true;
      this.$http
        .get("cities")
        .then((res) => (this.fetchedCities = res.data.data))
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>
