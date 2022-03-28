<template>
  <v-text-field
    label="Почта"
    type="email"
    :rules="emailRules"
    :value="value"
    ref="emailInput"
    @input="onInput($event)"
    v-bind="$attrs"
  />
</template>
<script>
export default {
  name: "EmailInput",
  props: {
    value: String,
    isValid: Boolean,
  },
  data() {
    return {
      emailRules: [
        (v) => !!v || "Введите почту",
        (v) => /.+@.+\..+/.test(v) || "Некорректная почта",
      ],
    };
  },
  mounted() {
    this.$emit("update:isValid", this.$refs.emailInput.validate());
  },
  methods: {
    onInput($event) {
      this.$emit("update:isValid", this.$refs.emailInput.validate());
      this.$emit("input", $event);
    },
  },
};
</script>
