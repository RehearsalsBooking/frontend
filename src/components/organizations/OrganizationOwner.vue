<template>
  <v-card height="345" class="overflow-hidden">
    <v-navigation-drawer :right="true" :permanent="true">
      <v-list dense nav class="py-0">
        <v-list-item two-line>
          <v-list-item-avatar>
            <img
              src="https://randomuser.me/api/portraits/men/81.jpg"
              :alt="owner.name"
            />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ owner.name }}</v-list-item-title>
            <v-list-item-subtitle>администратор</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <!-- TODO: owner contact information-->
        contacts
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
export default {
  name: "OrganizationOwner",
  props: {
    owner: Object
  },
  data() {
    return {
      items: [
        { icon: "mdi-email", title: "some@email.com" },
        { icon: "mdi-phone", title: "81231231234" },
        { icon: "mdi-vk", title: "vk.com/belamov" }
      ]
    };
  }
};
</script>

<style scoped></style>
