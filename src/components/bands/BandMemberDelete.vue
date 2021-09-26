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
        <slot name="title"> </slot>
      </v-card-title>
      <v-card-text>
        <slot name="text"> </slot>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary darken-1" text @click="dialog = false">
          Отмена
        </v-btn>
        <v-btn color="error darken-1" text @click="removeMemberFromBand">
          Ок
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "BandMemberDelete",
  props: {
    member: Object,
    band: Object,
    snackbar: {
      default: "Участник удален из группы",
      type: String,
    },
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
          this.$snackbar(this.snackbar);
        });
    },
  },
};
</script>
