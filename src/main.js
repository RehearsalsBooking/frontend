import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import VueAxios from "vue-axios";
import router from "./router/";
import VueSync from "vue-sync";
import VSnackbarNotification from "./plugins/snackbar_notification";
import "@/filters";
import { TiptapVuetifyPlugin } from "tiptap-vuetify";
import VueApexCharts from "vue-apexcharts";
import "tiptap-vuetify/dist/main.css";
import * as Sentry from "@sentry/vue";
import { Integrations } from "@sentry/tracing";
import store from "./store";

Vue.config.productionTip = false;

Vue.router = router;

axios.defaults.baseURL = process.env.VUE_APP_BACKEND_URL;
axios.defaults.withCredentials = true;

Vue.use(VueAxios, axios);

Vue.use(VueSync);

Vue.use(VSnackbarNotification);

Vue.use(TiptapVuetifyPlugin, {
  vuetify,
  iconsGroup: "mdi",
});

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
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
