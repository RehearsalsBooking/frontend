<template>
  <v-list dense subheader>
    <v-subheader v-if="header">{{ header }}</v-subheader>
    <template v-for="item in items">
      <v-list-group
        v-if="item.children"
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
      <v-list-item v-else :key="item.text" :to="item.route">
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
</template>
<script>
export default {
  name: "NavigationDrawerSection",
  props: {
    items: [],
    header: {
      default: null,
    },
  },
};
</script>
