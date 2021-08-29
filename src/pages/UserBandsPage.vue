<template>
  <v-layout align-center justify-center>
    <v-row align="start">
      <BandsList :bands="bands" :is-fetching="isFetching">
        <template #no-bands> Вы пока не состоите ни в одной группе </template>
      </BandsList>
    </v-row>
  </v-layout>
</template>

<script>
import BandsList from "@/components/bands/BandsList";

export default {
  name: "UserBandsPage",
  components: { BandsList },
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
