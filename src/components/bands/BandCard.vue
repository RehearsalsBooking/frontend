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
    ></v-img>

    <v-card-title class="pb-0">
      {{ band.name }}
      <v-spacer></v-spacer>
    </v-card-title>
    <v-card-actions class="pt-0">
      <v-chip-group active-class="deep-purple accent-4 white--text" column>
        <v-chip v-for="genre in band.genres" :key="genre.id">
          {{ genre.name }}
        </v-chip>
      </v-chip-group>
      <span class="subheading mr-2">{{ band.members_count }}</span>
      <v-icon class="mr-4"> mdi-account-group </v-icon>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "BandCard",
  props: { band: Object },
};
</script>
