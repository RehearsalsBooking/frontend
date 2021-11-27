<template>
  <v-dialog v-model="dialog" persistent max-width="600">
    <template v-slot:activator="{ on, attrs }">
      <v-btn block color="success" v-bind="attrs" v-on.stop="on" rounded>
        Добавить комнату
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="headline text-break">
        Добавление комнаты
      </v-card-title>
      <v-card-text>
        <v-text-field label="Название комнаты" required v-model="name" />
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary darken-1" text @click="dialog = false">
          Отмена
        </v-btn>
        <v-btn color="success darken-1" text @click="addRoom">
          Сохранить
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "OrganizationRoomAdd",
  props: {
    organizationId: [Number, String],
  },
  data() {
    return {
      dialog: false,
      name: "",
    };
  },
  methods: {
    addRoom() {
      this.$http
        .post(`management/organizations/${this.organizationId}/rooms`, {
          name: this.name,
        })
        .then(() => {
          this.dialog = false;
          this.$snackbar("Комната успешно добавлена");
          this.$emit("roomAdded");
        });
    },
  },
};
</script>
