<template>
  <v-row class="justify-space-around">
    <v-col cols="12" sm="6">
      <v-card class="px-4">
        <v-card-title>
          <div class="mx-auto">Редактирование профиля</div>
        </v-card-title>
        <v-card-text>
          <h2 class="mb-6">Обновить аватарку</h2>
          <ImageUpload :upload-url="`users/me/avatar`" v-model="user.avatar" />
          <h2 class="mb-6">Обновить данные</h2>
          <v-form ref="form">
            <v-text-field v-model="user.name" label="Имя" required />
            <v-text-field
              v-model="user.public_email"
              :error-messages="errors.public_email"
              label="Почта для связи"
            />
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

export default {
  name: "UserProfileEdit",
  components: { ImageUpload },
  data() {
    return {
      user: {
        name: this.$auth.user().name,
        public_email: this.$auth.user().contacts.public_email,
        phone: this.$auth.user().contacts.phone,
        link: this.$auth.user().contacts.link,
        avatar: this.$auth.user().avatar.original,
      },
      errors: {
        public_email: null,
      },
    };
  },
  methods: {
    update() {
      this.$http
        .put("users/me", this.user)
        .then(() => {
          this.$snackbar("Ваш профиль обновлен");
          this.errors = {};
          this.$auth.fetch({});
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
