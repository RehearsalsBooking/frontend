<template>
  <div>
    <v-btn icon @click="toggleFavorite">
      <v-icon :color="iconColor">mdi-heart</v-icon>
    </v-btn>
    <Login
      v-model="loginModal"
      title="Авторизуйтесь, чтобы сохранить организацию"
    />
  </div>
</template>
<script>
import Login from "../auth/Login";

export default {
  name: "FavoriteIndicator",
  components: { Login },
  props: {
    organization: Object
  },
  data() {
    return {
      isFavorited: this.organization.is_favorited,
      loginModal: false
    };
  },
  computed: {
    iconColor() {
      return this.isFavorited ? "red" : null;
    }
  },
  methods: {
    toggleFavorite() {
      if (!this.$auth.check()) {
        this.loginModal = true;
        return;
      }

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
