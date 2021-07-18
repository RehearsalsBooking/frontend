<template>
  <v-navigation-drawer
    :value="drawer"
    @input="$emit('input')"
    :clipped="$vuetify.breakpoint.lgAndUp"
    app
  >
    <NavigationDrawerSection :items="general" />
    <NavigationDrawerSection
      header="Мой профиль"
      :items="profile"
      v-if="$auth.check()"
    />
    <NavigationDrawerSection
      header="Мои репточки"
      :items="management"
      v-if="management.length > 0"
    />
    <template v-slot:append v-if="$auth.check()">
      <div class="pa-2">
        <v-btn block color="primary" :to="'logout'"> Выйти</v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>
<script>
import NavigationDrawerSection from "@/components/layout/NavigationDrawerSection";

export default {
  name: "NavigationDrawer",
  components: { NavigationDrawerSection },
  props: { drawer: Boolean },
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
        route: { path: "/profile/bands" },
      },
    ],
    management: [],
  }),
  mounted() {
    this.$http.get("management/organizations").then((res) => {
      res.data.data.forEach((organization) => {
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
    });
  },
};
</script>
