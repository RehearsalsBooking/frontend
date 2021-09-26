<template>
  <v-card
    max-width="344"
    :ripple="false"
    @click="$router.push({ name: 'band', params: { id: band.id } })"
  >
    <v-btn
      v-if="band.is_admin"
      class="mt-3"
      fab
      absolute
      right
      dark
      color="primary"
      @click="
        $router.push({
          name: 'band-edit-main-info',
          params: { id: band.id },
        })
      "
    >
      <v-icon dark> mdi-pencil </v-icon>
    </v-btn>
    <ImageWithPlaceholder :src="band.avatar.thumb" height="194">
    </ImageWithPlaceholder>

    <v-card-title class="pb-0">
      {{ band.name }}
      <v-spacer></v-spacer>
    </v-card-title>
    <v-card-actions class="pt-0">
      <BandGenres :genres="band.genres" />
      <span class="subheading mr-2">{{ band.members_count }}</span>
      <v-icon class="mr-4"> mdi-account-group </v-icon>
    </v-card-actions>
  </v-card>
</template>

<script>
import BandGenres from "@/components/bands/BandGenres";
import ImageWithPlaceholder from "@/pages/ImageWithPlaceholder";

export default {
  name: "BandCard",
  components: { ImageWithPlaceholder, BandGenres },
  props: { band: Object },
};
</script>
