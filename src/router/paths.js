export default [
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
      {
        path: "schedule",
        meta: {
          auth: true,
          title: "Мои репетиции",
        },
        name: "profile/schedule",
        component: () =>
          import(
            /* webpackChunkName: "routes" */
            `../pages/UserSchedulePage.vue`
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
    path: "/users/:id",
    name: "user",
    exact: true,
    props: true,
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        `../pages/UserPage.vue`
      ),
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
        auth: true,
        props: true,
        meta: {
          title: "Группы",
        },
        component: () =>
          import(
            /* webpackChunkName: "routes" */
            `../pages/BandEditPage`
          ),
        children: [
          {
            path: "",
            meta: {
              auth: true,
            },
            props: true,
            name: "band-edit-main-info",
            component: () =>
              import(
                /* webpackChunkName: "routes" */
                `../components/bands/BandEditMainInfo.vue`
              ),
          },
          {
            path: "members",
            meta: {
              auth: true,
              title: "Состав группы",
            },
            props: true,
            name: "band-edit-members",
            component: () =>
              import(
                /* webpackChunkName: "routes" */
                `../components/bands/BandEditMembers.vue`
              ),
          },
          {
            path: "invites",
            meta: {
              auth: true,
              title: "Приглашения группы",
            },
            props: true,
            name: "band-edit-invites",
            component: () =>
              import(
                /* webpackChunkName: "routes" */
                `../components/bands/BandInvites.vue`
              ),
          },
        ],
      },
    ],
  },

  {
    path: "/management/organizations",
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        `../pages/management/ManagementHomePage.vue`
      ),
    children: [
      {
        path: ":id/edit",
        auth: true,
        props: true,
        meta: {
          title: "Редактирование",
        },
        name: "organization/edit",
        component: () =>
          import(
            /* webpackChunkName: "routes" */
            `../pages/management/OrganizationEditPage.vue`
          ),
      },
      {
        path: ":id/timetable",
        auth: true,
        props: true,
        meta: {
          title: "Расписание",
        },
        name: "organization/timetable",
        component: () =>
          import(
            /* webpackChunkName: "routes" */
            `../pages/management/OrganizationTimetablePage.vue`
          ),
      },
      {
        path: ":id/prices",
        auth: true,
        props: true,
        meta: {
          title: "Цены",
        },
        name: "organization/prices",
        component: () =>
          import(
            /* webpackChunkName: "routes" */
            `../pages/management/OrganizationPricesPage.vue`
          ),
      },
      {
        path: ":id/statistics",
        auth: true,
        props: true,
        meta: {
          title: "Статистика",
        },
        name: "organization/statistics",
        component: () =>
          import(
            /* webpackChunkName: "routes" */
            `../pages/management/OrganizationStatisticsPage.vue`
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
