<template>
  <v-img :src="src || noImage" />
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
