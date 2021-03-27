<template>
  <div class="pb-2 overflow-hidden">
    <div class="text-center mb-2">
      <b>Администратор</b>
    </div>
    <v-list dense nav class="py-0">
      <v-list-item>
        <v-list-item-avatar>
          <img
            src="https://randomuser.me/api/portraits/men/81.jpg"
            :alt="owner.name"
          />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ owner.name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item
        v-for="item in items"
        :key="item.title"
        :href="item.link"
        target="_blank"
      >
        <v-list-item-icon>
          <v-icon color="primary">{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  name: "OrganizationOwner",
  props: {
    owner: Object,
  },
  data() {
    return {
      items: [
        {
          icon: "mdi-email",
          title: this.owner.contacts.public_email,
          link: `mailto:${this.owner.contacts.public_email}`,
        },
        { icon: "mdi-phone", title: this.owner.contacts.phone },
        {
          icon: "mdi-vk",
          title: this.owner.contacts.link,
          link: this.owner.contacts.link,
        },
      ],
    };
  },
};
</script>

<style scoped></style>
