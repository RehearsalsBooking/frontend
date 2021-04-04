<template>
  <v-fade-transition group mode="out-in">
    <v-container fluid v-if="isFetching" key="fetching">
      <v-row>
        <v-progress-circular indeterminate color="primary" class="mx-auto" />
      </v-row>
    </v-container>
    <v-container fluid v-else key="fetched">
      <div class="text-center">
        <h1>{{ band.name }}</h1>
      </div>
      <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
        <v-tab> Общая информация </v-tab>
        <v-tab> Состав </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item> <BandEditMainInfo :band="band" /></v-tab-item>
        <v-tab-item> ы </v-tab-item>
      </v-tabs-items>
    </v-container>
  </v-fade-transition>
</template>

<script>
import BandEditMainInfo from "@/components/bands/BandEditMainInfo";

export default {
  name: "BandEditPage",
  components: { BandEditMainInfo },
  props: {
    id: [String, Number],
  },
  data() {
    return {
      isFetching: true,
      band: {},
      tab: 0,
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
          if (!this.band.is_admin) {
            this.$router.push("/");
          }
          document.title = `Группы | ${this.band.name}`;
        })
        .finally(() => (this.isFetching = false));
    },
  },
};
</script>
