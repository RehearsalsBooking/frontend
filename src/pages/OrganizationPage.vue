<template>
  <v-fade-transition mode="out-in">
    <v-container fluid v-if="isFetching" key="fetching">
      <v-row>
        <v-progress-circular indeterminate color="primary" class="mx-auto" />
      </v-row>
    </v-container>
    <v-container fluid v-else key="fetched">
      <v-row min-height="300">
        <v-col xs="12" lg="4">
          <ImageWithPlaceholder
            :src="organization.avatar.original"
            height="300"
            contain
          />
        </v-col>
        <v-col xs="12" lg="6">
          <div class="display-2 mb-3 text-uppercase d-flex">
            {{ organization.name }}
            <OrganizationFavoriteIndicator
              class="ml-2"
              :organization="organization"
              inline
            />
          </div>
          <OrganizationPrices
            :organization="organization"
            class="mb-4 d-xs-block"
          />
          <div v-html="organization.gear"></div>
        </v-col>
      </v-row>

      <div class="display-1 text-center mt-3 text-uppercase">Расписание</div>
      <v-divider class="mb-6"></v-divider>
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
        :organizationId="organization.id"
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
import ImageWithPlaceholder from "@/pages/ImageWithPlaceholder";

export default {
  name: "OrganizationPage",
  components: {
    ImageWithPlaceholder,
    OrganizationContacts,
    OrganizationFavoriteIndicator,
    OrganizationPrices,
    OrganizationTimetable,
    OrganizationBooking,
  },
  props: {
    id: [Number, String],
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
