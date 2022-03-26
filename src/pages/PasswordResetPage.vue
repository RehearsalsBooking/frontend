<template>
  <v-container fluid>
    <v-row class="justify-space-around">
      <v-col cols="12" sm="3">
        <v-card>
          <v-row>
            <v-col cols="12" class="text-center">
              <h2>Восстановление пароля</h2>
            </v-col>
          </v-row>
          <v-card-text v-if="isCodeSent">
            <h3>Вам успешно отправлено письмо с дальнейшими инструкциями</h3>
          </v-card-text>
          <v-card-text v-else-if="isPasswordChanged">
            <h3>Пароль успешно изменен!</h3>
            <v-btn
              color="primary"
              type="submit"
              rounded
              block
              class="mt-2"
              :to="{ name: 'login' }"
            >
              Войти
            </v-btn>
          </v-card-text>
          <v-card-text v-else>
            <PasswordResetSendCodeForm
              v-if="!hasUserInfo"
              @codeSent="showSuccess"
            />
            <PasswordResetNewPasswordForm
              v-else
              :token="token"
              :email="email"
              @success="onPasswordChanged"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PasswordResetSendCodeForm from "@/components/auth/PasswordResetSendCodeForm";
import PasswordResetNewPasswordForm from "@/components/auth/PasswordResetNewPasswordForm";

export default {
  name: "PasswordResetPage",
  components: { PasswordResetNewPasswordForm, PasswordResetSendCodeForm },
  data() {
    return {
      step: 1,
      token: null,
      email: null,
      isCodeSent: false,
      isPasswordChanged: false,
    };
  },
  mounted() {
    this.token = this.$route.query.token;
    this.email = this.$route.query.email;
  },
  computed: {
    hasUserInfo() {
      return this.token && this.email;
    },
  },
  methods: {
    showSuccess() {
      this.isCodeSent = true;
    },
    onPasswordChanged() {
      this.isPasswordChanged = true;
    },
  },
};
</script>
