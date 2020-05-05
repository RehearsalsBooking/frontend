import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import VueAxios from "vue-axios";
import router from "./router/";
import VueSync from "vue-sync";
import auth from "@websanova/vue-auth";
import AuthOptions from "./auth/options";
import VSnackbarNotification from "./plugins/snackbar_notification";

Vue.config.productionTip = false;

Vue.router = router;

axios.defaults.baseURL = "http://api.rehearsals.local:8000/";
Vue.use(VueAxios, axios);

Vue.use(VueSync);

Vue.use(VSnackbarNotification);

Vue.use(auth, AuthOptions);
new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");
