<template>
  <v-layout align-center justify-center>
    <v-row align="start">
      <v-fade-transition mode="out-in">
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
          <OrganizationsActiveFilters :filters="activeFilters" />
          <v-row>
            <v-col
              cols="3"
              v-for="organization in organizations"
              :key="organization.id"
            >
              <OrganizationCard :organization="organization" />
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="8" v-else key="organizations-none">
          <OrganizationsActiveFilters :filters="activeFilters" />
          <v-row>
            <v-col cols="12" class="text-center">Не найдено</v-col>
          </v-row>
        </v-col>
      </v-fade-transition>

      <v-col cols="4">
        <OrganizationsFilter
          :is-fetching="isFetching"
          @filtersChanged="getOrganizations"
        />
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
import OrganizationCard from "./OrganizationCard";
import OrganizationsFilter from "./OrganizationsFilter";
import OrganizationsActiveFilters from "./OrganizationsActiveFilters";

export default {
  name: "Organizations",
  components: {
    OrganizationsFilter,
    OrganizationCard,
    OrganizationsActiveFilters,
  },
  data() {
    return {
      organizations: [],
      isFetching: true,
      activeFilters: {},
    };
  },
  mounted() {
    window.getApp.$on("successfulLogin", () => {
      this.getOrganizations();
    });
  },
  methods: {
    getOrganizations(filters) {
      this.isFetching = true;
      this.setActiveFilters(filters);
      this.$http
        .get("/organizations", {
          params: filters,
        })
        .then((res) => {
          this.organizations = res.data.data;
        })
        .finally(() => (this.isFetching = false));
    },
    setActiveFilters(filters) {
      this.activeFilters = filters;
    },
  },
};
</script>
