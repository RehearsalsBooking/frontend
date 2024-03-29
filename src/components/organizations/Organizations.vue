<template>
  <v-layout align-center justify-center>
    <v-row align="start">
      <v-col cols="12" order="first">
        <h2 class="text-center mx-auto">Репетиционные точки</h2>
      </v-col>

      <v-fade-transition mode="out-in">
        <v-col
          md="8"
          sm="12"
          order="3"
          order-md="1"
          v-if="isFetching"
          key="organizations-loading"
        >
          <v-row>
            <v-col lg="3" sm="12" v-for="n in 8" :key="n">
              <v-card width="300" class="mx-auto">
                <v-skeleton-loader
                  transition="fade"
                  type="card"
                ></v-skeleton-loader>
              </v-card>
            </v-col>
          </v-row>
        </v-col>

        <v-col
          lg="8"
          sm="12"
          v-else-if="organizations.length > 0"
          key="organizations-loaded"
          order="3"
          order-md="1"
        >
          <OrganizationsActiveFilters
            :filters="activeFilters"
            :cities="cities"
          />
          <v-row>
            <v-col
              md="4"
              lg="3"
              sm="12"
              xs="12"
              v-for="organization in organizations"
              :key="organization.id"
            >
              <OrganizationCard :organization="organization" />
            </v-col>
          </v-row>
        </v-col>

        <v-col
          lg="8"
          sm="12"
          xs="12"
          order="3"
          order-lg="1"
          v-else
          key="organizations-none"
        >
          <OrganizationsActiveFilters
            :filters="activeFilters"
            :cities="cities"
          />
          <v-row>
            <v-col cols="12" class="text-center">Не найдено</v-col>
          </v-row>
        </v-col>
      </v-fade-transition>

      <v-col
        lg="4"
        xs="12"
        md="12"
        order-sm="first"
        order-lg="last"
        order-md="first"
        style="flex-basis: auto"
      >
        <OrganizationsFilter
          :is-fetching="isFetching"
          @filtersChanged="getOrganizations"
          :cities="cities"
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
      cities: [],
    };
  },
  mounted() {
    this.$http.get("cities").then((res) => (this.cities = res.data.data));
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
