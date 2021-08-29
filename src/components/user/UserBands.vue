<template>
  <v-layout align-center justify-center>
    <v-row align="start">
      <BandsList :bands="bands" :is-fetching="isFetching">
        <template #no-bands>
          Пользователь не состоит ни в одной группе
        </template>
      </BandsList>
    </v-row>
  </v-layout>
</template>

<script>
import BandsList from "@/components/bands/BandsList";

export default {
  name: "UserBands",
  components: { BandsList },
  props: {
    userId: [String, Number],
  },
  data() {
    return {
      bands: [],
      isFetching: true,
    };
  },
  mounted() {
    this.getBands();
  },
  methods: {
    getBands() {
      this.isFetching = true;
      this.$http
        .get(`/bands`, { params: { active_member_id: this.userId } })
        .then((res) => {
          this.bands = res.data.data;
        })
        .finally(() => (this.isFetching = false));
    },
  },
};
</script>

<style scoped></style>
