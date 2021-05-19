<template>
  <v-fade-transition group mode="out-in">
    <v-container fluid v-if="isFetching" key="fetching">
      <v-row>
        <v-progress-circular indeterminate color="primary" class="mx-auto" />
      </v-row>
    </v-container>
    <v-container fluid v-else key="fetched">
      <v-form ref="form" class="mt-3" v-model="valid" lazy-validation>
        <v-row>
          <div class="col-6">
            <v-text-field
              v-model="band.name"
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
              v-model="band.genres"
            />
          </div>
          <div class="col-12">
            <v-textarea v-model="band.bio" label="Биография"></v-textarea>
          </div>
        </v-row>
        <v-btn color="success" :disabled="!valid" rounded @click="update">
          Сохранить
        </v-btn>
      </v-form>
    </v-container>
  </v-fade-transition>
</template>

<script>
export default {
  name: "BandEditMainInfo",
  props: { id: [String, Number] },
  data() {
    return {
      isFetching: true,
      genres: [],
      valid: true,
      band: {},
    };
  },
  mounted() {
    this.getAvailableGenres();
    this.getBand();
  },
  methods: {
    getBand() {
      this.isFetching = true;
      this.$http
        .get(`/bands/${this.id}`)
        .then((res) => {
          this.band = res.data.data;
          this.band.genres = this.band.genres.map((genre) => genre.id);
          document.title = `${this.band.name} | Общая информация`;
        })
        .finally(() => (this.isFetching = false));
    },
    update() {
      if (this.$refs.form.validate()) {
        let data = {
          name: this.band.name,
          bio: this.band.bio,
          genres: this.band.genres,
        };
        this.$http
          .put(`bands/${this.band.id}`, data)
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
