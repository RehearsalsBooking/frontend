<template>
  <Dialog v-model="showDialog" :max-width="'500px'">
    <v-card>
      <v-toolbar color="primary" dark flat class="mb-5">
        <v-toolbar-title class="mx-auto">{{ title }}</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <GoogleLoginButton @click="auth('google')" />
      </v-card-text>
      <v-card-actions>
        <v-btn
          class="mx-auto mb-3"
          width="50%"
          rounded
          color="primary"
          @click="login"
          :loading="loading"
          >Войти</v-btn
        >
      </v-card-actions>
    </v-card>
  </Dialog>
</template>

<script>
import Dialog from "../../components/common/Dialog";
import GoogleLoginButton from "@/plugins/authorizable_action/GoogleLoginButton";

export default {
  name: "AuthorizableAction",
  components: { GoogleLoginButton, Dialog },
  methods: {
    auth(provider) {
      const hello = this.hello;
      hello(provider)
        .login({ scope: "email" })
        .then(() => {
          const authRes = hello(provider).getAuthResponse();
          this.authorizeWithSocialToken(authRes.access_token, provider);
        });
    },
    authorizeWithSocialToken(token, provider) {
      this.$auth
        .login({
          data: {
            token: token,
            provider: provider,
          },
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
    login() {
      if (this.$refs.form.validate()) {
        this.$http.get("/sanctum/csrf-cookie").then(() => {
          this.$auth
            .login({
              data: {
                email: this.email,
                password: this.password,
              },
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
        });
      }
    },
  },
};
</script>
