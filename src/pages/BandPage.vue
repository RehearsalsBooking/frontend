<template>
  <v-fade-transition group mode="out-in">
    <v-container fluid v-if="isFetching" key="fetching">
      <v-row>
        <v-progress-circular indeterminate color="primary" class="mx-auto" />
      </v-row>
    </v-container>
    <v-container fluid v-else key="fetched">
      <v-row>
        <v-col cols="4">
          <!--suppress HtmlUnknownTarget -->
          <v-img :src="`https://picsum.photos/300/200?random=${band.id}`" />
        </v-col>
        <v-col cols="6">
          <v-row>
            <v-col cols="10">
              <div class="display-2 mb-3 text-uppercase d-flex">
                {{ band.name }}
              </div>
            </v-col>
            <v-col cols="2">
              <v-btn
                v-if="band.is_admin"
                class="mx-2"
                fab
                dark
                color="primary"
                @click="
                  $router.push({
                    name: 'band-edit-main-info',
                    params: { id: band.id },
                  })
                "
              >
                <v-icon dark> mdi-pencil </v-icon>
              </v-btn>
            </v-col>
          </v-row>
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

export default {
  name: "BandPage",
  components: { BandMembers, BandGenres },
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
