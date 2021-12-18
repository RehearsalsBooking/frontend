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
import HelloJs from "hellojs";
import VueHello from "vue-hellojs";
import * as Sentry from "@sentry/vue";
import { Integrations } from "@sentry/tracing";

Vue.config.productionTip = false;

Vue.router = router;

axios.defaults.baseURL = process.env.VUE_APP_BACKEND_URL;

Vue.use(VueAxios, axios);

Vue.use(VueSync);

Vue.use(VSnackbarNotification);
Vue.use(AuthorizableAction);

Vue.use(auth, AuthOptions);

Vue.use(TiptapVuetifyPlugin, {
  vuetify,
  iconsGroup: "mdi",
});

HelloJs.init(
  {
    google:
      "658456783577-fjialvns80jrvjg1rbiq0ibavjrq81gv.apps.googleusercontent.com",
    vk: "8030309",
  },
  {
    redirect_uri: process.env.VUE_APP_OAUTH_REDIRECT_URL,
  }
);
Vue.use(VueHello, HelloJs);

Vue.use(VueApexCharts);
Vue.component("apexchart", VueApexCharts);

if (process.env.NODE_ENV === "production") {
  Sentry.init({
    Vue,
    dsn: "https://eff0722eeb8f4099b6436ed0e81688fc@o1024486.ingest.sentry.io/5990330",
    integrations: [
      new Integrations.BrowserTracing({
        routingInstrumentation: Sentry.vueRouterInstrumentation(router),
        tracingOrigins: ["festic.ru", /^\//],
      }),
    ],
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 0.5,
  });
}

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
