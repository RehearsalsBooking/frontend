<template>
  <div v-if="rooms.length > 1">
    <v-progress-circular v-if="!roomsLoaded" indeterminate color="primary" />
    <v-select
      v-else
      multiple
      @change="changeSelectedRooms"
      item-value="id"
      item-text="name"
      v-model="selectedRooms"
      :items="rooms"
      label="Комнаты"
    />
  </div>
</template>
<script>
export default {
  name: "OrganizationRoomMultipleSelect",
  props: {
    value: {},
    organizationId: [Number, String],
  },
  data() {
    return {
      selectedRooms: [],
      roomsLoaded: false,
      rooms: [],
    };
  },
  mounted() {
    this.getRooms();
  },
  methods: {
    changeSelectedRooms() {
      this.$emit("input", this.selectedRooms);
      this.$emit("change", this.selectedRoom);
    },
    getRooms() {
      this.$http
        .get(`/organizations/${this.organizationId}/rooms`)
        .then((res) => {
          this.rooms = res.data.data;
          this.roomsLoaded = true;
          this.changeSelectedRooms();
        });
    },
  },
};
</script>
