<template>
  <v-container fluid>
    <v-row class="justify-space-around">
      <v-col cols="12">
        <v-card class="px-4">
          <v-card-title>
            <div class="mx-auto">Редактирование репточки</div>
          </v-card-title>
          <v-card-text>
            <v-form ref="form">
              <v-row>
                <v-text-field
                  v-model="organization.name"
                  label="Название"
                  required
                />
              </v-row>
              <v-row>
                <v-text-field
                  v-model="organization.address"
                  label="Адрес"
                  required
                />
              </v-row>
              <v-row>
                <v-textarea
                  v-model="organization.gear"
                  label="Описание оборудования"
                />
              </v-row>
              <v-row class="mb-6"> Укажите место репточки на карте </v-row>
              <v-row style="width: 100%; height: 500px" v-if="organization.id">
                <OrganizationMap
                  :organization="organization"
                  :allow-update="true"
                  @coordsChanged="organization.coordinates = $event"
                />
              </v-row>
              <v-row class="mt-6">
                <v-btn color="success" block rounded @click="update">
                  Сохранить
                </v-btn>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import OrganizationMap from "@/components/organizations/OrganizationMap";

export default {
  name: "OrganizationEditPage",
  components: { OrganizationMap },
  props: {
    id: [String, Number],
  },
  data() {
    return {
      organization: {},
    };
  },
  mounted() {
    this.getOrganization();
  },
  methods: {
    getOrganization() {
      this.$http.get(`/organizations/${this.id}`).then((res) => {
        this.organization = res.data.data;
        delete this.organization.avatar;
      });
    },
    update() {
      this.$http
        .put(
          `/management/organizations/${this.organization.id}/`,
          this.organization
        )
        .then(() => {
          this.$snackbar("Информация о репточке успешно обновлена");
        });
    },
  },
};
</script>
