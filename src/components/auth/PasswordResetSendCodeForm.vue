<template>
  <v-form ref="form" v-model="valid" lazy-validation onSubmit="return false;">
    <v-row>
      <v-col cols="12">
        <h3>Введите свою почту</h3>
      </v-col>
    </v-row>
    <EmailInput v-model="email" required />
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
import EmailInput from "@/components/auth/EmailInput";
export default {
  name: "PasswordResetSendCodeForm",
  components: { EmailInput },
  data() {
    return {
      valid: false,
      email: "",
      isLoading: false,
      rules: {
        email: [
          (v) => !!v || "Введите почту",
          (v) => /.+@.+\..+/.test(v) || "Некорректная почта",
        ],
      },
    };
  },
  methods: {
    submit() {
      console.log("s");
      if (!this.$refs.form.validate()) {
        return;
      }
      this.isLoading = true;
      this.$http
        .post("password-recovery-link", {
          email: this.email,
        })
        .then(() => {
          this.$emit("codeSent", this.email);
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
