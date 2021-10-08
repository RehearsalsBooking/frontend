<template>
  <v-fade-transition mode="out-in">
    <v-container fluid v-if="isFetching" key="fetching">
      <v-row>
        <v-progress-circular indeterminate color="primary" class="mx-auto" />
      </v-row>
    </v-container>
    <v-container fluid v-else key="fetched">
      <v-row min-height="300">
        <v-col xs="12" lg="4">
          <ImageWithPlaceholder
            :src="band.avatar.original"
            height="300"
            contain
          />
        </v-col>
        <v-col xs="12" lg="6">
          <div class="display-2 mb-3 text-uppercase d-flex">
            {{ band.name }}
          </div>
          <v-btn
            v-if="band.is_admin"
            class="mx-2 mb-4 d-xs-block"
            dark
            color="primary"
            @click="
              $router.push({
                name: 'band-edit-main-info',
                params: { id: band.id },
              })
            "
          >
            Редактировать
          </v-btn>
          <BandGenres :genres="band.genres" />
          <p>{{ band.bio }}</p>
        </v-col>
      </v-row>

      <div class="display-1 text-center mt-3 text-uppercase">Состав</div>
      <v-divider class="mb-1"></v-divider>
      <BandMembers :band="band" />
    </v-container>
  </v-fade-transition>
</template>

<script>
import BandMembers from "@/components/bands/BandMembers";
import BandGenres from "@/components/bands/BandGenres";
import ImageWithPlaceholder from "@/pages/ImageWithPlaceholder";

export default {
  name: "BandPage",
  components: { ImageWithPlaceholder, BandMembers, BandGenres },
  props: {
    id: [String, Number],
  },
  data() {
    return {
      isFetching: true,
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
          document.title = `Группы | ${this.band.name}`;
        })
        .finally(() => (this.isFetching = false));
    },
  },
};
</script>
