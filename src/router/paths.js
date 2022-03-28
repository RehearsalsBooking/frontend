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
import OrganizationRoomsPage from "@/pages/management/OrganizationRoomsPage";
import AuthRedirectPage from "@/pages/AuthRedirectPage";
import AuthPage from "@/pages/AuthPage";
import store from "../store/index.js";
import RegistrationPage from "@/pages/RegistrationPage";
import PasswordResetPage from "@/pages/PasswordResetPage";
import EmailUpdatePage from "@/pages/EmailUpdatePage";

const ifAuthenticated = async (to, from, next) => {
  if (store.getters["auth/isAuthenticated"]) {
    next();
    return;
  }
  next({ name: "login" });
};

const ifNotAuthenticated = async (to, from, next) => {
  if (!store.getters["auth/isAuthenticated"]) {
    next();
    return;
  }
  next("/");
};
export default [
  {
    path: "/profile",
    exact: true,
    beforeEnter: ifAuthenticated,
    meta: {
      title: "Мой профиль",
    },
    name: "profile",
    component: ProfilePage,
    children: [
      {
        path: "edit",
        beforeEnter: ifAuthenticated,
        meta: {
          title: "Редактирование профиля",
        },
        name: "profile/edit",
        component: UserProfileEdit,
      },
      {
        path: "email",
        beforeEnter: ifAuthenticated,
        meta: {
          title: "Редактирование почты",
        },
        name: "email-update",
        component: EmailUpdatePage,
      },
      {
        path: "bands",
        beforeEnter: ifAuthenticated,
        meta: {
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
        beforeEnter: ifAuthenticated,
        meta: {
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
        beforeEnter: ifAuthenticated,
        props: true,
        meta: {
          title: "Группы",
        },
        component: BandEditPage,
        children: [
          {
            path: "main-info",
            beforeEnter: ifAuthenticated,
            props: true,
            name: "band-edit-main-info",
            component: BandEditMainInfo,
          },
          {
            path: "members",
            beforeEnter: ifAuthenticated,
            meta: {
              title: "Состав группы",
            },
            props: true,
            name: "band-edit-members",
            component: BandEditMembers,
          },
          {
            path: "invites",
            beforeEnter: ifAuthenticated,
            meta: {
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
        beforeEnter: ifAuthenticated,
        props: true,
        meta: {
          title: "Редактирование",
        },
        name: "organization/edit",
        component: OrganizationEditPage,
      },
      {
        path: ":id/timetable",
        beforeEnter: ifAuthenticated,
        props: true,
        meta: {
          title: "Расписание",
        },
        name: "organization/timetable",
        component: OrganizationTimetablePage,
      },
      {
        path: ":id/prices",
        beforeEnter: ifAuthenticated,
        props: true,
        meta: {
          title: "Цены",
        },
        name: "organization/prices",
        component: OrganizationPricesPage,
      },
      {
        path: ":id/statistics",
        beforeEnter: ifAuthenticated,
        props: true,
        meta: {
          title: "Статистика",
        },
        name: "organization/statistics",
        component: OrganizationStatisticsPage,
      },
      {
        path: ":id/rooms",
        beforeEnter: ifAuthenticated,
        props: true,
        meta: {
          title: "Комнаты",
        },
        name: "organization/rooms",
        component: OrganizationRoomsPage,
      },
    ],
  },

  {
    path: "/auth/:provider/callback",
    props: true,
    meta: {
      title: "Авторизация",
    },
    component: AuthRedirectPage,
    beforeEnter: ifNotAuthenticated,
  },

  {
    path: "/auth",
    props: true,
    meta: {
      title: "Авторизация",
    },
    component: AuthPage,
    name: "login",
    beforeEnter: ifNotAuthenticated,
  },
  {
    path: "/registration",
    props: true,
    meta: {
      title: "Авторизация",
    },
    component: RegistrationPage,
    name: "registration",
    beforeEnter: ifNotAuthenticated,
  },
  {
    path: "/reset-password",
    props: true,
    meta: {
      title: "Восстановление пароля",
    },
    component: PasswordResetPage,
    name: "password-recovery-link",
    beforeEnter: ifNotAuthenticated,
  },

  {
    path: "/",
    redirect: {
      path: "/organizations",
    },
    name: "main",
  },

  {
    path: "*",
    name: "not-found",
    exact: true,
    component: NotFound,
  },
];
