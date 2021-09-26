<template>
  <v-form ref="form" class="mt-3" v-model="valid" lazy-validation>
    <v-row>
      <v-col cols="12">
        <v-text-field
          v-model="bandData.name"
          hide-details
          label="Название"
          :rules="[(v) => !!v || 'Введите название группы']"
        />
      </v-col>
      <v-col cols="12">
        <v-autocomplete
          chips
          hide-details
          deletable-chips
          multiple
          label="Жанры"
          :items="genres"
          item-text="name"
          item-value="id"
          v-model="bandData.genres"
        />
      </v-col>
      <v-col cols="12">
        <v-textarea v-model="bandData.bio" label="Биография" hide-details />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col>
        <v-btn
          block
          color="success"
          :disabled="!valid"
          rounded
          @click="save"
          :loading="isLoading"
        >
          Сохранить
        </v-btn>
      </v-col>
    </v-row>
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
