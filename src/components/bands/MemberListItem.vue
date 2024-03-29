<template>
  <v-list-item @click="openUserPage">
    <v-list-item-avatar>
      <ImageWithPlaceholder :src="member.user.avatar.thumb" />
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title>{{ member.user.name }}</v-list-item-title>
      <v-list-item-subtitle>{{ roles }} </v-list-item-subtitle>
      <v-list-item-subtitle>
        Присоединился {{ member.joined_at | formatDate }}
      </v-list-item-subtitle>
    </v-list-item-content>

    <v-list-item-action v-if="canEditRole">
      <BandEditMembersEditRole
        :band="band"
        :member="member"
        :roles="member.roles"
        @memberRoleEdited="$emit('memberRoleEdited', $event)"
      />
    </v-list-item-action>

    <v-list-item-action v-if="userCanLeaveBand">
      <BandMembersLeave
        :member="member"
        :band="band"
        @memberDeleted="$emit('removed', member.id)"
      />
    </v-list-item-action>

    <v-list-item-action v-if="userCanRemoveBandMember">
      <BandEditMembersDelete
        :band="band"
        :member="member"
        @memberDeleted="$emit('removed', member.id)"
      />
    </v-list-item-action>
  </v-list-item>
</template>
<script>
import BandMembersLeave from "@/components/bands/BandMembersLeave";
import BandEditMembersEditRole from "@/components/bands/BandEditMembersEditRole";
import BandEditMembersDelete from "@/components/bands/BandEditMembersDelete";
import ImageWithPlaceholder from "@/pages/ImageWithPlaceholder";
import { mapGetters } from "vuex";

export default {
  name: "MemberListItem",
  components: {
    ImageWithPlaceholder,
    BandEditMembersDelete,
    BandEditMembersEditRole,
    BandMembersLeave,
  },
  props: {
    band: {},
    member: {},
  },
  computed: {
    ...mapGetters({
      user: "auth/getUser",
    }),
    userCanLeaveBand() {
      return !this.band.is_admin && this.member.user.id === this.user.id;
    },
    userCanRemoveBandMember() {
      return this.band.is_admin && this.member.user.id !== this.user.id;
    },
    roles() {
      return this.member.roles && this.member.roles.join(", ");
    },
    canEditRole() {
      return this.band.is_admin;
    },
  },
  methods: {
    openUserPage() {
      this.$router.push({ name: "user", params: { id: this.member.user.id } });
    },
  },
};
</script>
