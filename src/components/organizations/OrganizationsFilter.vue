<template>
  <v-card class="pa-2" min-width="100%" width="100%">
    <v-card-title
      class="text-center"
      @click="show = !show"
      style="cursor: pointer; word-break: keep-all"
    >
      <div class="text-center mx-auto">Фильтры</div>
      <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
    </v-card-title>
    <v-expand-transition mode="in-out">
      <v-card-text v-if="show" class="py-0">
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
        <RehearsalTimeInput
          :period.sync="availableTime"
          @change="sendFilters"
        />
      </v-card-text>
    </v-expand-transition>
    <v-card-actions class="mt-3">
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
      show: this.$vuetify.breakpoint.mdAndUp,
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
