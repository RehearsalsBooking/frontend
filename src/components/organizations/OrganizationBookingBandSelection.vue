<template>
  <v-col sm="12" md="4" v-if="userBands.length > 0">
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
import { mapGetters } from "vuex";

export default {
  name: "OrganizationBookingBandSelection",
  props: {
    bandId: Number,
  },
  computed: {
    ...mapGetters({
      isAuthenticated: "auth/isAuthenticated",
    }),
  },
  data() {
    return {
      onBehalfOfBand: false,
      userBands: [],
    };
  },
  mounted() {
    if (!this.isAuthenticated) {
      return;
    }
    this.$http.get(`bands/?only_managed=1`).then((res) => {
      this.userBands = res.data.data;
    });
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
    },
  },
};
</script>
