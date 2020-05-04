<template>
  <v-container fluid>
    <v-fade-transition mode="out-in">
      <v-row v-if="isFetching" key="fetching">
        <v-progress-circular indeterminate color="primary" class="mx-auto" />
      </v-row>
      <v-row v-else key="fetched">
        <v-col cols="4">
          <!--suppress HtmlUnknownTarget -->
          <v-img :src="organization.avatar" />
        </v-col>
        <v-col cols="8">
          <div class="display-2 mb-3 text-uppercase d-flex">
            {{ organization.name }}
            <FavoriteIndicator
              class="ml-2"
              :organization="organization"
              inline
            ></FavoriteIndicator>
          </div>
          <p>{{ organization.description }}</p>
        </v-col>
      </v-row>
    </v-fade-transition>
  </v-container>
</template>

<script>
import FavoriteIndicator from "../components/organizations/FavoriteIndicator";

export default {
  name: "OrganizationsPage",
  components: { FavoriteIndicator },
  props: {
    id: [String, Number]
  },
  data() {
    return {
      isFetching: true,
      organization: null
    };
  },
  mounted() {
    this.getOrganization();
  },
  methods: {
    getOrganization() {
      this.isFetching = true;
      this.$http
        .get(`/organizations/${this.id}`)
        .then(res => {
          this.organization = res.data.data;
          document.title = `Организации | ${this.organization.name}`;
        })
        .finally(() => {
          this.isFetching = false;
        });
    }
  }
};
</script>

<style scoped></style>
