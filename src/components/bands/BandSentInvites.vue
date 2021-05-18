<template>
  <v-layout align-center justify-center class="mt-4">
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
              <v-list-item v-for="invite in invites" :key="invite.id">
                <v-list-item-content>
                  <v-list-item-title>{{ invite.email }}</v-list-item-title>
                  <v-list-item-subtitle>{{ invite.role }}</v-list-item-subtitle>
                  <v-list-item-subtitle>
                    Приглашение отправлено {{ invite.invited_at | formatDate }}
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn icon @click="cancelInvite(invite)">
                    <v-icon color="error">mdi-delete</v-icon>
                  </v-btn>
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
        <BandSentInvitesFilters @filtersChanged="getInvites" />
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
import BandSentInvitesFilters from "@/components/bands/BandSentInvitesFilters";

export default {
  name: "BandSentInvites",
  components: { BandSentInvitesFilters },
  props: {
    band: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      invites: [],
      isFetching: true,
    };
  },
  mounted() {
    this.getInvites();
  },
  methods: {
    getInvites(filters) {
      this.isFetching = true;
      this.$http
        .get(`/bands/${this.band.id}/invites`, { params: filters })
        .then((res) => (this.invites = res.data.data))
        .finally(() => (this.isFetching = false));
    },
    cancelInvite(invite) {
      this.isFetching = true;
      this.$http
        .delete(`/bands/${this.band.id}/invites/${invite.id}`)
        .then(() => {
          this.invites = this.invites.filter((item) => invite.id !== item.id);
        })
        .finally(() => (this.isFetching = false));
    },
  },
};
</script>
