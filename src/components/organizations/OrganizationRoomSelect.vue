<template>
  <v-row>
    <v-col cols="3" v-if="!roomsLoaded">
      <v-progress-circular indeterminate color="primary" />
    </v-col>
    <v-col v-else-if="rooms.length > 1">
      <v-select
        label="Комната"
        :items="rooms"
        v-model="selectedRoom"
        @change="changeSelectedRoom"
        item-text="name"
        item-value="id"
      />
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: "OrganizationRoomSelect",
  props: {
    value: {},
    organization: Object,
  },
  data() {
    return {
      selectedRoom: null,
      roomsLoaded: false,
      rooms: [],
    };
  },
  mounted() {
    this.getRooms();
  },
  methods: {
    changeSelectedRoom() {
      this.$emit("input", this.selectedRoom);
      this.$emit("change", this.selectedRoom);
    },
    getRooms() {
      this.$http
        .get(`/organizations/${this.organization.id}/rooms`)
        .then((res) => {
          this.rooms = res.data.data;
          this.selectedRoom = this.rooms[0].id;
          this.roomsLoaded = true;
          this.changeSelectedRoom();
        })
        .catch((res) => {
          this.$snackbar(res.response.data);
        });
    },
  },
};
</script>
