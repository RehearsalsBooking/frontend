<template>
  <v-card class="pa-2">
    <v-card-title class="text-center">
      <div class="text-center mx-auto">Фильтры</div>
    </v-card-title>
    <v-card-text>
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
      <TimeStampPeriod v-model="from" :max="to" label="Начало" />
      <TimeStampPeriod v-model="to" :min="from" label="Конец" />
    </v-card-text>
  </v-card>
</template>
<script>
import TimeStampPeriod from "./TimeStampPeriod";

export default {
  name: "OrganizationsFilter",
  components: { TimeStampPeriod },
  props: {
    isFetching: Boolean
  },
  data() {
    return {
      name: this.name || "",
      from: this.from || "",
      to: this.to || ""
    };
  },
  url: {
    name: "name",
    from: "from",
    to: "to"
  },
  mounted() {
    this.sendFilters();
  },
  methods: {
    sendFilters() {
      let filters = Object.assign(
        {},
        this.name && { name: this.name },
        this.from && { from: this.from },
        this.to && { to: this.to }
      );
      this.$emit("filtersChanged", filters);
    },

    emptyNameQuery() {
      this.name = null;
      this.sendFilters();
    }
  },
  watch: {
    from() {
      this.sendFilters();
    },
    to() {
      this.sendFilters();
    }
  }
};
</script>
