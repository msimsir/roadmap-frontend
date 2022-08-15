<template>
  <div class="card-container">
    <h2>Title</h2>
    <p>Description</p>
    <p>#guitar #music #theory</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {};
  },
});
</script>

<style scoped lang="scss">
.card-container {
  width: 223px;
  height: 275px;
  border-radius: 8px;
  padding: 16px;
  background-color: #d9d9d9;
  cursor: pointer;
}
</style>