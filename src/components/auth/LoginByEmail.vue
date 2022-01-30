<template>
  <div>
    <v-row>
      <v-col cols="12" class="text-center pb-0">
        <h3>Вход по почте:</h3>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="pt-0">
        <v-form ref="form" v-model="valid" lazy-validation>
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
            :rules="[rules.required]"
            v-model="credentials.password"
            required
          />
          <v-checkbox label="Не запоминать меня" v-model="dontRemember" />
          <v-btn
            color="primary"
            rounded
            block
            class="mt-2"
            @click="login"
            :loading="isLoading"
            :disabled="!valid"
          >
            Войти
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "LoginByEmail",
  data() {
    return {
      isLoading: false,
      valid: true,
      showPassword: false,
      credentials: {
        email: "",
        password: "",
        remember_me: true,
      },
      dontRemember: false,
      rules: {
        required: (v) => !!v || "Введите пароль",
        email: [
          (v) => !!v || "Введите почту",
          (v) => /.+@.+\..+/.test(v) || "Некорректныая почта",
        ],
      },
    };
  },
  watch: {
    dontRemember(v) {
      this.credentials.remember_me = !v;
    },
  },
  methods: {
    async login() {
      if (!(await this.$refs.form.validate())) {
        return;
      }
      this.isLoading = true;
      this.loginViaEmail(this.credentials)
        .then(() => {
          if (this.$route.path !== "/") {
            this.$router.push("/");
          }
        })
        .catch((e) => {
          if (e.response.status === 422) {
            if (e.response.data.errors.login) {
              this.$snackbar(e.response.data.errors.login, "error");
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
    ...mapActions({
      loginViaEmail: "auth/loginViaEmail",
    }),
  },
};
</script>

<style scoped></style>
