<template>
  <v-card v-if="rehearsal.id" v-bind="$attrs">
    <v-card-title>{{ rehearsal.starts_at | formatDateTime }}</v-card-title>
    <v-card-subtitle>{{ duration }}</v-card-subtitle>
    <v-card-text class="pb-0">
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
          >{{ rehearsal.organization.name }}
        </router-link>
      </div>
      <div>
        Забронировал:
        <router-link
          target="_blank"
          :to="{
            name: 'user',
            params: { id: rehearsal.user.id },
          }"
          >{{ rehearsal.user.name }}
        </router-link>
      </div>
      <div>Стоимость: {{ rehearsal.price }}</div>
      <div v-if="rehearsal.is_paid" class="success--text">Оплачено</div>
      <div v-else class="error--text">Не оплачено</div>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <EditRehearsal :rehearsal="rehearsal" :forManager="forManager" />
      <CancelRehearsal :rehearsal="rehearsal" />
    </v-card-actions>
  </v-card>
</template>

<script>
import moment from "moment";
import CancelRehearsal from "@/components/rehearsals/CancelRehearsal";
import EditRehearsal from "@/components/rehearsals/EditRehearsal";

export default {
  name: "RehearsalTile",
  components: { EditRehearsal, CancelRehearsal },
  props: {
    rehearsal: Object,
    forManager: {
      type: Boolean,
      required: true,
    },
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
