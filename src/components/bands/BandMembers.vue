<template>
  <v-fade-transition mode="out-in">
    <v-list v-if="isFetching" key="invites-loading">
      <v-skeleton-loader
        v-for="n in 3"
        :key="n"
        transition="fade"
        type="list-item-three-line"
      ></v-skeleton-loader>
    </v-list>

    <v-list v-else three-line max-width="600">
      <template v-for="member in members">
        <v-list-item :key="member.title">
          <v-list-item-avatar>
            <v-img :src="member.avatar"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <!--TODO: add link to user profile-->
            <v-list-item-title>{{ member.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ member.role }}</v-list-item-subtitle>
            <v-list-item-subtitle>
              Присоединился {{ member.joined_at | formatDate }}
            </v-list-item-subtitle>
          </v-list-item-content>
          <slot name="actions" v-bind:member="member" v-bind:band="band"></slot>
          <v-list-item-action v-if="userCanLeaveBand(member)">
            <BandMembersLeave
              :member="member"
              :band="band"
              @memberDeleted="removeMember"
            />
          </v-list-item-action>
        </v-list-item>
      </template>
    </v-list>
  </v-fade-transition>
</template>

<script>
import BandMembersLeave from "@/components/bands/BandMembersLeave";

export default {
  name: "BandMembers",
  components: { BandMembersLeave },
  props: {
    band: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      members: [],
      isFetching: true,
    };
  },
  mounted() {
    this.getBandMembers();
  },
  methods: {
    getBandMembers() {
      this.isFetching = true;
      this.$http
        .get(`/bands/${this.band.id}/members`)
        .then((res) => (this.members = res.data.data))
        .finally(() => (this.isFetching = false));
    },
    userCanLeaveBand(member) {
      return member.id === this.$auth.user().id && !this.band.is_admin;
    },
    removeMember(member) {
      this.members = this.members.filter((item) => item.id !== member.id);
    },
  },
};
</script>
