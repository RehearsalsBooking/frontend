import Vue from "vue";
import Router from "vue-router";
import paths from "./paths";
import store from "../store";
Vue.use(Router);

const router = new Router({
  base: "/",
  mode: "history",
  hashbang: false,
  linkActiveClass: "active",
  routes: paths,
});

router.beforeEach(async (to, from, next) => {
  await store.dispatch("auth/fetchUser");
  document.title = to.meta.title;
  next();
});

export default router;
