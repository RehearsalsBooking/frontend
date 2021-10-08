<template>
  <v-container fluid>
    <v-row class="justify-space-around">
      <v-col cols="12" sm="6">
        <v-card class="px-4">
          <v-card-title>
            <div class="mx-auto">Создать новую группу</div>
          </v-card-title>
          <v-card-text>
            <BandEditMainInfoForm
              :band="null"
              @save="create"
              :is-loading="isLoading"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
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
