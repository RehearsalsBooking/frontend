<template>
  <v-fade-transition mode="out-in">
    <v-container fluid v-if="isFetching" key="fetching">
      <v-row>
        <v-progress-circular indeterminate color="primary" class="mx-auto" />
      </v-row>
    </v-container>
    <v-container fluid v-else key="fetched">
      <v-row justify="center">
        <v-col cols="12" md="4">
          <v-card>
            <v-card-title class="justify-center">
              Обновить аватарку
            </v-card-title>
            <ImageUpload
              :upload-url="`/bands/${band.id}/avatar`"
              v-model="band.avatar.original"
            />
            <v-card-title class="justify-center pt-0">
              Обновить данные</v-card-title
            >
            <v-card-text>
              <BandEditMainInfoForm
                :band="band"
                @save="update"
                :is-loading="isLoading"
              />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-fade-transition>
</template>

<script>
import BandEditMainInfoForm from "@/components/bands/BandEditMainInfoForm";
import ImageUpload from "@/components/common/ImageUpload";

export default {
  name: "BandEditMainInfo",
  components: { ImageUpload, BandEditMainInfoForm },
  props: { id: [String, Number] },
  data() {
    return {
      isFetching: true,
      isLoading: false,
      genres: [],
      valid: true,
      band: {},
    };
  },
  mounted() {
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
    update(data) {
      this.isLoading = true;
      this.$http
        .put(`bands/${this.band.id}`, data)
        .then(() => {
          this.$snackbar("Информация о группе обновлена");
        })
        .catch(() => {
          this.$snackbar("Не удалось обновить информацию о группе", "error");
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>
