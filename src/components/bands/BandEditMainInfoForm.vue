<template>
  <v-form ref="form" class="mt-3" v-model="valid" lazy-validation>
    <v-row>
      <div class="col-6">
        <v-text-field
          v-model="bandData.name"
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
          v-model="bandData.genres"
        />
      </div>
      <div class="col-12">
        <v-textarea v-model="bandData.bio" label="Биография"></v-textarea>
      </div>
    </v-row>
    <v-btn
      color="success"
      :disabled="!valid"
      rounded
      @click="save"
      :loading="isLoading"
    >
      Сохранить
    </v-btn>
  </v-form>
</template>
<script>
export default {
  name: "BandEditMainInfoForm",
  props: {
    band: {},
    isLoading: Boolean,
  },
  data() {
    return {
      valid: true,
      bandData: {
        genres: [],
        bio: "",
        name: "",
      },
      genres: [],
    };
  },
  mounted() {
    this.getAvailableGenres();
    if (this.band) {
      this.bandData = Object.assign({}, this.band);
    }
  },
  methods: {
    getAvailableGenres() {
      this.$http.get("genres").then(({ data }) => (this.genres = data.data));
    },
    save() {
      if (this.$refs.form.validate()) {
        this.$emit("save", this.bandData);
      }
    },
  },
};
</script>
