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
  </v-card>
</template>
<script>
import RehearsalTimeInput from "../common/RehearsalTimeInput";

export default {
  name: "OrganizationsFilter",
  components: { RehearsalTimeInput },
  props: {
    isFetching: Boolean
  },
  data() {
    return {
      name: this.name || "",
      favorite: false,
      errorMessage: null,
      availableTime: this.availableTime || {
        from: null,
        to: null
      }
    };
  },
  url: {
    name: "name",
    availableTime: "available_time"
  },
  mounted() {
    this.sendFilters();
  },
  methods: {
    sendFilters() {
      this.errorMessage = null;
      let filters = Object.assign(
        {},
        this.name && { name: this.name },
        this.availableTime.from && { from: this.availableTime.from },
        this.availableTime.to && { to: this.availableTime.to },
        this.favorite && { favorite: "1" }
      );
      this.$emit("filtersChanged", filters);
    },

    emptyNameQuery() {
      this.name = null;
      this.sendFilters();
    }
  }
};
</script>
