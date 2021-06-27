<template>
  <v-fade-transition group mode="in-out" hide-on-leave>
    <v-col cols="12" v-if="isFetching" key="rehearsals-loading">
      <v-row>
        <v-col cols="4" v-for="n in 3" :key="n">
          <v-card class="mx-auto">
            <v-skeleton-loader
              transition="fade"
              :types="{ skeleton: 'article' }"
              type="skeleton"
            ></v-skeleton-loader>
          </v-card>
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="12" v-else-if="rehearsals.length > 0" key="rehearsals-loaded">
      <v-row>
        <v-col cols="4" v-for="rehearsal in rehearsals" :key="rehearsal.id">
          <RehearsalDetailed :rehearsal="rehearsal" :forManager="forManager" />
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="12" v-else key="rehearsals-none">
      <v-row>
        <v-col cols="12" class="text-center">
          <slot name="no-rehearsals"></slot>
        </v-col>
      </v-row>
    </v-col>
  </v-fade-transition>
</template>

<script>
import RehearsalDetailed from "@/components/rehearsals/RehearsalDetailed";

export default {
  name: "RehearsalsDetailed",
  components: { RehearsalDetailed },
  props: {
    rehearsals: Array,
    isFetching: Boolean,
    forManager: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style scoped></style>
