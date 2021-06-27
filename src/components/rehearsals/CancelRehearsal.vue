<template>
  <v-btn icon @click="showDialog = true">
    <v-icon color="error">mdi-delete</v-icon>
    <Dialog v-model="showDialog" :max-width="'500px'">
      <v-card>
        <v-toolbar color="primary" dark flat class="mb-5">
          <v-toolbar-title class="mx-auto"
            >Вы действительно хотите отменить репетицию?</v-toolbar-title
          >
        </v-toolbar>
        <v-card-text> Это действие нельзя будет отменить </v-card-text>
        <v-card-actions>
          <v-btn
            class="mx-auto mb-3 pa-5"
            rounded
            color="primary"
            @click="showDialog = false"
          >
            Я передумал
          </v-btn>
          <v-btn
            class="mx-auto mb-3 pa-5"
            rounded
            color="error"
            @click="cancelRehearsal"
          >
            Отменить репетицию
          </v-btn>
        </v-card-actions>
      </v-card>
    </Dialog>
  </v-btn>
</template>
<script>
import Dialog from "@/components/common/Dialog";
import { EventBus } from "@/event-bus";

export default {
  name: "CancelRehearsal",
  components: { Dialog },
  props: {
    rehearsal: Object,
  },
  data() {
    return {
      showDialog: false,
    };
  },
  methods: {
    cancelRehearsal() {
      this.$http.delete(`/rehearsals/${this.rehearsal.id}`).then(() => {
        this.showDialog = false;
        this.$snackbar("Репетиция отменена");
        EventBus.$emit("rehearsals-changed");
      });
    },
  },
};
</script>
