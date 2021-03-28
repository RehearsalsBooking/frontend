<template>
  <v-container fluid>
    <v-row class="justify-space-around">
      <v-col cols="4">
        <UserProfileEdit />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UserProfileEdit from "@/components/user/UserProfileEdit";
export default {
  name: "OrganizationsPage",
  components: { UserProfileEdit },
};
</script>
