<template>
  <v-fade-transition mode="out-in">
    <v-container fluid v-if="isFetching" key="fetching">
      <v-row>
        <v-progress-circular indeterminate color="primary" class="mx-auto" />
      </v-row>
    </v-container>
    <v-container fluid v-else key="fetched">
      <v-row justify="center">
        <v-col cols="12" md="4">
          <v-card> <BandMembers :band="band" /> </v-card
        ></v-col>
      </v-row>
    </v-container>
  </v-fade-transition>
</template>

<script>
import BandMembers from "@/components/bands/BandMembers";

export default {
  name: "BandEditMainInfo",
  props: { id: [String, Number] },
  components: {
    BandMembers,
  },
  data() {
    return {
      band: {},
      isFetching: true,
    };
  },
  mounted() {
    this.getBand();
  },
  methods: {
    getBand() {
      this.isFetching = true;
      this.$http
        .get(`/bands/${this.id}`)
        .then((res) => {
          this.band = res.data.data;
        })
        .finally(() => (this.isFetching = false));
    },
  },
};
</script>
