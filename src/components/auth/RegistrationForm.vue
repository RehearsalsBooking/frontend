<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      label="Ваше имя"
      type="text"
      :rules="rules.required"
      v-model="credentials.name"
      required
    />
    <v-text-field
      label="Почта"
      type="email"
      :rules="rules.email"
      v-model="credentials.email"
      required
    />
    <v-text-field
      label="Пароль"
      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      :type="showPassword ? 'text' : 'password'"
      @click:append="showPassword = !showPassword"
      :rules="rules.password"
      v-model="credentials.password"
      required
    />
    <v-text-field
      label="Подтверждение пароля"
      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      :type="showPassword ? 'text' : 'password'"
      @click:append="showPassword = !showPassword"
      :rules="rules.passwordsMatch"
      v-model="credentials.password_confirmation"
      required
    />
    <v-btn
      color="primary"
      rounded
      block
      class="mt-2"
      @click="submit"
      :loading="isLoading"
      :disabled="!valid"
    >
      Продолджить
    </v-btn>
  </v-form>
</template>

<script>
export default {
  name: "RegistrationForm",
  data() {
    return {
      isLoading: false,
      valid: true,
      showPassword: false,
      credentials: {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        code: "",
      },
      rules: {
        required: [(v) => !!v || "Не заполнено"],
        email: [
          (v) => !!v || "Введите почту",
          (v) => /.+@.+\..+/.test(v) || "Некорректныая почта",
        ],
        password: [
          (v) => v.length >= 8 || "Пароль должен быть не короче 8 символов",
        ],
        passwordsMatch: [
          (v) => !!v || "Подтвердите пароль",
          (v) => v === this.credentials.password || "Пароли не совпадают",
        ],
      },
    };
  },
  methods: {
    submit() {
      if (!this.$refs.form.validate()) {
        return;
      }
      this.isLoading = true;
      this.$http
        .post("email-verification", {
          email: this.credentials.email,
        })
        .then(() => {
          this.$emit("submitted", this.credentials);
        })
        .catch((e) => {
          if (e.response.status === 422 && e.response.data.errors) {
            if (
              e.response.data.errors.email &&
              e.response.data.errors.email.includes("validation.unique")
            ) {
              this.$snackbar(
                "Пользователь с указанной почтой уже зарегистрирован",
                "error"
              );
            } else {
              this.$snackbar("Некорректные данные", "error");
            }
          }

          if (e.response.status === 429) {
            this.$snackbar(
              "Попытки входа исчерпаны. Попробуйте позже",
              "error"
            );
          }
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>

<style scoped></style>
