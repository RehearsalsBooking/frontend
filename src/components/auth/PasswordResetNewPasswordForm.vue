<template>
  <v-form ref="form" v-model="valid" lazy-validation onSubmit="return false;">
    <v-row>
      <v-col cols="12">
        <h3>Введите новый пароль</h3>
      </v-col>
    </v-row>
    <v-text-field
      label="Пароль"
      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      :type="showPassword ? 'text' : 'password'"
      @click:append="showPassword = !showPassword"
      :rules="rules.password"
      v-model="password"
      required
    />
    <v-text-field
      label="Подтверждение пароля"
      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      :type="showPassword ? 'text' : 'password'"
      @click:append="showPassword = !showPassword"
      :rules="rules.passwordsMatch"
      v-model="password_confirmation"
      required
    />
    <v-btn
      color="primary"
      type="submit"
      rounded
      block
      class="mt-2"
      @click="submit"
      :loading="isLoading"
      :disabled="!valid"
    >
      Восстановить пароль
    </v-btn>
  </v-form>
</template>
<script>
export default {
  name: "PasswordResetNewPasswordForm.vue",
  props: {
    email: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      valid: false,
      password: "",
      password_confirmation: "",
      showPassword: false,
      isLoading: false,
      rules: {
        password: [
          (v) => v.length >= 8 || "Пароль должен быть не короче 8 символов",
        ],
        passwordsMatch: [
          (v) => !!v || "Подтвердите пароль",
          (v) => v === this.password || "Пароли не совпадают",
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
        .post("password-recovery", {
          email: this.email,
          token: this.token,
          password: this.password,
          password_confirmation: this.password_confirmation,
        })
        .then(() => {
          this.$emit("success", this.email);
        })
        .catch((e) => {
          if (e.response.status === 422 && e.response.data) {
            this.$snackbar(e.response.data, "error");
          }

          if (e.response.status === 429) {
            this.$snackbar("Попытки исчерпаны. Попробуйте позже", "error");
          }
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>
