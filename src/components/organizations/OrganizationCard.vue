<template>
  <v-card
    max-width="344"
    :ripple="false"
    @click="
      $router.push({ name: 'organization', params: { id: organization.id } })
    "
  >
    <ImageWithPlaceholder :src="organization.avatar.thumb" height="194" />

    <v-card-title>
      {{ organization.name }}
      <v-spacer></v-spacer>
      <OrganizationFavoriteIndicator :organization="organization" />
    </v-card-title>
    <v-card-subtitle>
      {{ organization.address }}
    </v-card-subtitle>
  </v-card>
</template>

<script>
import OrganizationFavoriteIndicator from "./OrganizationFavoriteIndicator";
import ImageWithPlaceholder from "@/pages/ImageWithPlaceholder";

export default {
  name: "OrganizationCard",
  components: { ImageWithPlaceholder, OrganizationFavoriteIndicator },
  props: { organization: Object },
};
</script>
