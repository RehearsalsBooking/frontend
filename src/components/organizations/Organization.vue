<template>
  <v-card
    max-width="344"
    :ripple="false"
    @click="
      $router.push({ name: 'organization', params: { id: organization.id } })
    "
  >
    <!--TODO: remove random once real avatars are added-->
    <!--suppress HtmlUnknownTarget -->
    <v-img
      :src="`${organization.avatar}?random=${organization.id}`"
      height="194"
    ></v-img>

    <v-card-title>
      {{ organization.name }}
      <v-spacer></v-spacer>
      <FavoriteIndicator :organization="organization" />
    </v-card-title>
    <v-card-subtitle>
      {{ organization.address }}
    </v-card-subtitle>
  </v-card>
</template>

<script>
import FavoriteIndicator from "./FavoriteIndicator";

export default {
  name: "Organization",
  components: { FavoriteIndicator },
  props: { organization: Object }
};
</script>
