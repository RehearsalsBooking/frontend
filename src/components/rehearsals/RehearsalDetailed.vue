<template>
  <v-card v-if="rehearsal.id" v-bind="$attrs">
    <v-card-title>{{ rehearsal.starts_at | formatDateTime }}</v-card-title>
    <v-card-subtitle>{{ duration }}</v-card-subtitle>
    <v-card-text>
      <div>
        {{ type }}
        <template v-if="!rehearsal.is_individual">
          <router-link
            target="_blank"
            :to="{ name: 'band', params: { id: this.rehearsal.band.id } }"
          >
            {{ rehearsal.band.name }}
          </router-link>
        </template>
      </div>
      <div>
        Репточка:
        <router-link
          target="_blank"
          :to="{
            name: 'organization',
            params: { id: rehearsal.organization.id },
          }"
          >{{ rehearsal.organization.name }}</router-link
        >
      </div>
      <div>
        Забронировал:
        <router-link
          target="_blank"
          :to="{
            name: 'user',
            params: { id: rehearsal.user.id },
          }"
          >{{ rehearsal.user.name }}</router-link
        >
      </div>
      <div>Стоимость: {{ rehearsal.price }}</div>
    </v-card-text>
  </v-card>
</template>

<script>
import moment from "moment";

export default {
  name: "RehearsalTile",
  props: {
    rehearsal: Object,
  },
  computed: {
    duration() {
      return (
        moment(this.rehearsal.ends_at).diff(this.rehearsal.starts_at, "hour") +
        " ч."
      );
    },
    type() {
      return this.rehearsal.is_individual ? "Индивидуальная" : "С группой:";
    },
  },
};
</script>
