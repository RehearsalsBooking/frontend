<template>
  <v-list three-line>
    <template v-for="member in members">
      <v-list-item :key="member.title">
        <v-list-item-avatar>
          <v-img :src="member.avatar"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <!--TODO: add link to user profile-->
          <v-list-item-title>{{ member.name }}</v-list-item-title>
          <v-list-item-subtitle>роль в группе</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-list>
</template>

<script>
export default {
  name: "BandMembers",
  props: {
    members: Array,
  },
};
</script>
