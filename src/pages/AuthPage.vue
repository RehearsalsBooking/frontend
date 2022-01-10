<template>
  <v-container fluid>
    <v-row class="justify-space-around">
      <v-col cols="12" sm="3">
        <v-card>
          <v-card-text>
            <LoginByEmail />
            <v-row v-if="env === 'production'">
              <v-col cols="12">
                <v-btn
                  color="primary"
                  rounded
                  block
                  @click="$router.push({ name: 'registration' })"
                >
                  Регистрация
                </v-btn>
              </v-col>
            </v-row>
            <template v-if="env === 'production'">
              <v-row>
                <v-col cols="12" class="text-center">
                  <h3>Вход через соцсети:</h3>
                </v-col>
              </v-row>
              <v-row>
                <v-col sm="12" lg="6">
                  <GoogleLoginButton @click="auth('google')" />
                </v-col>
                <v-col sm="12" lg="6">
                  <VKLoginButton @click="auth('vkontakte')" />
                </v-col>
              </v-row>
            </template>

            <v-row v-if="env !== 'production'">
              <v-col cols="12">
                <LoginButton @click="authTest">
                  <template #icon>
                    <v-icon color="white">mdi-account</v-icon>
                  </template>
                  <template #text>Для теста</template>
                </LoginButton>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import LoginButton from "@/components/auth/LoginButton";
import VKLoginButton from "@/components/auth/VKLoginButton";
import GoogleLoginButton from "@/components/auth/GoogleLoginButton";
import LoginByEmail from "@/components/auth/LoginByEmail";

export default {
  name: "AuthPage",
  components: { LoginByEmail, LoginButton, VKLoginButton, GoogleLoginButton },
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
    async auth(provider) {
      const { data } = await this.$http.get(`auth/${provider}`);
      window.location.href = data;
    },
    authTest() {
      this.loginTest().then(this.onSuccessLogin).catch(this.onFailedLogin);
    },
    onSuccessLogin(user) {
      this.$snackbar(`Добро пожаловать, ${user.name}`);
      this.$router.push("/");
    },
    onFailedLogin(res) {
      if (res.response.status === 401) {
        this.$snackbar(res.response.data, "error");
      }
    },
  },
};
</script>
