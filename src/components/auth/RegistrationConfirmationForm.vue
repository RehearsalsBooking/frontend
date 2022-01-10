<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      label="Код"
      type="text"
      :rules="[(v) => !!v || 'Введите код']"
      v-model="registrationCredentials.code"
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
import { mapActions } from "vuex";

export default {
  name: "RegistrationConfirmationForm",
  props: { credentials: Object },
  data() {
    return {
      isLoading: false,
      valid: true,
      registrationCredentials: {},
    };
  },
  mounted() {
    this.registrationCredentials = this.credentials;
  },
  methods: {
    submit() {
      if (!this.$refs.form.validate()) {
        return;
      }
      this.isLoading = true;
      this.register(this.credentials)
        .then(() => {
          this.$snackbar("Регистрация прошла успешно", "success");
          this.$router.push("/");
        })
        .catch((e) => {
          if (e.response.status === 422) {
            if (e.response.data.errors.code) {
              this.$snackbar("Неправильный код", "error");
            } else {
              this.$snackbar(
                "Некорректные данные для регистрации. Попробуйте еще раз",
                "error"
              );
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
      register: "auth/register",
    }),
  },
};
</script>

<style scoped></style>
