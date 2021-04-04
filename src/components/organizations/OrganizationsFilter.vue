<template>
  <v-card class="pa-2">
    <v-card-title class="text-center">
      <div class="text-center mx-auto">Фильтры</div>
    </v-card-title>
    <v-card-text>
      <v-checkbox
        v-if="$auth.check()"
        @change="sendFilters"
        v-model="favorite"
        label="Только среди любимых"
      />
      <v-text-field
        label="Поиск по названию"
        v-model="name"
        clearable
        @click:clear="emptyNameQuery"
        @keypress.enter="sendFilters"
      />
      <v-card-title class="text-center">
        <div class="text-center mx-auto">Со свободным временем</div>
      </v-card-title>
      <RehearsalTimeInput :period.sync="availableTime" @change="sendFilters" />
    </v-card-text>
    <v-card-actions>
      <v-btn
        v-if="isAnyFiltersSelected"
        color="secondary"
        rounded
        block
        @click="resetFilters"
        >Сбросить фильтры</v-btn
      >
    </v-card-actions>
  </v-card>
</template>
<script>
import RehearsalTimeInput from "../common/RehearsalTimeInput";

export default {
  name: "OrganizationsFilter",
  components: { RehearsalTimeInput },
  props: {
    isFetching: Boolean,
  },
  data() {
    return {
      name: this.name || "",
      favorite: false,
      availableTime: this.availableTime || {
        from: null,
        to: null,
      },
      isAnyFiltersSelected: false,
    };
  },
  url: {
    name: "name",
    availableTime: "available_time",
    favorite: "favorite",
  },
  mounted() {
    this.sendFilters();
  },
  methods: {
    sendFilters() {
      let filters = Object.assign(
        {},
        this.name && { name: this.name },
        this.favorite && { favorite: "1" }
      );
      if (this.availableTime) {
        Object.assign(
          filters,
          this.availableTime.from && { from: this.availableTime.from },
          this.availableTime.to && { to: this.availableTime.to }
        );
      }
      this.isAnyFiltersSelected = Object.keys(filters).length > 0;
      this.$emit("filtersChanged", filters);
    },
    resetFilters() {
      this.name = "";
      this.availableTime = {
        from: null,
        to: null,
      };
      this.$router.push({ query: {} });
      this.sendFilters();
    },
    emptyNameQuery() {
      this.name = null;
      this.sendFilters();
    },
  },
};
</script>
