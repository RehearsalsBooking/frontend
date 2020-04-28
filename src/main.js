import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import VueAxios from "vue-axios";
import router from "./router/";
import VueSync from "vue-sync";

Vue.config.productionTip = false;

Vue.router = router;

axios.defaults.baseURL = "http://localhost:8000/";
Vue.use(VueAxios, axios);

Vue.use(VueSync);

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");
