<template>
  <Dialog v-model="showDialog" :max-width="'500px'">
    <v-card>
      <v-toolbar color="primary" dark flat class="mb-5">
        <v-toolbar-title class="mx-auto">{{ title }}</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-row>
          <v-col cols="6">
            <GoogleLoginButton @click="auth('google')" />
          </v-col>
          <v-col cols="6">
            <VKLoginButton @click="auth('vk')" />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn class="mx-auto mb-3" width="50%" rounded color="primary"
          >Войти
        </v-btn>
      </v-card-actions>
    </v-card>
  </Dialog>
</template>

<script>
import Dialog from "../../components/common/Dialog";
import GoogleLoginButton from "@/plugins/authorizable_action/GoogleLoginButton";
import VKLoginButton from "@/plugins/authorizable_action/VKLoginButton";

export default {
  name: "AuthorizableAction",
  components: { VKLoginButton, GoogleLoginButton, Dialog },
  methods: {
    auth(provider) {
      const hello = this.hello;
      hello(provider)
        .login({ scope: "email" })
        .then(() => {
          const authRes = hello(provider).getAuthResponse();
          this.authorizeWithSocialToken(authRes, provider);
        });
    },
    authorizeWithSocialToken(data, provider) {
      this.$auth
        .login({
          data: this.getDataForProvider(data, provider),
          redirect: null,
        })
        .then((res) => {
          this.$auth.user(res.data.user);

          this.$snackbar(`Добро пожаловать, ${res.data.user.name}`);
          this.showDialog = false;
          window.getApp.$emit("successfulLogin");
        })
        .catch((res) => {
          if (res.response.status === 401) {
            this.$snackbar(res.response.data, "error");
          }
        });
    },
    getDataForProvider(data, provider) {
      if (provider === "vk") {
        return {
          email: data.email,
          token: data.access_token,
          provider: "vkontakte",
        };
      }
      if (provider === "google") {
        return {
          token: data.access_token,
          provider: "google",
        };
      }
    },
  },
};
</script>
