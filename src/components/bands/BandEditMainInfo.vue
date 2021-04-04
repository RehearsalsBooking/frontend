<template>
  <v-form ref="form" class="mt-3">
    <v-text-field v-model="editingBand.name" label="Название" required />
    <v-textarea v-model="editingBand.bio" label="Биография"></v-textarea>

    <v-btn color="success" rounded @click="update"> Сохранить </v-btn>
  </v-form>
</template>

<script>
export default {
  name: "BandEditMainInfo",
  props: { band: Object },
  data() {
    return {
      editingBand: { ...this.band },
    };
  },
  methods: {
    update() {
      this.$http
        .put(`bands/${this.editingBand.id}`, this.band)
        .then(() => {
          this.$snackbar("Информация о группе обновлена");
          this.errors = {};
          this.$auth.fetch({});
        })
        .catch((error) => {
          if (error.response.status === 422) {
            this.errors = error.response.data.errors;
          }
          this.$snackbar("Не удалось обновить информацию о группе", "error");
        });
    },
  },
};
</script>
