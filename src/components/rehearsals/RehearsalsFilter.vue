<template>
  <v-row>
    <v-col cols="2">
      <v-checkbox label="Индивидуальные" v-model="filters.isIndividual" />
    </v-col>
    <v-col cols="2">
      <v-checkbox label="Только неоплаченные" v-model="filters.onlyUnpaid" />
    </v-col>
    <v-col cols="8">
      <v-select
        v-if="bands.length > 0"
        label="С группой"
        :items="bands"
        item-value="id"
        item-text="name"
        multiple
        v-model="filters.selectedBands"
        clearable
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
    bands: Array,
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
  mounted() {
    this.filters.selectedBands = this.bands.map((band) => band.id);
  },
  watch: {
    bands(val) {
      this.filters.selectedBands = val.map((band) => band.id);
    },
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
