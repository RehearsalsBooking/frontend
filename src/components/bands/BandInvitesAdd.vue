<template>
  <v-form ref="form" lazy-validation>
    <v-container>
      <v-row>
        <v-col cols="4">
          <v-text-field
            label="Почта"
            required
            v-model="invite.email"
            :rules="[rules.required, rules.email]"
          />
        </v-col>
        <v-col cols="4">
          <v-text-field label="Роль" v-model="invite.role" />
        </v-col>
        <v-col cols="4" class="align-self-center">
          <v-btn color="primary" block rounded @click="sendInvite">
            Отправить приглашение
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: "BandInvitesAdd",
  props: {
    bandId: {
      type: [String, Number],
      required: true,
    },
  },
  data() {
    return {
      invite: {
        email: null,
        role: null,
      },
      rules: {
        required: (value) => !!value || "Обязательное поле",
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Некорректная почта";
        },
      },
    };
  },
  methods: {
    sendInvite() {
      let isValid = this.$refs.form.validate();

      if (!isValid) {
        return;
      }
      this.$http.post(`/bands/${this.bandId}/invites`, this.invite).then(() => {
        this.invite = {
          email: null,
          role: null,
        };
        this.$refs.form.reset();
        this.$snackbar("Приглашение отправлено");
        this.$emit("inviteAdded");
      });
    },
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>

<style scoped></style>
