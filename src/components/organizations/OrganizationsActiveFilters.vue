<template>
  <v-row v-if="isFiltersActive">
    <v-col>
      Примененные фильтры:
      <v-chip v-if="isFilteredByName" class="ma-2" color="secondary" outlined>
        Название содержит "{{ filters.name }}"
      </v-chip>
      <v-chip
        v-if="isFilteredByAvailableTime"
        class="ma-2"
        color="secondary"
        outlined
      >
        Со свободным временем {{ date }} c {{ fromTime }} до {{ toTime }}
      </v-chip>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "OrganizationsActiveFilters",
  props: {
    filters: Object,
  },
  computed: {
    isFiltersActive() {
      return Object.keys(this.filters).length > 0;
    },
    isFilteredByName() {
      return this.filters.name && this.filters.name !== "";
    },
    isFilteredByAvailableTime() {
      return this.filters.from && this.filters.to;
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
  },
};
</script>
