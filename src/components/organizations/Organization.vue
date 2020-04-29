<template>
  <v-card max-width="344" :ripple="false">
    <!--            TODO: remove random once real avatars are added-->
    <v-img
      :src="`${organization.avatar}?random=${organization.id}`"
      height="194"
    ></v-img>

    <v-card-title>
      {{ organization.name }}
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-subtitle>
      {{ organization.address }}
    </v-card-subtitle>
  </v-card>
</template>

<script>
export default {
  name: "Organization",
  props: { organization: Object }
};
</script>

<style scoped></style>
