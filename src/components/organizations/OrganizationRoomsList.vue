<template>
  <div>
    <v-alert outlined text type="info">
      Комнаты будут отображаться в интерфейсе только если их больше одной
    </v-alert>
    <v-fade-transition mode="out-in">
      <v-list v-if="isFetching" key="invites-loading">
        <v-skeleton-loader
          v-for="n in 3"
          :key="n"
          transition="fade"
          type="list-item-three-line"
        ></v-skeleton-loader>
      </v-list>
      <v-list v-else max-width="600">
        <v-list-item>
          <v-list-item-content>
            <OrganizationRoomAdd
              :organization-id="organizationId"
              @roomAdded="getOrganizationRooms"
            />
          </v-list-item-content>
        </v-list-item>
        <OrganizationRoomsListItem
          :organization-id="organizationId"
          v-for="room in rooms"
          :key="room.id"
          :room="room"
          @removed="removeRoom"
          @roomNameEdited="room.name = $event"
        />
      </v-list>
    </v-fade-transition>
  </div>
</template>

<script>
import OrganizationRoomsListItem from "@/components/organizations/OrganizationRoomsListItem";
import OrganizationRoomAdd from "@/components/organizations/OrganizationRoomAdd";

export default {
  name: "OrganizationRoomsList",
  components: { OrganizationRoomAdd, OrganizationRoomsListItem },
  props: {
    organizationId: {
      type: [Number, String],
      required: true,
    },
  },
  data() {
    return {
      rooms: [],
      isFetching: true,
    };
  },
  mounted() {
    this.getOrganizationRooms();
  },
  methods: {
    getOrganizationRooms() {
      this.isFetching = true;
      this.$http
        .get(`/organizations/${this.organizationId}/rooms`)
        .then((res) => (this.rooms = res.data.data))
        .finally(() => (this.isFetching = false));
    },
    removeRoom(roomId) {
      this.rooms = this.rooms.filter((item) => item.id !== roomId);
    },
  },
};
</script>
