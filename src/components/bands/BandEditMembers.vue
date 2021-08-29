<template>
  <v-fade-transition group mode="out-in">
    <v-container fluid v-if="isFetching" key="fetching">
      <v-row>
        <v-progress-circular indeterminate color="primary" class="mx-auto" />
      </v-row>
    </v-container>
    <v-container fluid v-else key="fetched">
      <BandMembers :band="band" />
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
