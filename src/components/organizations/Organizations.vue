<template>
  <v-layout align-center justify-center>
    <v-scroll-y-reverse-transition appear mode="out-in">
      <v-row align="center" v-if="isFetching" key="row-loading">
        <v-col cols="3" v-for="n in 6" :key="n">
          <v-card max-width="344" class="mx-auto">
            <v-skeleton-loader
              transition="fade"
              type="card"
            ></v-skeleton-loader>
          </v-card>
        </v-col>
      </v-row>

      <v-row align="start" v-else key="row-loaded">
        <v-col
          cols="3"
          v-for="organization in organizations"
          :key="organization.id"
        >
          <Organization :organization="organization"></Organization>
        </v-col>
      </v-row>
    </v-scroll-y-reverse-transition>
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
      isFetching: true
    };
  },
  mounted() {
    this.getOrganizations();
  },
  methods: {
    getOrganizations() {
      this.$http
        .get("/organizations")
        .then(res => {
          this.organizations = res.data.data;
        })
        .finally(() => (this.isFetching = false));
    }
  }
};
</script>

<style scoped></style>
