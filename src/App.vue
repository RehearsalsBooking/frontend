<template>
  <v-app id="inspire">
    <NavigationDrawer v-model="drawer" />

    <AppBar v-model="drawer" />
    <v-main>
      <v-alert v-if="env !== 'production'" type="info" text>
        Это демо-приложение. Все данные не реальны и сгенерированы случайно.
        <a href="https://app.festic.ru">Перейти в реальное приложение</a>
      </v-alert>
      <router-view></router-view>
      <v-snackbar-notification />
    </v-main>
  </v-app>
</template>

<script>
import NavigationDrawer from "./components/layout/NavigationDrawer";
import AppBar from "./components/layout/AppBar";
import axios from "axios";
import { mapActions } from "vuex";

export default {
  components: { AppBar, NavigationDrawer },
  data() {
    return {
      drawer: false,
    };
  },
  computed: {
    env() {
      return process.env.VUE_APP_ENV;
    },
  },
  methods: {
    ...mapActions({
      fetchUser: "auth/fetchUser",
    }),
  },
  created() {
    window.getApp = this;
    this.drawer = this.$vuetify.breakpoint.lgAndUp;
    axios.interceptors.response.use(
      function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
      },
      (error) => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        if (error.response.status === 403) {
          this.$snackbar("Вам запрещено это действие", "error");
        }
        if (error.response.status === 401) {
          this.$snackbar("Необходима авторизация", "error");
        }
        return Promise.reject(error);
      }
    );
  },
};
</script>
