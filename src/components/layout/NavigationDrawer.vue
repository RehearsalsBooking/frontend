<template>
  <v-navigation-drawer
    :value="drawer"
    @input="$emit('input')"
    :clipped="$vuetify.breakpoint.lgAndUp"
    app
  >
    <v-list dense>
      <template v-for="item in items">
        <v-list-group
          v-if="item.children && ((item.auth && $auth.check()) || !item.auth)"
          :key="item.text"
          v-model="item.model"
          :prepend-icon="item.model ? item.icon : item['icon-alt']"
          append-icon=""
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="child in item.children"
            :key="child.text"
            :to="child.route"
          >
            <v-list-item-action v-if="child.icon">
              <v-icon>{{ child.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ child.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-list-item
          v-else-if="(item.auth && $auth.check()) || !item.auth"
          :key="item.text"
          :to="item.route"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ item.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
    <template v-slot:append v-if="$auth.check()">
      <div class="pa-2">
        <v-btn block color="primary" :to="'logout'"> Выйти </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>
<script>
export default {
  name: "NavigationDrawer",
  props: { drawer: Boolean },
  data: () => ({
    items: [
      {
        icon: "mdi-magnify",
        text: "Репточки",
        route: { path: "/organizations" },
        auth: false,
      },
      {
        icon: "mdi-chevron-up",
        "icon-alt": "mdi-chevron-down",
        text: "Профиль",
        model: false,
        auth: true,
        children: [
          {
            icon: "mdi-pencil",
            text: "Редактирование профиля",
            route: { path: "/profile/edit" },
            auth: true,
          },
          {
            icon: "mdi-calendar",
            text: "Мои репетиции",
            route: { path: "/profile/schedule" },
            auth: true,
          },
          {
            icon: "mdi-account-group",
            text: "Мои группы",
            route: { path: "/profile/bands" },
            auth: true,
          },
        ],
      },
    ],
  }),
  mounted() {
    this.$http.get("management/organizations").then((res) => {
      res.data.data.forEach((organization) => {
        // noinspection JSUnfilteredForInLoop
        this.items.push({
          icon: "mdi-chevron-up",
          "icon-alt": "mdi-chevron-down",
          text: organization.name,
          model: false,
          auth: true,
          children: [
            {
              icon: "mdi-cog",
              text: "Редактирование группы",
              route: {
                name: "organization/edit",
                params: { id: organization.id },
              },
              auth: true,
            },
          ],
        });
      });
    });
  },
};
</script>
