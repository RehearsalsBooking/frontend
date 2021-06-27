<template>
  <v-btn icon @click="showDialog = true">
    <v-icon color="primary">mdi-pencil</v-icon>
    <Dialog v-model="showDialog" :max-width="'500px'">
      <v-card>
        <v-toolbar color="primary" dark flat class="mb-5">
          <v-toolbar-title class="mx-auto">Изменить репетицию</v-toolbar-title>
        </v-toolbar>
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
          <div v-if="forManager">
            <v-switch v-model="isConfirmed" label="Репетиция оплачена" />
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn
            class="mx-auto mb-3 pa-5"
            rounded
            color="primary"
            @click="showDialog = false"
          >
            Отмена
          </v-btn>
          <v-btn
            class="mx-auto mb-3 pa-5"
            rounded
            color="success"
            @click="editRehearsal"
          >
            Сохранить
          </v-btn>
        </v-card-actions>
      </v-card>
    </Dialog>
  </v-btn>
</template>
<script>
import Dialog from "@/components/common/Dialog";
import moment from "moment";

export default {
  name: "EditRehearsal",
  components: { Dialog },
  props: {
    rehearsal: Object,
    forManager: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      showDialog: false,
      isConfirmed: null,
    };
  },
  mounted() {
    this.isConfirmed = this.rehearsal.is_confirmed;
  },
  watch: {
    showDialog(val) {
      if (val) {
        this.isConfirmed = this.rehearsal.is_confirmed;
      }
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
    updateUrl() {
      return this.forManager
        ? `/management/rehearsals/${this.rehearsal.id}/status`
        : `/rehearsals/${this.rehearsal.id}`;
    },
  },
  methods: {
    editRehearsal() {
      this.$http
        .put(this.updateUrl, {
          is_confirmed: this.isConfirmed,
        })
        .then(() => {
          this.showDialog = false;
          this.$snackbar("Репетиция обновлена");
        });
    },
  },
};
</script>

<style scoped></style>
