<template>
  <v-row class="justify-space-around">
    <v-col cols="12" sm="6">
      <v-card class="px-4">
        <v-card-title>
          <div class="mx-auto">Редактирование профиля</div>
        </v-card-title>
        <v-card-text>
          <h2 class="mb-6">Почта</h2>
          <v-row>
            <v-col cols="4">
              <v-text-field disabled v-model="user.email" label="Почта" />
            </v-col>
            <v-col cols="8">
              <v-btn
                color="primary"
                rounded
                @click="$router.push({ name: 'email-update' })"
              >
                Обновить почту
              </v-btn>
            </v-col>
          </v-row>
          <h2 class="mb-6">Обновить аватарку</h2>
          <ImageUpload :upload-url="`users/me/avatar`" v-model="user.avatar" />

          <h2 class="mb-6">Обновить данные</h2>
          <v-form ref="form">
            <v-text-field v-model="user.name" label="Имя" required />
            <v-text-field v-model="user.phone" label="Телефон" />
            <v-text-field v-model="user.link" label="Сайт/ссылка на соцсети" />

            <v-btn color="success" block rounded @click="update">
              Сохранить
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import ImageUpload from "@/components/common/ImageUpload";
import { mapGetters } from "vuex";

export default {
  name: "UserProfileEdit",
  components: { ImageUpload },
  data() {
    return {
      user: {
        name: "",
        email: "",
        phone: "",
        link: "",
        avatar: "",
      },
    };
  },
  computed: {
    ...mapGetters({
      loggedUser: "auth/getUser",
    }),
  },
  mounted() {
    this.user = {
      name: this.loggedUser.name,
      email: this.loggedUser.email,
      phone: this.loggedUser.contacts.phone,
      link: this.loggedUser.contacts.link,
      avatar: this.loggedUser.avatar.original,
    };
  },
  methods: {
    update() {
      this.$http
        .put("users/me", this.user)
        .then(() => {
          this.$snackbar("Ваш профиль обновлен");
          this.errors = {};
          this.$store.dispatch("auth/updateUser");
        })
        .catch((error) => {
          if (error.response.status === 422) {
            this.errors = error.response.data.errors;
          }
          this.$snackbar("Не удалось обновить профиль", "error");
        });
    },
  },
};
</script>
