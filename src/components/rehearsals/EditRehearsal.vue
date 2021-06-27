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
          <div>
            {{ rehearsal.starts_at | formatDateTime }}, на {{ duration }}
          </div>
          <div>Стоимость: {{ rehearsal.price }}</div>
          <div v-if="forManager">
            <v-switch v-model="newIsConfirmed" label="Репетиция оплачена" />
          </div>
          <div v-else>
            <div v-if="rehearsal.is_confirmed" class="success--text">
              Оплачено
            </div>
            <div v-else class="error--text">Не оплачено</div>
          </div>
          <div v-if="!forManager" class="mt-5">
            <h3>Выбрать новое время</h3>
            <RehearsalTimeInput :period.sync="newTime" />
            <OrganizationBookingPriceCalculation
              :price.sync="newPrice"
              :time="newTime"
              :organizationId="rehearsal.organization.id"
            />
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
import RehearsalTimeInput from "@/components/common/RehearsalTimeInput";
import OrganizationBookingPriceCalculation from "@/components/organizations/OrganizationBookingPriceCalculation";
import { EventBus } from "@/event-bus";

export default {
  name: "EditRehearsal",
  components: {
    OrganizationBookingPriceCalculation,
    RehearsalTimeInput,
    Dialog,
  },
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
      newIsConfirmed: null,
      newTime: {
        from: null,
        to: null,
      },
      newPrice: null,
    };
  },
  mounted() {
    this.newIsConfirmed = this.rehearsal.is_confirmed;
  },
  watch: {
    showDialog(val) {
      if (val) {
        this.newIsConfirmed = this.rehearsal.is_confirmed;
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
          is_confirmed: this.newIsConfirmed,
          starts_at: this.newTime.from,
          ends_at: this.newTime.to,
        })
        .then(() => {
          this.showDialog = false;
          this.$snackbar("Репетиция обновлена");
          EventBus.$emit("rehearsals-changed");
        })
        .catch((err) => {
          if (err.response.status === 403) {
            this.$snackbar("Вы не можете изменить репетицию.", "error");
          }
        });
    },
  },
};
</script>

<style scoped></style>
