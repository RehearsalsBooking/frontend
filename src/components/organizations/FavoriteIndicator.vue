<template>
  <v-btn icon @click="toggleFavorite">
    <v-icon :color="iconColor">mdi-heart</v-icon>
  </v-btn>
</template>
<script>
export default {
  name: "FavoriteIndicator",
  props: {
    organization: Object
  },
  data() {
    return {
      isFavorited: this.organization.is_favorited
    };
  },
  computed: {
    iconColor() {
      return this.isFavorited ? "red" : null;
    }
  },
  methods: {
    toggleFavorite() {
      if (this.isFavorited) {
        this.unFavoriteOrganization();
      } else {
        this.favoriteOrganization();
      }
    },
    unFavoriteOrganization() {
      this.$http
        .delete(`favorite-organizations/${this.organization.id}`)
        .then(() => {
          this.isFavorited = false;
        });
    },
    favoriteOrganization() {
      this.$http
        .post(`favorite-organizations/${this.organization.id}`)
        .then(() => {
          this.isFavorited = true;
        });
    }
  }
};
</script>
