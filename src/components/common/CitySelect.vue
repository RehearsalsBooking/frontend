<template>
  <v-select
    :loading="isLoading"
    :items="cities"
    :value="value"
    @input="$emit('input', $event)"
    item-text="name"
    item-value="id"
    label="Город"
  />
</template>

<script>
export default {
  name: "CitySelect",
  props: { value: [Number, String] },
  data() {
    return {
      cities: [],
      isLoading: true,
    };
  },
  mounted() {
    this.getCities();
  },
  methods: {
    getCities() {
      this.isLoading = true;
      this.$http
        .get("cities")
        .then((res) => (this.cities = res.data.data))
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>
