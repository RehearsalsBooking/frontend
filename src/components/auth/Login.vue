<template>
  <Dialog :value="value" @input="$emit('input')" :max-width="'500px'">
    <v-card>
      <v-toolbar color="primary" dark flat class="mb-5">
        <v-toolbar-title class="mx-auto">{{ title }}</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            label="Почта"
            name="login"
            prepend-icon="mdi-email"
            type="text"
            v-model="email"
            :rules="emailRules"
            v-on:keyup.enter="login"
          />

          <v-text-field
            id="password"
            label="Пароль"
            name="password"
            prepend-icon="mdi-lock"
            type="password"
            v-model="password"
            v-on:keyup.enter="login"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn
          class="mx-auto mb-3"
          width="50%"
          rounded
          color="primary"
          @click="login"
          :loading="loading"
          >Войти</v-btn
        >
      </v-card-actions>
    </v-card>
  </Dialog>
</template>

<script>
import Dialog from "../common/Dialog";

export default {
  name: "Login",
  props: {
    value: Boolean,
    title: {
      type: String,
      default: "Вход в приложение"
    }
  },
  components: { Dialog },
  data() {
    return {
      email: "",
      emailRules: [
        v => !!v || "Введите почтовый адрес",
        v => /.+@.+/.test(v) || "Неправильный почтовый адрес"
      ],
      password: "",
      passwordRules: [v => !!v || "Введите пароль"],
      valid: true,
      loading: false
    };
  },
  methods: {
    login() {
      if (this.$refs.form.validate()) {
        this.$http.get("/sanctum/csrf-cookie").then(() => {
          this.$auth
            .login({
              data: {
                email: this.email,
                password: this.password
              },
              redirect: null
            })
            .then(res => {
              this.$auth.user(res.data.user);

              this.$snackbar(`Добро пожаловать, ${res.data.user.name}`);

              this.$emit("input", false);
              window.getApp.$emit("successfulLogin");
            })
            .catch(res => {
              if (res.response.status === 401) {
                this.$snackbar(res.response.data, "error");
              }
            });
        });
      }
    }
  }
};
</script>

<style scoped></style>
