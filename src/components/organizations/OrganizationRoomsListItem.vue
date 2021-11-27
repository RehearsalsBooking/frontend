<template>
  <v-list-item>
    <v-list-item-content>
      <v-list-item-title>{{ room.name }}</v-list-item-title>
    </v-list-item-content>

    <v-list-item-action>
      <OrganizationRoomEdit
        :room="room"
        :organization-id="organizationId"
        @roomNameEdited="$emit('roomNameEdited', $event)"
      />
    </v-list-item-action>

    <v-list-item-action>
      <OrganizationRoomDelete
        @removed="$emit('removed', $event)"
        :room="room"
        :organization-id="organizationId"
      />
    </v-list-item-action>
  </v-list-item>
</template>
<script>
import OrganizationRoomEdit from "@/components/organizations/OrganizationRoomEdit";
import OrganizationRoomDelete from "@/components/organizations/OrganizationRoomDelete";
export default {
  name: "OrganizationRoomsListItem",
  components: { OrganizationRoomDelete, OrganizationRoomEdit },
  props: {
    organizationId: [String, Number],
    room: Object,
  },
};
</script>
