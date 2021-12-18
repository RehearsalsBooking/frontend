<template>
  <Dialog v-model="showDialog" :max-width="'500px'">
    <v-card>
      <v-toolbar color="primary" dark flat class="mb-5">
        <v-toolbar-title class="mx-auto">{{ title }}</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-row>
          <v-col cols="12" class="text-center"
            ><h3>Вход через соцсети:</h3>
          </v-col>
        </v-row>
        <v-row>
          <v-col sm="12" lg="6" v-if="env === 'production'">
            <GoogleLoginButton @click="auth('google')" />
          </v-col>
          <v-col sm="12" lg="6" v-if="env === 'production'">
            <VKLoginButton @click="auth('vk')" />
          </v-col>
          <v-col cols="12" v-if="env !== 'production'">
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
  </Dialog>
</template>

<script>
import Dialog from "../../components/common/Dialog";
import GoogleLoginButton from "@/plugins/authorizable_action/GoogleLoginButton";
import VKLoginButton from "@/plugins/authorizable_action/VKLoginButton";
import LoginButton from "@/plugins/authorizable_action/LoginButton";

export default {
  name: "AuthorizableAction",
  components: { LoginButton, VKLoginButton, GoogleLoginButton, Dialog },
  computed: {
    env() {
      return process.env.VUE_APP_ENV;
    },
  },
  methods: {
    auth(provider) {
      const hello = this.hello;
      hello(provider)
        .login({ scope: this.getScopeForProvider(provider) })
        .then(
          () => {
            const authRes = hello(provider).getAuthResponse();
            this.authorizeWithSocialToken(authRes, provider);
          },
          (e) => {
            alert("Signin error: " + e.error.message);
          }
        );
    },
    getScopeForProvider(provider) {
      if (this.isVkProvider(provider)) {
        return "email, offline";
      }
      if (this.isGoogleProvider(provider)) {
        return "email";
      }
    },
    authorizeWithSocialToken(data, provider) {
      this.$auth
        .login({
          data: this.getDataForProvider(data, provider),
          redirect: null,
        })
        .then(this.onSuccessLogin)
        .catch(this.onFailedLogin);
    },
    getDataForProvider(data, provider) {
      if (this.isVkProvider(provider)) {
        return {
          email: data.email,
          token: data.access_token,
          provider: "vkontakte",
        };
      }
      if (this.isGoogleProvider(provider)) {
        return {
          token: data.access_token,
          provider: "google",
        };
      }
    },
    authTest() {
      this.$auth
        .login({
          url: "/login/test",
          redirect: null,
        })
        .then(this.onSuccessLogin)
        .catch(this.onFailedLogin);
    },
    onSuccessLogin(res) {
      this.$auth.user(res.data.user);

      this.$snackbar(`Добро пожаловать, ${res.data.user.name}`);
      this.showDialog = false;
      window.getApp.$emit("successfulLogin");
    },
    onFailedLogin(res) {
      if (res.response.status === 401) {
        this.$snackbar(res.response.data, "error");
      }
    },
    isVkProvider(provider) {
      return provider === "vk";
    },
    isGoogleProvider(provider) {
      return provider === "google";
    },
  },
};
</script>
