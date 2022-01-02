<template>
  <v-layout align-center justify-center>
    <v-row align="start">
      <BandsList :bands="bands" :is-fetching="isFetching">
        <template #no-bands>
          <template v-if="membershipStatus === 'active'">
            Пользователь пока не состоит ни в одной группе
          </template>
          <template v-if="membershipStatus === 'inactive'">
            Пользователь не состоял ни в одной группе
          </template>
        </template>
      </BandsList>
    </v-row>
  </v-layout>
</template>

<script>
import BandsList from "@/components/bands/BandsList";
import { mapGetters } from "vuex";

export default {
  name: "UserBands",
  components: { BandsList },
  props: {
    userId: [String, Number],
    membershipStatus: {
      type: String,
      default: "active",
    },
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
  computed: {
    ...mapGetters({
      user: "auth/getUser",
    }),
    queryParams() {
      let userId = this.userId || this.user.id;
      let membership = this.membershipStatus + "_member_id";
      return { [membership]: userId };
    },
  },
  methods: {
    getBands() {
      this.isFetching = true;
      this.$http
        .get(`/bands`, { params: this.queryParams })
        .then((res) => {
          this.bands = res.data.data;
        })
        .finally(() => (this.isFetching = false));
    },
  },
};
</script>

<style scoped></style>
