<template>
  <BandMembers :members="members">
    <template v-slot:actions="{ member }">
      <v-list-item-action>
        <BandEditMembersEditRole
          :band="band"
          :member="member"
          @memberRoleEdited="member.role = $event"
        />
      </v-list-item-action>
      <v-list-item-action>
        <BandEditMembersDelete
          v-if="member.id !== $auth.user().id"
          :band="band"
          :member="member"
          @memberDeleted="members = members.filter((m) => m.id !== $event.id)"
        />
      </v-list-item-action>
    </template>
  </BandMembers>
</template>

<script>
import BandEditMembersDelete from "@/components/bands/BandEditMembersDelete";
import BandEditMembersEditRole from "@/components/bands/BandEditMembersEditRole";
import BandMembers from "@/components/bands/BandMembers";

export default {
  name: "BandEditMainInfo",
  props: { band: Object },
  components: {
    BandMembers,
    BandEditMembersDelete,
    BandEditMembersEditRole,
  },
  data() {
    return {
      members: this.band.members,
    };
  },
  methods: {},
};
</script>
