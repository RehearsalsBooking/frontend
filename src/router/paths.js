export default [
  {
    path: "*",
    meta: {
      auth: true,
    },
    redirect: {
      path: "/organizations",
    },
  },

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
    path: "/organizations",
    exact: true,
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        `../pages/OrganizationsPage.vue`
      ),
    children: [
      {
        path: "",
        name: "organizations",
        meta: {
          title: "Организации",
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
          title: "Организации",
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
];
