<template>
  <v-card
    max-width="344"
    :ripple="false"
    @click="$router.push({ name: 'band', params: { id: band.id } })"
  >
    <!--TODO: remove random once real avatars are added-->
    <!--suppress HtmlUnknownTarget -->
    <v-img
      :src="`https://picsum.photos/300/200?random=${band.id}`"
      height="194"
    >
      <v-btn
        v-if="band.is_admin"
        class="mx-2 mt-2 float-right"
        fab
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
    </v-img>

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

export default {
  name: "BandCard",
  components: { BandGenres },
  props: { band: Object },
};
</script>
