<template>
  <v-col class="mb-8">
    <v-hover>
      <template v-slot:default="{ hover }">
        <v-img
          :src="imageUrl"
          contain
          max-width="320"
          class="mx-auto"
          style="position: relative"
        >
          <v-fade-transition>
            <v-overlay
              v-if="hover"
              absolute
              @click.native="onOverlayClick"
              style="cursor: pointer"
            >
              <v-btn icon>
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </v-overlay>
          </v-fade-transition>
        </v-img>
      </template>
    </v-hover>
    <input
      type="file"
      required
      ref="uploader"
      accept="image/*"
      @change="onFileChange"
      style="display: none"
    />
  </v-col>
</template>

<script>
import noImage from "@/assets/no-image.png";

export default {
  name: "ImageUpload",
  props: {
    value: String,
    uploadUrl: String,
  },
  data() {
    return {
      noImage: noImage,
    };
  },
  computed: {
    imageUrl() {
      return this.value || this.noImage;
    },
  },
  methods: {
    onFileChange(payload) {
      const file = payload.target.files[0];
      if (file) {
        const uploadedImage = URL.createObjectURL(file);
        URL.revokeObjectURL(file); // free memory
        const formData = new FormData();
        formData.append("avatar", file);
        this.$http
          .post(this.uploadUrl, formData)
          .then(() => {
            this.$emit("input", uploadedImage);
            this.$snackbar("Аватарка обновлена");
          })
          .catch(() => {
            this.$snackbar("Не удалось загрузить файл", "error");
          });
      }
    },
    onOverlayClick() {
      this.$refs.uploader.click();
    },
  },
};
</script>

<style scoped></style>
