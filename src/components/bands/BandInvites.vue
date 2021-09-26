<template>
  <v-container class="mt-4">
    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title class="justify-center pb-0">
            Пригласить в группу
          </v-card-title>
          <BandInvitesAdd :bandId="id" @inviteAdded="getInvites" />
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title class="justify-center">
            Отправленные приглашения
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col>
                <BandInvitesFilters @filtersChanged="filtersChanged" />
              </v-col>
            </v-row>
            <v-fade-transition mode="out-in">
              <v-row>
                <v-col v-if="isFetching" key="invites-loading">
                  <v-skeleton-loader
                    v-for="n in 3"
                    :key="n"
                    transition="fade"
                    type="list-item-three-line"
                  ></v-skeleton-loader>
                </v-col>

                <v-col v-else-if="invites.length > 0" key="invites-loaded">
                  <v-list three-line>
                    <v-list-item
                      v-for="invite in invites"
                      :key="invite.id"
                      :class="getInviteStatusColor(invite.status)"
                    >
                      <v-list-item-content>
                        <v-list-item-title
                          >{{ invite.email }}
                        </v-list-item-title>
                        <v-list-item-subtitle>
                          {{ invite.roles.join(", ") }}
                        </v-list-item-subtitle>
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
                </v-col>

                <v-col v-else key="invites-none">
                  <v-row>
                    <v-col class="text-center">Не найдено</v-col>
                  </v-row>
                </v-col>
              </v-row></v-fade-transition
            >
          </v-card-text></v-card
        ></v-col
      >
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
