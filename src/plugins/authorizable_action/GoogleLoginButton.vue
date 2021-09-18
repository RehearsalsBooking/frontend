<template>
  <LoginButton @click="$emit('click')">
    <template #icon>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
        alt="google"
      />
    </template>
    <template #text>Google</template>
  </LoginButton>
</template>

<script>
import LoginButton from "@/plugins/authorizable_action/LoginButton";

export default {
  name: "GoogleLoginButton",
  components: { LoginButton },
};
</script>

<style scoped lang="scss">
@import url(https://fonts.googleapis.com/css?family=Roboto:500);
</style>
