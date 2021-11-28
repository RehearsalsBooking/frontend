<template>
  <v-row>
    <v-col md="2" cols="12" class="py-0" v-if="withIndividual">
      <v-checkbox
        label="Индивидуальные"
        v-model="filters.isIndividual"
        hide-details
      />
    </v-col>
    <v-col md="2" cols="12" class="py-0 mb-4">
      <v-checkbox
        label="Только неоплаченные"
        v-model="filters.onlyUnpaid"
        hide-details
      />
    </v-col>
    <v-col md="8" cols="12" class="pb-0" v-if="bands.length > 0">
      <v-select
        ref="bandSelect"
        label="С группой"
        :items="bands"
        item-value="id"
        item-text="name"
        multiple
        hide-selected
        v-model="filters.selectedBands"
        clearable
        @change="$refs.bandSelect.isMenuActive = false"
      >
        <template v-slot:selection="{ item }">
          <v-chip close @click:close="removeBandFromSelected(item)">
            <span>{{ item.name }}</span>
          </v-chip>
        </template>
      </v-select>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "RehearsalsFilter",
  props: {
    value: Object,
    bands: {
      type: Array,
      default: () => [],
    },
    withIndividual: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {
      filters: {
        isIndividual: true,
        selectedBands: [],
        onlyUnpaid: false,
      },
    };
  },
  watch: {
    filters: {
      deep: true,
      handler: function () {
        this.$emit("input", this.getFilters());
      },
    },
  },
  methods: {
    getFilters() {
      return {
        is_individual: this.filters.isIndividual ? 1 : 0,
        band_ids: this.filters.selectedBands || [],
        only_unpaid: this.filters.onlyUnpaid ? 1 : 0,
      };
    },
    removeBandFromSelected(band) {
      console.log(this.filters.selectedBands, band);
      this.filters.selectedBands = this.filters.selectedBands.filter(
        (selectedBandId) => selectedBandId !== band.id
      );
    },
  },
};
</script>

<style scoped></style>
