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
    </v-card-text>
    <v-card-actions>
      <v-btn
        width="100%"
        color="primary"
        rounded
        @click="sendFilters"
        :loading="isFetching"
        >Применить
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  name: "OrganizationsFilter",
  props: {
    isFetching: {}
  },
  data() {
    return {
      name: this.name || ""
    };
  },
  url: {
    name: "name"
  },
  mounted() {
    this.sendFilters();
  },
  methods: {
    sendFilters() {
      let filters = Object.assign({}, this.name && { name: this.name });
      this.$emit("filtersChanged", filters);
    },

    emptyNameQuery() {
      this.name = null;
      this.sendFilters();
    }
  }
};
</script>
