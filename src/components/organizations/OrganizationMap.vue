<template>
  <yandex-map
    :settings="mapSettings"
    :controls="['zoomControl']"
    style="height: 100%"
    :coords="coordsArray"
    :scroll-zoom="false"
  >
    <ymap-marker
      :coords="coordsArray"
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
  },
  data() {
    return {
      mapSettings: {
        apiKey: "c2712fb7-4ce6-4533-a8b7-25f0f0749ca3",
        lang: "ru_RU",
        coordorder: "latlong",
        version: "2.1",
      },
    };
  },
  computed: {
    coordsArray() {
      const regex = RegExp("\\((\\S+),(\\S+)\\)");
      const coordinates = regex.exec(this.organization.coordinates);
      return [coordinates[1], coordinates[2]];
    },
  },
};
</script>
