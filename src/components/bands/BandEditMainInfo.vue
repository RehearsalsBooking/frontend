<template>
  <v-form ref="form" class="mt-3" v-model="valid" lazy-validation>
    <v-row>
      <div class="col-6">
        <v-text-field
          v-model="editingBand.name"
          label="Название"
          :rules="[(v) => !!v || 'Введите название группы']"
        />
      </div>
      <div class="col-6">
        <v-autocomplete
          chips
          deletable-chips
          multiple
          label="Жанры"
          :items="genres"
          item-text="name"
          item-value="id"
          v-model="editingBand.genres"
        />
      </div>
      <div class="col-12">
        <v-textarea v-model="editingBand.bio" label="Биография"></v-textarea>
      </div>
    </v-row>
    <v-btn color="success" :disabled="!valid" rounded @click="update">
      Сохранить
    </v-btn>
  </v-form>
</template>

<script>
export default {
  name: "BandEditMainInfo",
  props: { band: Object },
  data() {
    return {
      editingBand: { ...this.band },
      genres: [],
      valid: true,
    };
  },
  mounted() {
    this.getAvailableGenres();
  },
  methods: {
    update() {
      if (this.$refs.form.validate()) {
        let data = {
          name: this.editingBand.name,
          bio: this.editingBand.bio,
          genres: this.editingBand.genres,
        };
        this.$http
          .put(`bands/${this.editingBand.id}`, data)
          .then(() => {
            this.$snackbar("Информация о группе обновлена");
            this.errors = {};
            Object.assign(this.band, data);
          })
          .catch((error) => {
            if (error.response.status === 422) {
              this.errors = error.response.data.errors;
            }
            this.$snackbar("Не удалось обновить информацию о группе", "error");
          });
      }
    },
    getAvailableGenres() {
      this.$http.get("genres").then(({ data }) => (this.genres = data.data));
    },
  },
};
</script>
