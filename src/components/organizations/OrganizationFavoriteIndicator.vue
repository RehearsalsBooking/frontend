<template>
  <div
    class="flex-column justify-center "
    :class="inline ? 'd-inline-flex' : 'd-flex'"
  >
    <v-btn icon @click.stop="toggleFavorite">
      <v-icon :color="iconColor">mdi-heart</v-icon>
    </v-btn>
  </div>
</template>
<script>
export default {
  name: "OrganizationFavoriteIndicator",
  props: {
    organization: Object,
    inline: {
      type: Boolean,
      default: false
    }
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
      this.$authorize(() => {
        if (this.isFavorited) {
          this.unFavoriteOrganization();
        } else {
          this.favoriteOrganization();
        }
      }, "Авторизуйтесь, чтобы сохранить организацию");
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
