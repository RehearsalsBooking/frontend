<template>
  <v-dialog v-model="dialog" persistent max-width="600">
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on.stop="on">
        <v-icon color="primary"> mdi-pencil</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="headline text-break">
        Изменить роль участника
      </v-card-title>
      <v-card-text>
        <MemberRoles v-model="editedRoles" />
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
import MemberRoles from "@/components/bands/MemberRoles";

export default {
  name: "BandEditMembersEditRole",
  components: { MemberRoles },
  props: {
    member: Object,
    band: Object,
    roles: {},
  },
  data() {
    return {
      dialog: false,
      newRole: "",
      editedRoles: [],
    };
  },
  mounted() {
    if (!this.roles) {
      this.editedRoles = [];
      return;
    }
    this.editedRoles = this.roles.slice();
  },
  methods: {
    editMember() {
      this.$http
        .patch(`bands/${this.band.id}/members/${this.member.id}`, {
          roles: this.editedRoles,
        })
        .then(() => {
          this.dialog = false;
          this.$snackbar("Участник успешно изменен");
          this.$emit("memberRoleEdited", this.editedRoles);
        });
    },
  },
};
</script>
