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
    band: {
      type: Object,
      required: true,
    },
  },
  methods: {
    cancelInvite() {
      this.$http
        .delete(`/bands/${this.band.id}/invites/${this.invite.id}`)
        .then(() => {
          this.$snackbar("Приглашение отменено");
          this.$emit("inviteCanceled");
        });
    },
  },
};
</script>
