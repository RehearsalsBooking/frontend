import UserBands from "@/components/user/UserBands";
import ProfilePage from "@/pages/ProfilePage";
import UserProfileEdit from "@/components/user/UserProfileEdit";
import UserBandsPage from "@/pages/UserBandsPage";
import UserSchedulePage from "@/pages/UserSchedulePage";
import OrganizationsPage from "@/pages/OrganizationsPage";
import Organizations from "@/components/organizations/Organizations";
import OrganizationPage from "@/pages/OrganizationPage";
import UserPage from "@/pages/UserPage";
import BandPage from "@/pages/BandPage";
import BandsPage from "@/pages/BandsPage";
import BandCreatePage from "@/pages/BandCreatePage";
import BandEditPage from "@/pages/BandEditPage";
import BandEditMainInfo from "@/components/bands/BandEditMainInfo";
import BandEditMembers from "@/components/bands/BandEditMembers";
import BandInvites from "@/components/bands/BandInvites";
import ManagementHomePage from "@/pages/management/ManagementHomePage";
import OrganizationEditPage from "@/pages/management/OrganizationEditPage";
import OrganizationTimetablePage from "@/pages/management/OrganizationTimetablePage";
import OrganizationPricesPage from "@/pages/management/OrganizationPricesPage";
import OrganizationStatisticsPage from "@/pages/management/OrganizationStatisticsPage";
import NotFound from "@/pages/NotFound";

export default [
  {
    path: "/profile",
    exact: true,
    meta: {
      auth: true,
      title: "Мой профиль",
    },
    name: "profile",
    component: ProfilePage,
    children: [
      {
        path: "edit",
        meta: {
          auth: true,
          title: "Редактирование профиля",
        },
        name: "profile/edit",
        component: UserProfileEdit,
      },
      {
        path: "bands",
        meta: {
          auth: true,
          title: "Мои группы",
        },
        name: "profile/bands",
        component: UserBandsPage,
        children: [
          {
            path: "active",
            name: "active-bands",
            meta: {
              title: "Мои активные группы",
            },
            props: {
              membershipStatus: "active",
            },
            component: UserBands,
          },
          {
            path: "inactive",
            name: "inactive-bands",
            meta: {
              title: "Мои прошлые группы",
            },
            props: {
              membershipStatus: "inactive",
            },
            component: UserBands,
          },
        ],
      },
      {
        path: "schedule",
        meta: {
          auth: true,
          title: "Мои репетиции",
        },
        name: "profile/schedule",
        component: UserSchedulePage,
      },
    ],
  },

  {
    path: "/organizations",
    exact: true,
    component: OrganizationsPage,
    children: [
      {
        path: "/",
        name: "/organizations",
        meta: {
          title: "Репточки",
        },
        component: Organizations,
      },
      {
        path: ":id",
        props: true,
        meta: {
          title: "Репточки",
        },
        name: "organization",
        component: OrganizationPage,
      },
    ],
  },

  {
    path: "/users/:id",
    name: "user",
    exact: true,
    props: true,
    component: UserPage,
  },

  {
    path: "/bands",
    component: BandsPage,
    children: [
      {
        path: "create",
        name: "band-create",
        meta: {
          title: "Группы",
        },
        component: BandCreatePage,
      },
      {
        path: ":id",
        exact: true,
        props: true,
        meta: {
          title: "Группы",
        },
        name: "band",
        component: BandPage,
      },
      {
        path: ":id/edit",
        auth: true,
        props: true,
        meta: {
          title: "Группы",
        },
        component: BandEditPage,
        children: [
          {
            path: "main-info",
            meta: {
              auth: true,
            },
            props: true,
            name: "band-edit-main-info",
            component: BandEditMainInfo,
          },
          {
            path: "members",
            meta: {
              auth: true,
              title: "Состав группы",
            },
            props: true,
            name: "band-edit-members",
            component: BandEditMembers,
          },
          {
            path: "invites",
            meta: {
              auth: true,
              title: "Приглашения группы",
            },
            props: true,
            name: "band-edit-invites",
            component: BandInvites,
          },
        ],
      },
    ],
  },

  {
    path: "/management/organizations",
    component: ManagementHomePage,
    children: [
      {
        path: ":id/edit",
        auth: true,
        props: true,
        meta: {
          title: "Редактирование",
        },
        name: "organization/edit",
        component: OrganizationEditPage,
      },
      {
        path: ":id/timetable",
        auth: true,
        props: true,
        meta: {
          title: "Расписание",
        },
        name: "organization/timetable",
        component: OrganizationTimetablePage,
      },
      {
        path: ":id/prices",
        auth: true,
        props: true,
        meta: {
          title: "Цены",
        },
        name: "organization/prices",
        component: OrganizationPricesPage,
      },
      {
        path: ":id/statistics",
        auth: true,
        props: true,
        meta: {
          title: "Статистика",
        },
        name: "organization/statistics",
        component: OrganizationStatisticsPage,
      },
    ],
  },

  {
    path: "/",
    redirect: {
      path: "/organizations",
    },
  },

  {
    path: "*",
    name: "not-found",
    exact: true,
    component: NotFound,
  },
];
