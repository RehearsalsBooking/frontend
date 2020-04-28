<template>
  <v-layout align-center justify-center>
    <v-row align="start">
      <v-scroll-y-reverse-transition appear mode="out-in">
        <v-col cols="8" v-if="isFetching" key="organizations-loading">
          <v-row>
            <v-col cols="3" v-for="n in 8" :key="n">
              <v-card max-width="344" class="mx-auto">
                <v-skeleton-loader
                  transition="fade"
                  type="card"
                ></v-skeleton-loader>
              </v-card>
            </v-col>
          </v-row>
        </v-col>

        <v-col
          cols="8"
          v-else-if="organizations.length > 0"
          key="organizations-loaded"
        >
          <v-row>
            <v-col
              cols="3"
              v-for="organization in organizations"
              :key="organization.id"
            >
              <Organization :organization="organization"></Organization>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="8" v-else key="organizations-none">
          <v-row>
            <v-col cols="12" class="text-center">Не найдено</v-col>
          </v-row>
        </v-col>
      </v-scroll-y-reverse-transition>

      <v-col cols="4">
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
              @keypress.enter="getOrganizations"
            />
          </v-card-text>
          <v-card-actions>
            <v-btn
              width="100%"
              color="primary"
              rounded
              @click="getOrganizations"
              :loading="isFetching"
              >Применить</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
import Organization from "./Organization";

export default {
  name: "Organizations",
  components: { Organization },
  data() {
    return {
      organizations: [],
      isFetching: true,
      name: this.name || ""
    };
  },
  url: {
    name: "name"
  },
  mounted() {
    this.getOrganizations();
  },
  methods: {
    getFilters() {
      return Object.assign({}, this.name && { name: this.name });
    },
    getOrganizations() {
      this.isFetching = true;
      this.$http
        .get("/organizations", {
          params: this.getFilters()
        })
        .then(res => {
          this.organizations = res.data.data;
        })
        .finally(() => (this.isFetching = false));
    },
    emptyNameQuery() {
      this.name = null;
      this.getOrganizations();
    }
  }
};
</script>

<style scoped></style>
