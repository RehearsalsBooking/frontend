<template>
  <v-container class="mt-4">
    <v-row>
      <v-col cols="12">
        <BandInvitesAdd :bandId="id" @inviteAdded="getInvites" />
      </v-col>
    </v-row>
    <v-row align="start" style="min-height: 200px">
      <v-fade-transition mode="out-in">
        <v-col cols="8" v-if="isFetching" key="invites-loading">
          <v-skeleton-loader
            v-for="n in 3"
            :key="n"
            transition="fade"
            type="list-item-three-line"
          ></v-skeleton-loader>
        </v-col>

        <v-col cols="8" v-else-if="invites.length > 0" key="invites-loaded">
          <v-row>
            <v-list three-line>
              <v-list-item
                v-for="invite in invites"
                :key="invite.id"
                :class="getInviteStatusColor(invite.status)"
              >
                <v-list-item-content>
                  <v-list-item-title>{{ invite.email }}</v-list-item-title>
                  <v-list-item-subtitle>{{ invite.role }}</v-list-item-subtitle>
                  <v-list-item-subtitle>
                    Приглашение отправлено
                    {{ invite.invited_at | formatDate }}
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <BandInviteCancel
                    :invite="invite"
                    :bandId="id"
                    @inviteCanceled="getInvites"
                  />
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-row>
        </v-col>

        <v-col cols="8" v-else key="invites-none">
          <v-row>
            <v-col cols="12" class="text-center">Не найдено</v-col>
          </v-row>
        </v-col>
      </v-fade-transition>

      <v-col cols="4">
        <BandInvitesFilters @filtersChanged="filtersChanged" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import BandInvitesFilters from "@/components/bands/BandInvitesFilters";
import BandInvitesAdd from "@/components/bands/BandInvitesAdd";
import BandInviteCancel from "@/components/bands/BandInviteCancel";
import constants from "@/constants";

export default {
  name: "BandInvites",
  components: { BandInviteCancel, BandInvitesFilters, BandInvitesAdd },
  props: {
    id: [String, Number],
  },
  data() {
    return {
      invites: [],
      isFetching: true,
      filters: { status: [constants.INVITE_STATUS_PENDING] },
    };
  },
  mounted() {
    this.getInvites();
  },
  methods: {
    getInvites() {
      this.isFetching = true;
      this.$http
        .get(`/bands/${this.id}/invites`, { params: this.filters })
        .then((res) => {
          this.invites = res.data.data;
          document.title = `Приглашения`;
        })
        .finally(() => (this.isFetching = false));
    },
    filtersChanged(filters) {
      this.filters = filters;
      this.getInvites();
    },
    getInviteStatusColor(status) {
      switch (status) {
        case constants.INVITE_STATUS_PENDING:
          return "yellow lighten-5";
        case constants.INVITE_STATUS_ACCEPTED:
          return "green lighten-5";
        case constants.INVITE_STATUS_REJECTED:
          return "red lighten-5";
      }
    },
  },
};
</script>
