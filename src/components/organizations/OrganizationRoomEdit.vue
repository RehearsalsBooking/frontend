<template>
  <v-dialog v-model="dialog" persistent max-width="600">
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on.stop="on">
        <v-icon color="primary"> mdi-pencil</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="headline text-break">
        Изменить название комнаты
      </v-card-title>
      <v-card-text>
        <v-text-field label="Название комнаты" required v-model="newName" />
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary darken-1" text @click="dialog = false">
          Отмена
        </v-btn>
        <v-btn color="success darken-1" text @click="editRoom">
          Сохранить
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "OrganizationRoomEdit",
  props: {
    room: Object,
    organizationId: [Number, String],
  },
  data() {
    return {
      dialog: false,
      newName: "",
    };
  },
  mounted() {
    this.newName = this.room.name;
  },
  methods: {
    editRoom() {
      this.$http
        .put(
          `management/organizations/${this.organizationId}/rooms/${this.room.id}`,
          {
            name: this.newName,
          }
        )
        .then(() => {
          this.dialog = false;
          this.$snackbar("Комната успешно обновлена");
          this.$emit("roomNameEdited", this.newName);
        });
    },
  },
};
</script>
