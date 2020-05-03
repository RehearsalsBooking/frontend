<template>
  <v-container fluid>{{ organization }} </v-container>
</template>

<script>
export default {
  name: "OrganizationsPage",
  props: {
    id: [String, Number]
  },
  data() {
    return {
      organization: null
    };
  },
  mounted() {
    this.getOrganization();
  },
  methods: {
    getOrganization() {
      this.$http.get(`/organizations/${this.id}`).then(res => {
        this.organization = res.data.data;
      });
    }
  }
};
</script>

<style scoped></style>
