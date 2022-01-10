<template>
  <v-container fluid>
    <v-row class="justify-space-around">
      <v-col cols="12" sm="4">
        <v-card>
          <v-card-text>
            <v-row>
              <v-col cols="12" class="text-center">
                <h2>Регистрация</h2>
              </v-col>
            </v-row>
            <template v-if="!codeSent">
              <RegistrationForm @submitted="proceedToVerification" />
            </template>

            <template v-if="codeSent">
              <v-row>
                <v-col cols="12" class="text-center">
                  <h3>Введите код, отправленный на указанную почту</h3>
                </v-col>
              </v-row>
              <RegistrationConfirmation :credentials="credentials" />
            </template>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import RegistrationForm from "@/components/auth/RegistrationForm";
import RegistrationConfirmation from "@/components/auth/RegistrationConfirmationForm";

export default {
  name: "RegistrationPage",
  components: { RegistrationConfirmation, RegistrationForm },
  data() {
    return {
      credentials: null,
      codeSent: false,
    };
  },
  computed: {
    env() {
      return process.env.VUE_APP_ENV;
    },
    ...mapGetters({
      isAuthenticated: "auth/isAuthenticated",
    }),
  },
  methods: {
    ...mapActions({
      loginTest: "auth/loginTest",
    }),
    proceedToVerification(credentials) {
      this.credentials = credentials;
      this.codeSent = true;
    },
  },
};
</script>
