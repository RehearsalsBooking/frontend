<template>
  <v-container fluid>
    <h1>Создать новую группу</h1>
    <BandEditMainInfoForm :band="null" @save="create" :is-loading="isLoading" />
  </v-container>
</template>

<script>
import BandEditMainInfoForm from "@/components/bands/BandEditMainInfoForm";
export default {
  name: "BandCreatePage",
  components: { BandEditMainInfoForm },
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    create(data) {
      this.isLoading = true;
      this.$http
        .post(`bands/`, data)
        .then((res) => {
          this.$snackbar("Группа успешно создана");
          this.$router.push({
            name: "band-edit-main-info",
            params: { id: res.data.data.id },
          });
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
