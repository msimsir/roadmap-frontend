<template>
  <div class="card-container">
    <div>
      <h2>Title</h2>
      <p>Description</p>
    </div>
    <div class="tags">
      <span>#guitar</span> <span>#music</span><span>#theory</span>
    </div>
    <div class="import-icon">Import</div>
    <div class="like-icon">Like</div>
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
  position: relative;
  width: 100%;
  height: 150px;
  border-radius: 8px;
  padding: 16px;
  background-color: #d9d9d9;
  text-align: left;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  transition: all 0.5s;

  .tags {
    span {
      margin: 0px 4px;
    }
  }

  .import-icon {
    position: absolute;
    display: none;
  }

  .like-icon {
    position: absolute;
    display: none;
  }
}
</style>
