<template>
  <v-container>
    <v-layout align-center justify-center>
      <v-row align="start">
        <UserSchedule :user-id="user.id" v-if="isAuthenticated" />
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
import UserSchedule from "@/components/user/UserSchedule";
import { mapGetters } from "vuex";

export default {
  name: "UserBandsPage",
  components: { UserSchedule },
  data() {
    return {
      isFetching: true,
    };
  },
  computed: {
    ...mapGetters({
      user: "auth/getUser",
      isAuthenticated: "auth/isAuthenticated",
    }),
  },
};
</script>
