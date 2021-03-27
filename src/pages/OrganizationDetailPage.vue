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

      <div class="display-1 text-center mt-3 text-uppercase">Расписание</div>
      <v-divider class="mb-1"></v-divider>
      <OrganizationTimetable
        id="timetable"
        ref="timetable"
        :organization="organization"
      />

      <div class="display-1 text-center mt-3 text-uppercase">
        Забронировать репетицию
      </div>
      <v-divider class="mb-1"></v-divider>
      <OrganizationBooking
        :organization="organization"
        @rehearsalAdded="rehearsalAdded"
      />

      <div class="display-1 text-center mt-3 text-uppercase">Контакты</div>
      <v-divider class="mb-1"></v-divider>
      <OrganizationContacts :organization="organization" />
    </v-container>
  </v-fade-transition>
</template>

<script>
import OrganizationFavoriteIndicator from "../components/organizations/OrganizationFavoriteIndicator";
import OrganizationPrices from "../components/organizations/OrganizationPrices";
import OrganizationContacts from "../components/organizations/OrganizationContacts";
import OrganizationTimetable from "../components/organizations/OrganizationTimetable";
import OrganizationBooking from "../components/organizations/OrganizationBooking";

export default {
  name: "OrganizationDetailPage",
  components: {
    OrganizationContacts,
    OrganizationFavoriteIndicator,
    OrganizationPrices,
    OrganizationTimetable,
    OrganizationBooking,
  },
  props: {
    id: [String, Number],
  },
  data() {
    return {
      isFetching: true,
      organization: null,
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
        .then((res) => {
          this.organization = res.data.data;
          document.title = `Организации | ${this.organization.name}`;
        })
        .finally(() => {
          this.isFetching = false;
        });
    },
    rehearsalAdded(rehearsalParams) {
      this.scrollToCalendar();
      this.$refs.timetable.setFocus(rehearsalParams.starts_at.split(" ")[0]);
    },
    scrollToCalendar() {
      this.$vuetify.goTo("#timetable", {
        duration: 650,
        offset: 0,
        easing: "easeOutCubic",
      });
    },
  },
};
</script>
