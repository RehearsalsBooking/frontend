<template>
  <v-btn
    color="primary"
    class="justify-start"
    rounded
    block
    @click="$emit('click')"
  >
    <v-img max-width="40" class="mr-4">
      <slot name="icon"></slot>
    </v-img>
    <slot name="text"></slot>
  </v-btn>
</template>
<script>
export default {
  name: "LoginButton",
};
</script>
