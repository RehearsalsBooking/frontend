export default [
  {
    path: "/logout",
    meta: {
      auth: true,
    },
    name: "logout",
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        `../components/auth/Logout`
      ),
  },

  {
    path: "/profile",
    exact: true,
    meta: {
      auth: true,
      title: "Мой профиль",
    },
    name: "profile",
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        `../pages/ProfilePage.vue`
      ),
    children: [
      {
        path: "edit",
        meta: {
          auth: true,
          title: "Редактирование профиля",
        },
        name: "profile/edit",
        component: () =>
          import(
            /* webpackChunkName: "routes" */
            `../components/user/UserProfileEdit.vue`
          ),
      },
      {
        path: "bands",
        meta: {
          auth: true,
          title: "Мои группы",
        },
        name: "profile/bands",
        component: () =>
          import(
            /* webpackChunkName: "routes" */
            `../pages/UserBandsPage.vue`
          ),
      },
    ],
  },

  {
    path: "/organizations",
    exact: true,
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        `../pages/OrganizationsPage.vue`
      ),
    children: [
      {
        path: "/",
        name: "/organizations",
        meta: {
          title: "Репточки",
        },
        component: () =>
          import(
            /* webpackChunkName: "routes" */
            `../components/organizations/Organizations.vue`
          ),
      },
      {
        path: ":id",
        props: true,
        meta: {
          title: "Репточки",
        },
        name: "organization",
        component: () =>
          import(
            /* webpackChunkName: "routes" */
            `../pages/OrganizationDetailPage`
          ),
      },
    ],
  },
  {
    path: "*",
    redirect: {
      path: "/organizations",
    },
  },
];
