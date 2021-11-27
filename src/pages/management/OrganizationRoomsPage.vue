<template>
  <v-container fluid>
    <v-row class="justify-space-around">
      <v-col cols="12" md="4">
        <v-card class="px-4">
          <v-card-title>
            <h2 class="text-center">Управление комнатами</h2>
          </v-card-title>
          <v-card-text>
            <OrganizationRoomsList :organization-id="id" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import OrganizationRoomsList from "@/components/organizations/OrganizationRoomsList";
export default {
  name: "OrganizationRoomsPage",
  components: { OrganizationRoomsList },
  props: {
    id: [String, Number],
  },
};
</script>
