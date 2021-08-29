<template>
  <v-layout align-center justify-center>
    <v-row align="start">
      <UserSchedule :user-id="$auth.user().id" />
    </v-row>
  </v-layout>
</template>

<script>
import UserSchedule from "@/components/user/UserSchedule";

export default {
  name: "UserBandsPage",
  components: { UserSchedule },
  data() {
    return {
      isFetching: true,
      bands: [],
    };
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
            active_member_id: this.$auth.user().id,
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
