<template>
  <v-btn icon @click="cancelInvite">
    <v-icon color="error">mdi-delete</v-icon>
  </v-btn>
</template>
<script>
export default {
  name: "BandInviteCancel",
  props: {
    invite: {
      type: Object,
      required: true,
    },
    bandId: {
      type: [String, Number],
      required: true,
    },
  },
  methods: {
    cancelInvite() {
      this.$http
        .delete(`/bands/${this.bandId}/invites/${this.invite.id}`)
        .then(() => {
          this.$snackbar("Приглашение отменено");
          this.$emit("inviteCanceled");
        });
    },
  },
};
</script>
