<template>
  <div>
    Выбранные роли:
    <v-chip-group
      active-class="primary--text"
      column
      v-if="value && value.length > 0"
    >
      <v-chip
        v-for="(role, i) in value"
        :key="i"
        close
        @click:close="removeRole(i)"
      >
        {{ role }}
      </v-chip>
    </v-chip-group>
    <div v-else>Не назначено ни одной роли</div>
  </div>
</template>
<script>
export default {
  name: "MemberRoles",
  props: {
    value: Array,
  },
  methods: {
    removeRole(idx) {
      let filtered = this.value;
      filtered.splice(idx, 1);
      this.$emit("input", filtered);
    },
  },
};
</script>
