<template>
  <div>
    <v-row>
      <v-col cols="12">
        <div class="text-center mb-2">
          <b>Мы находимся по адресу</b>
        </div>
        {{ organization.address }}
      </v-col>
    </v-row>
    <v-divider class="mb-3" />
    <OrganizationOwner :owner="organization.owner" />
  </div>
</template>
<script>
import OrganizationOwner from "./OrganizationOwner";

export default {
  name: "OrganizationContactInfo",
  components: { OrganizationOwner },
  props: {
    organization: Object
  }
};
</script>
