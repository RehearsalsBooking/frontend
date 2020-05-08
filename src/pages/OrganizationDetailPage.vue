<template>
  <v-fade-transition group mode="out-in">
    <v-container fluid v-if="isFetching" key="fetching">
      <v-row>
        <v-progress-circular indeterminate color="primary" class="mx-auto" />
      </v-row>
    </v-container>
    <v-container fluid v-else key="fetched">
      <v-row>
        <v-col cols="4">
          <!--suppress HtmlUnknownTarget -->
          <v-img :src="organization.avatar" />
        </v-col>
        <v-col cols="6">
          <div class="display-2 mb-3 text-uppercase d-flex">
            {{ organization.name }}
            <OrganizationFavoriteIndicator
              class="ml-2"
              :organization="organization"
              inline
            ></OrganizationFavoriteIndicator>
          </div>
          <organization-prices :prices="organization.prices" class="mb-4" />
          <p>{{ organization.description }}</p>
        </v-col>
      </v-row>
      <div class="display-1 text-center mt-3 text-uppercase">Контакты</div>
      <v-divider></v-divider>
      <v-row class="mt-3">
        <v-col cols="3">
          <div class="text-center mb-2"><b>Мы находимся по адресу</b></div>
          {{ organization.address }}
        </v-col>
        <v-col cols="9" style="background-color: orange;">
          map
          <OrganizationOwner
            :owner="organization.owner"
            style="width: 30%; float:right;"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-fade-transition>
</template>

<script>
import OrganizationFavoriteIndicator from "../components/organizations/OrganizationFavoriteIndicator";
import OrganizationPrices from "../components/organizations/OrganizationPrices";
import OrganizationOwner from "../components/organizations/OrganizationOwner";

export default {
  name: "OrganizationDetailPage",
  components: {
    OrganizationFavoriteIndicator,
    OrganizationPrices,
    OrganizationOwner
  },
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
