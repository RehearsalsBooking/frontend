export default [
  {
    path: "*",
    meta: {
      auth: true
    },
    redirect: {
      path: "/404"
    }
  },

  {
    path: "/404",
    meta: {
      auth: true,
      title: "Страница не найдена"
    },
    name: "NotFound",
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        `../pages/NotFound.vue`
      )
  },

  {
    path: "/",
    exact: true,
    meta: {
      auth: true,
      title: "Главная"
    },
    name: "Home",
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        `../pages/Home.vue`
      )
  },

  {
    path: "/organizations",
    exact: true,
    meta: {
      title: "Организации"
    },
    name: "organizations",
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        `../pages/OrganizationsPage.vue`
      )
  }
];
