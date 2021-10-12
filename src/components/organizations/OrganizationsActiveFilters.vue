<template>
  <v-row v-if="isFiltersActive">
    <v-col>
      <div class="mb-3">Примененные фильтры:</div>
      <v-chip v-if="isFilteredByName" class="ma-2" color="secondary" outlined>
        Название содержит "{{ filters.name }}"
      </v-chip>
      <v-chip v-if="isFilteredByCity" class="ma-2" color="secondary" outlined>
        город "{{ cityName }}"
      </v-chip>
      <v-chip
        v-if="isFilteredByFavorite"
        class="mx-2"
        color="secondary"
        outlined
      >
        Только среди любимых
      </v-chip>
      <v-chip
        v-if="isFilteredByAvailableTime"
        class="ma-2"
        color="secondary"
        outlined
      >
        Свободно {{ date }} c {{ fromTime }} до {{ toTime }}
      </v-chip>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "OrganizationsActiveFilters",
  props: {
    filters: Object,
    cities: Array,
  },
  computed: {
    isFiltersActive() {
      return this.filters && Object.keys(this.filters).length > 0;
    },
    isFilteredByName() {
      return this.filters.name && this.filters.name !== "";
    },
    isFilteredByFavorite() {
      return this.filters.favorite;
    },
    isFilteredByAvailableTime() {
      return this.filters.from && this.filters.to;
    },
    isFilteredByCity() {
      return !!this.filters.city_id;
    },
    date() {
      const [year, month, day] = this.filters.from.split(" ")[0].split("-");
      return `${day}.${month}.${year}`;
    },
    fromTime() {
      return this.filters.from.split(" ")[1];
    },
    toTime() {
      return this.filters.to.split(" ")[1];
    },
    cityName() {
      return this.cities.find((city) => city.id === this.filters.city_id)?.name;
    },
  },
};
</script>
