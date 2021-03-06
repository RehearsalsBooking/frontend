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
import AuthorizableAction from "./plugins/authorizable_action/authorizable_action";
import "@/filters";
import { TiptapVuetifyPlugin } from "tiptap-vuetify";
import VueApexCharts from "vue-apexcharts";
import "tiptap-vuetify/dist/main.css";

Vue.config.productionTip = false;

Vue.router = router;

axios.defaults.baseURL = "http://api.rehearsals.local:8000/";
Vue.use(VueAxios, axios);

Vue.use(VueSync);

Vue.use(VSnackbarNotification);
Vue.use(AuthorizableAction);

Vue.use(auth, AuthOptions);

Vue.use(TiptapVuetifyPlugin, {
  vuetify,
  iconsGroup: "mdi",
});

Vue.use(VueApexCharts);
Vue.component("apexchart", VueApexCharts);

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
