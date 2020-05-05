<template>
  <v-dialog :value="value" @input="$emit('input')" v-bind="$attrs">
    <slot></slot>
  </v-dialog>
</template>

<script>
export default {
  name: "Dialog",
  props: {
    value: Boolean,
    title: {
      type: String,
      default: "Вход в приложение"
    }
  },
  created() {
    const unregisterRouterGuard = this.$router.beforeEach((to, from, next) => {
      if (this.value) {
        this.$emit("input", false);
        next(false);
        return;
      }
      next();
    });

    this.$once("hook:destroyed", () => {
      unregisterRouterGuard();
    });
  }
};
</script>

<style scoped></style>
