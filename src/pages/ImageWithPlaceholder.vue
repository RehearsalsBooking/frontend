<template>
  <v-img
    :src="src || noImage"
    v-bind="$attrs"
    max-width="250"
    max-height="194"
    class="mx-auto"
  >
    <slot></slot>
  </v-img>
</template>
<script>
import noImage from "@/assets/no-image.png";

export default {
  name: "ImageWithPlaceholder",
  props: {
    src: String,
  },
  data() {
    return {
      noImage: noImage,
    };
  },
};
</script>
