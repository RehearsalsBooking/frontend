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
      bands: [],
    };
  },
  computed: {
    ...mapGetters({
      user: "auth/getUser",
      isAuthenticated: "auth/isAuthenticated",
    }),
  },
  mounted() {
    this.getBands();
  },
  methods: {
    getBands() {
      this.isFetching = true;
      this.$http
        .get("/bands", {
          params: {
            active_member_id: this.user.id,
          },
        })
        .then((res) => {
          this.bands = res.data.data;
        })
        .finally(() => (this.isFetching = false));
    },
  },
};
</script>
