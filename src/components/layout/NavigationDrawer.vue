<template>
  <v-navigation-drawer
    :value="value"
    @input="$emit('input', $event)"
    :clipped="$vuetify.breakpoint.lgAndUp"
    app
  >
    <div class="text-center pa-4"><h1>Меню</h1></div>
    <NavigationDrawerSection :items="general" />
    <NavigationDrawerSection
      header="Мой профиль"
      :items="profile"
      v-if="isAuthenticated"
    />
    <v-fade-transition>
      <NavigationDrawerSection
        header="Мои репточки"
        :items="management"
        v-if="management.length > 0"
      />
    </v-fade-transition>
    <template v-slot:append v-if="isAuthenticated">
      <div class="pa-2">
        <LogoutButton />
      </div>
    </template>
  </v-navigation-drawer>
</template>
<script>
import NavigationDrawerSection from "@/components/layout/NavigationDrawerSection";
import LogoutButton from "@/components/auth/LogoutButton";
import { mapGetters } from "vuex";

export default {
  name: "NavigationDrawer",
  components: { LogoutButton, NavigationDrawerSection },
  props: { value: Boolean },
  data: () => ({
    general: [
      {
        icon: "mdi-magnify",
        text: "Репточки",
        route: { path: "/organizations" },
      },
    ],
    profile: [
      {
        icon: "mdi-pencil",
        text: "Редактирование профиля",
        route: { path: "/profile/edit" },
      },
      {
        icon: "mdi-calendar",
        text: "Мои репетиции",
        route: { path: "/profile/schedule" },
      },
      {
        icon: "mdi-account-group",
        text: "Мои группы",
        route: { path: "/profile/bands/active" },
      },
    ],
    management: [],
  }),
  computed: {
    ...mapGetters({
      isAuthenticated: "auth/isAuthenticated",
      user: "auth/getUser",
    }),
  },
  watch: {
    isAuthenticated() {
      this.getOrganizationsMenu();
    },
  },
  mounted() {
    this.getOrganizationsMenu();
  },
  methods: {
    getOrganizationsMenu() {
      console.log(this.isAuthenticated);
      if (!this.isAuthenticated) {
        this.management = [];
        return;
      }
      this.user.organizations.forEach((organization) => {
        // noinspection JSUnfilteredForInLoop
        this.management.push({
          icon: "mdi-chevron-up",
          "icon-alt": "mdi-chevron-down",
          text: organization.name,
          model: false,
          children: [
            {
              icon: "mdi-cog",
              text: "Редактирование",
              route: {
                name: "organization/edit",
                params: { id: organization.id },
              },
            },
            {
              icon: "mdi-calendar-blank-multiple",
              text: "Комнаты",
              route: {
                name: "organization/rooms",
                params: { id: organization.id },
              },
            },
            {
              icon: "mdi-calendar",
              text: "Расписание",
              route: {
                name: "organization/timetable",
                params: { id: organization.id },
              },
            },
            {
              icon: "mdi-currency-rub",
              text: "Цены",
              route: {
                name: "organization/prices",
                params: { id: organization.id },
              },
            },
            {
              icon: "mdi-chart-line",
              text: "Статистика",
              route: {
                name: "organization/statistics",
                params: { id: organization.id },
              },
            },
          ],
        });
      });
    },
  },
};
</script>
