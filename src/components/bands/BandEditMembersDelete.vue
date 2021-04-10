<template>
  <v-dialog v-model="dialog" persistent max-width="600">
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on">
        <v-icon color="error"> mdi-delete </v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="headline">
        Вы действительно хотите удалить участника из группы?
      </v-card-title>
      <v-card-text>
        Удаленный участник будет удален из всех будущих репетиций группы
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary darken-1" text @click="dialog = false">
          Отмена
        </v-btn>
        <v-btn color="error darken-1" text @click="removeMemberFromBand">
          Уалить
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "BandEditMembersDelete",
  props: {
    member: Object,
    band: Object,
  },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    removeMemberFromBand() {
      this.$http
        .delete(`bands/${this.band.id}/members/${this.member.id}`)
        .then(() => {
          this.dialog = false;
          this.$emit("memberDeleted", this.member);
          this.$snackbar("Участник исключен из группы");
        });
    },
  },
};
</script>
