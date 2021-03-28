<template>
  <v-layout align-center justify-center>
    <v-row align="start">
      <v-fade-transition mode="out-in">
        <v-col cols="12" v-if="isFetching" key="bands-loading">
          <v-row>
            <v-col cols="3" v-for="n in 8" :key="n">
              <v-card max-width="344" class="mx-auto">
                <v-skeleton-loader
                  transition="fade"
                  type="card"
                ></v-skeleton-loader>
              </v-card>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" v-else-if="bands.length > 0" key="bands-loaded">
          <v-row>
            <v-col cols="3" v-for="band in bands" :key="band.id">
              <BandCard :band="band" />
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" v-else key="bands-none">
          <v-row>
            <v-col cols="12" class="text-center">
              Вы пока не состоите ни в одной группе. __Ссылка на поиск группы__
            </v-col>
          </v-row>
        </v-col>
      </v-fade-transition>
    </v-row>
  </v-layout>
</template>

<script>
import BandCard from "@/components/bands/BandCard";

export default {
  name: "UserBandsPage",
  components: { BandCard },
  data() {
    return {
      isFetching: true,
      bands: [],
    };
  },
  mounted() {
    this.getBands();
  },
  methods: {
    getBands() {
      this.isFetching = true;
      this.$http
        .get("/bands", {
          params: {
            member_id: this.$auth.user().id,
          },
        })
        .then((res) => {
          this.bands = res.data.data;
        })
        .finally(() => (this.isFetching = false));
    },
  },
};
</script>
