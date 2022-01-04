<template>
  <v-col sm="12" md="4" v-if="managedBands.length > 0">
    <v-card class="px-4" height="100%">
      <v-card-title>
        <div class="mx-auto text-no-wrap">Тип репетиции</div>
      </v-card-title>
      <v-radio-group v-model="onBehalfOfBand">
        <v-radio label="Индивидуальная" :value="false" />
        <v-radio label="Групповая" :value="true" />
      </v-radio-group>
      <v-fade-transition>
        <v-select
          v-if="onBehalfOfBand"
          label="Выберите группу"
          :items="managedBands"
          item-text="name"
          item-value="id"
          :value="bandId"
          @input="$emit('update:bandId', $event)"
        />
      </v-fade-transition>
    </v-card>
  </v-col>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "OrganizationBookingBandSelection",
  props: {
    bandId: Number,
  },
  computed: {
    ...mapGetters({
      isAuthenticated: "auth/isAuthenticated",
      user: "auth/getUser",
    }),
    managedBands() {
      if (!this.isAuthenticated) {
        return [];
      }
      return this.user.bands.filter((band) => band.is_admin);
    },
  },
  data() {
    return {
      onBehalfOfBand: false,
    };
  },
  watch: {
    onBehalfOfBand(value) {
      if (value) {
        if (this.managedBands.length > 0) {
          this.$emit("update:bandId", this.managedBands[0].id);
        }
      } else {
        this.$emit("update:bandId", null);
      }
    },
  },
};
</script>
