<template>
  <div>
    <v-text-field label="Роль" v-model="newRole" @keyup.enter="addRole">
      <template v-slot:append>
        <v-btn icon @click="addRole">
          <v-icon color="success">mdi-playlist-plus</v-icon>
        </v-btn>
      </template>
    </v-text-field>
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
  data() {
    return {
      newRole: "",
    };
  },
  methods: {
    removeRole(idx) {
      let filtered = this.value;
      filtered.splice(idx, 1);
      this.$emit("input", filtered);
    },
    addRole() {
      let newRoles = this.value || [];
      newRoles.push(this.newRole);
      this.$emit("input", newRoles);
      this.newRole = "";
    },
  },
};
</script>
