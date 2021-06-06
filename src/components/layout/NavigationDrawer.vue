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
          :to="{ name: item.route }"
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
        route: "/organizations",
        auth: false,
      },
      {
        icon: "mdi-chevron-up",
        "icon-alt": "mdi-chevron-down",
        text: "Профиль",
        model: true,
        auth: true,
        children: [
          {
            icon: "mdi-pencil",
            text: "Редактирование профиля",
            route: "/profile/edit",
            auth: true,
          },
          {
            icon: "mdi-calendar",
            text: "Мои репетиции",
            route: "/profile/schedule",
            auth: true,
          },
          {
            icon: "mdi-account-group",
            text: "Мои группы",
            route: "/profile/bands",
            auth: true,
          },
        ],
      },

      // { icon: "mdi-calendar", text: "Мои репетиции", auth: true },
      { icon: "mdi-logout", text: "Выход", route: "logout", auth: true },
      // {
      //   icon: "mdi-chevron-up",
      //   "icon-alt": "mdi-chevron-down",
      //   text: "More",
      //   model: false,
      //   children: [
      //     { text: "Import" },
      //     { text: "Export" },
      //     { text: "Print" },
      //     { text: "Undo changes" },
      //     { text: "Other contacts" },
      //   ],
      // },
    ],
  }),
};
</script>
