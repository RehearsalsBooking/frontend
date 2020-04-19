<template>
  <v-card max-width="344" class="mx-auto" :ripple="false">
    <v-img
      src="https://cdn.vuetifyjs.com/images/cards/mountain.jpg"
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
