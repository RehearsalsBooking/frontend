<template>
  <v-stepper v-model="step" elevation="0">
    <v-stepper-header>
      <v-stepper-step :complete="step > 1" step="1">
        Введите новую почту
      </v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step :complete="step > 2" step="2">
        Подтвердите новую почту
      </v-stepper-step>
    </v-stepper-header>
    <v-stepper-items>
      <v-stepper-content step="1">
        <EmailInput v-model="newEmail" :is-valid.sync="isNewEmailValid" />
        <v-btn
          @click="sendCode"
          block
          color="primary"
          :loading="isLoading"
          :disabled="!isNewEmailValid"
        >
          Подтвердить
        </v-btn>
      </v-stepper-content>
      <v-stepper-content step="2">
        <h3>Введите код, пришедший на указанную почту</h3>
        <v-text-field v-model="code" label="Код" />
        <v-btn
          @click="changeEmail"
          block
          color="primary"
          :loading="isLoading"
          :disabled="!code"
        >
          Подтвердить
        </v-btn>
        <v-btn
          @click="reset"
          text
          block
          :loading="isLoading"
          :disabled="!isNewEmailValid"
        >
          Назад
        </v-btn>
      </v-stepper-content>
      <v-stepper-content step="3">
        <h2>Ваша почта успешна изменена!</h2>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>
<script>
import EmailInput from "@/components/auth/EmailInput";
import { mapActions } from "vuex";
export default {
  name: "EmailUpdate",
  components: { EmailInput },
  data() {
    return {
      step: 1,
      isLoading: false,
      newEmail: "",
      code: "",
      isNewEmailValid: false,
    };
  },
  methods: {
    sendCode() {
      this.isLoading = true;
      const data = {
        email: this.newEmail,
      };
      this.$http
        .post("email-verification", data)
        .then(() => {
          this.step = 2;
        })
        .catch((res) => {
          this.$snackbar(res.response.data, "error");
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    changeEmail() {
      this.isLoading = true;
      const data = {
        email: this.newEmail,
        code: this.code,
      };
      this.$http
        .put("users/me/email", data)
        .then(() => {
          this.step = 3;
          this.updateUser();
        })
        .catch((res) => {
          this.$snackbar(res.response.data, "error");
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    reset() {
      this.newEmail = "";
      this.code = "";
      this.step = 1;
      this.isLoading = false;
      this.isNewEmailValid = false;
    },
    ...mapActions({
      updateUser: "auth/updateUser",
    }),
  },
};
</script>
