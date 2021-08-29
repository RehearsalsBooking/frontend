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
      <MemberListItem
        v-for="member in members"
        :key="member.id"
        :band="band"
        :member="member"
        @removed="removeMember"
        @memberRoleEdited="member.roles = $event"
      />
    </v-list>
  </v-fade-transition>
</template>

<script>
import MemberListItem from "@/components/bands/MemberListItem";

export default {
  name: "BandMembers",
  components: { MemberListItem },
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
    removeMember(memberId) {
      this.members = this.members.filter((item) => item.id !== memberId);
    },
  },
};
</script>
