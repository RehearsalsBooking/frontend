<template>
  <v-dialog v-model="dialog" persistent max-width="600">
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on">
        <slot name="icon">
          <v-icon color="error"> mdi-delete</v-icon>
        </slot>
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="headline text-break">
        Вы действительно хотите удалить комнату?
      </v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary darken-1" text @click="dialog = false">
          Отмена
        </v-btn>
        <v-btn color="error darken-1" text @click="removeRoom"> Удалить </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "OrganizationRoomDelete",
  props: {
    organizationId: [Number, String],
    room: Object,
  },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    removeRoom() {
      this.$http
        .delete(
          `management/organizations/${this.organizationId}/rooms/${this.room.id}`
        )
        .then(() => {
          this.dialog = false;
          this.$emit("removed", this.room.id);
          this.$snackbar("Комната успешно удалена");
        })
        .catch((res) => {
          if (res.response.status === 403) {
            this.$snackbar(
              "Нельзя удалить комнату. У комнаты не должно быть запланировано репетиций",
              "error"
            );
          }
        });
    },
  },
};
</script>
