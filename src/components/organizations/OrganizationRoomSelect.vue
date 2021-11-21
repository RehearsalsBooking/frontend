<template>
  <v-col v-if="rooms.length > 1" class="mb-4 mt-1 room-tabs pa-0">
    <v-col cols="3" v-if="!roomsLoaded" class="pa-0">
      <v-progress-circular indeterminate color="primary" />
    </v-col>
    <v-col v-else-if="rooms.length > 1" class="pa-0">
      <v-tabs
        @change="changeSelectedRoom"
        v-model="selectedRoom"
        show-arrows
        grow
        center-active
      >
        <v-tab v-for="room in rooms" :key="room.id">{{ room.name }}</v-tab>
      </v-tabs>
    </v-col>
  </v-col>
</template>
<script>
export default {
  name: "OrganizationRoomSelect",
  props: {
    value: {},
    organizationId: [Number, String],
  },
  data() {
    return {
      selectedRoom: 0,
      roomsLoaded: false,
      rooms: [],
    };
  },
  mounted() {
    this.getRooms();
  },
  methods: {
    changeSelectedRoom() {
      this.$emit("input", this.rooms[this.selectedRoom].id);
      this.$emit("change", this.selectedRoom);
    },
    getRooms() {
      this.$http
        .get(`/organizations/${this.organizationId}/rooms`)
        .then((res) => {
          this.rooms = res.data.data;
          this.roomsLoaded = true;
          this.changeSelectedRoom();
        });
    },
  },
};
</script>
<style scoped>
@media (max-width: 500px) {
  .room-tabs {
    max-width: 351px;
  }
}
</style>
