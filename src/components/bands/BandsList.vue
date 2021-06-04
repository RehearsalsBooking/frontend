<template>
  <v-fade-transition mode="out-in">
    <v-col cols="12" v-if="isFetching" key="bands-loading">
      <v-row>
        <v-col cols="3" v-for="n in 8" :key="n">
          <v-card max-width="344" class="mx-auto">
            <v-skeleton-loader
              transition="fade"
              type="card"
            ></v-skeleton-loader>
          </v-card>
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="12" v-else-if="bands.length > 0" key="bands-loaded">
      <v-row>
        <v-col cols="3" v-for="band in bands" :key="band.id">
          <BandCard :band="band" />
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="12" v-else key="bands-none">
      <v-row>
        <v-col cols="12" class="text-center">
          <slot name="no-bands"></slot>
        </v-col>
      </v-row>
    </v-col>
  </v-fade-transition>
</template>
<script>
import BandCard from "@/components/bands/BandCard";

export default {
  name: "BandsList",
  components: { BandCard },
  props: {
    bands: Array,
    isFetching: Boolean,
  },
};
</script>
