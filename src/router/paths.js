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
            `../pages/OrganizationPage`
          ),
      },
    ],
  },
  {
    path: "/bands",
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        `../pages/BandsPage.vue`
      ),
    children: [
      {
        path: "/",
        name: "bands",
        meta: {
          title: "Группы",
        },
        component: () =>
          import(
            /* webpackChunkName: "routes" */
            `../components/organizations/Organizations.vue`
          ),
      },
      {
        path: ":id",
        exact: true,
        props: true,
        meta: {
          title: "Группы",
        },
        name: "band",
        component: () =>
          import(
            /* webpackChunkName: "routes" */
            `../pages/BandPage`
          ),
      },
      {
        path: ":id/edit",
        name: "band-edit",
        props: true,
        meta: {
          title: "Группы",
        },
        component: () =>
          import(
            /* webpackChunkName: "routes" */
            `../pages/BandEditPage`
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
