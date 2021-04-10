<template>
  <v-dialog v-model="dialog" persistent max-width="600">
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on">
        <v-icon color="primary"> mdi-pencil </v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="headline"> Изменить роль участника </v-card-title>
      <v-card-text>
        <v-text-field label="Роль" v-model="role" />
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary darken-1" text @click="dialog = false">
          Отмена
        </v-btn>
        <v-btn color="success darken-1" text @click="editMember">
          Сохранить
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "BandEditMembersEditRole",
  props: {
    member: Object,
    band: Object,
  },
  data() {
    return {
      dialog: false,
      role: this.member.role,
    };
  },
  methods: {
    editMember() {
      this.$http
        .patch(`bands/${this.band.id}/members/${this.member.id}`, {
          role: this.role,
        })
        .then(() => {
          this.dialog = false;
          this.$snackbar("Участник успешно изменен");
          this.$emit("memberRoleEdited", this.role);
        });
    },
  },
};
</script>
