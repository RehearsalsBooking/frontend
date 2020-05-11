<template>
  <v-col cols="4" v-if="userBands.length > 0">
    <v-card class="px-4" height="100%">
      <v-card-title>
        <div class="mx-auto">Выберите тип репетиции</div>
      </v-card-title>
      <v-radio-group v-model="onBehalfOfBand">
        <v-radio label="Индивидуальная" :value="false" />
        <v-radio label="Групповая" :value="true" />
      </v-radio-group>
      <v-fade-transition>
        <v-select
          v-if="onBehalfOfBand"
          label="Выберите группу"
          :items="userBands"
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
export default {
  name: "OrganizationBookingBandSelection",
  props: {
    bandId: Number
  },
  data() {
    return { onBehalfOfBand: false };
  },
  computed: {
    userBands() {
      if (!this.$auth.check() || !this.$auth.user().bands) {
        return [];
      }
      return this.$auth.user().bands.filter(band => band.is_admin);
    }
  },
  watch: {
    onBehalfOfBand(value) {
      if (value) {
        if (this.userBands.length > 0) {
          this.$emit("update:bandId", this.userBands[0].id);
        }
      } else {
        this.$emit("update:bandId", null);
      }
    }
  }
};
</script>
