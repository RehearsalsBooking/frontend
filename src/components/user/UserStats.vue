<template>
  <div class="d-flex flex-column">
    <div>
      Зарегистрирован: <b>{{ stats.registered_at | formatDate }} </b>
    </div>
    <div>
      Количество групп: <b>{{ stats.bands_count }} </b>
    </div>
    <div>
      Репетиций: <b>{{ stats.rehearsals_count }} </b>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserStats",
  props: {
    userId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      stats: {},
    };
  },
  mounted() {
    this.getUserStats();
  },
  methods: {
    getUserStats() {
      this.$http.get(`/users/${this.userId}/statistics`).then((res) => {
        this.stats = res.data;
      });
    },
  },
};
</script>

<style scoped></style>
