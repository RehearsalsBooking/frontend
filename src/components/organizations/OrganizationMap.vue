<template>
  <yandex-map
    :settings="mapSettings"
    :controls="['zoomControl']"
    style="height: 100%; width: 100%"
    :coords="marker"
    :scroll-zoom="scrollZoom"
    @click="setNewMarker"
  >
    <ymap-marker
      :coords="marker"
      :marker-id="organization.id"
      :hint-content="organization.name"
    ></ymap-marker>
  </yandex-map>
</template>
<script>
import { yandexMap, ymapMarker } from "vue-yandex-maps";

export default {
  name: "OrganizationMap",
  components: { yandexMap, ymapMarker },
  props: {
    organization: Object,
    scrollZoom: {
      default: false,
    },
    allowUpdate: {
      default: false,
    },
  },
  data() {
    return {
      mapSettings: {
        apiKey: "c2712fb7-4ce6-4533-a8b7-25f0f0749ca3",
        lang: "ru_RU",
        coordorder: "latlong",
        version: "2.1",
      },
      marker: [],
    };
  },
  mounted() {
    this.marker = this.getOrganizationCoordinates();
  },
  methods: {
    getOrganizationCoordinates() {
      const regex = RegExp("\\((\\S+),(\\S+)\\)");
      const coordinates = regex.exec(this.organization.coordinates);
      return [coordinates[1], coordinates[2]];
    },
    setNewMarker(e) {
      if (!this.allowUpdate) {
        return;
      }
      this.marker = e.get("coords");
      this.$emit("coordsChanged", `(${this.marker.join(",")})`);
    },
  },
};
</script>
