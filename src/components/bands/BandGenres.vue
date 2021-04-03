<template>
  <v-chip-group column>
    <v-chip v-for="genre in genres" :key="genre.id" @click.stop="">
      {{ genre.name }}
    </v-chip>
  </v-chip-group>
</template>
<script>
export default {
  name: "BandGenres",
  props: {
    genres: Array,
  },
};
</script>
