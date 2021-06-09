<template>
  <v-container fluid>
    <v-row class="justify-space-around">
      <v-col cols="4">
        <v-card class="px-4">
          <v-card-title>
            <div class="mx-auto">Редактирование репточки</div>
          </v-card-title>
          <v-card-text>
            <v-form ref="form">
              <v-text-field
                v-model="editingOrganization.name"
                label="Название"
                required
              />
              <v-text-field
                v-model="editingOrganization.address"
                label="Адрес"
                required
              />
              <v-container style="width: 100%; height: 500px">
                <OrganizationMap :organization="editingOrganization" />
              </v-container>
              <v-btn color="success" block rounded @click="update">
                Сохранить
              </v-btn>
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
    organization: Object,
  },
  data() {
    return {
      editingOrganization: Object.assign({}, this.organization),
    };
  },
  methods: {
    update() {
      this.$http
        .put(
          `/management/organizations/${this.organization.id}/`,
          this.editingOrganization
        )
        .then(() => {
          this.$snackbar("Информация о репточке успешно обновлена");
        });
    },
  },
};
</script>
