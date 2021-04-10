<template>
  <v-list three-line max-width="600">
    <template v-for="member in members">
      <v-list-item :key="member.title">
        <v-list-item-avatar>
          <v-img :src="member.avatar"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <!--TODO: add link to user profile-->
          <v-list-item-title>{{ member.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ member.role }}</v-list-item-subtitle>
          <v-list-item-subtitle>
            Присоединился {{ member.joined_at | formatDate }}
          </v-list-item-subtitle>
        </v-list-item-content>
        <slot name="actions" v-bind:member="member" v-bind:band="band"></slot>
        <v-list-item-action
          v-if="member.id === $auth.user().id && !band.is_admin"
        >
          <BandMembersLeave
            :member="member"
            :band="band"
            @memberDeleted="$emit('memberDeleted', $event)"
          />
        </v-list-item-action>
      </v-list-item>
    </template>
  </v-list>
</template>

<script>
import BandMembersLeave from "@/components/bands/BandMembersLeave";

export default {
  name: "BandMembers",
  components: { BandMembersLeave },
  props: {
    members: {
      type: Array,
      required: true,
    },
    band: {
      type: Object,
      required: true,
    },
  },
};
</script>
