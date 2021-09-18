<template>
  <v-simple-table dense>
    <template v-slot:default>
      <tbody>
        <tr v-for="item in items" :key="item.name">
          <td>
            <div
              class="color-box"
              :style="{ backgroundColor: item.color }"
            ></div>
          </td>
          <td>{{ item.text }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  name: "Legend",
  props: {
    items: [Array],
  },
};
</script>

<style scoped>
.color-box {
  width: 10px;
  height: 10px;
}
</style>
