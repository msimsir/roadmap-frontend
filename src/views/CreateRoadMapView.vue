<template>
  <div class="wrapper create-roadmap-container">
    <div class="roadmap-option-container border">
      <div class="form-element">
        <h3>Create Roadmap</h3>
      </div>
      <div class="form-element">
        <label>Name</label>
        <input
          type="text"
          placeholder="Roadmap Name"
        />
      </div>
      <div class="form-element">
        <label>Description</label>
        <textarea />
      </div>
      <div class="form-element">
        <label>Tags</label>
        <textarea />
      </div>
    </div>
    <div class="flow-chart-container border">
      <VueFlow v-model="elements">
        <Controls />
      </VueFlow>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { VueFlow, Controls, Node, Edge } from "@braks/vue-flow";
import { initialElements } from "../contants/initialElements";

export default defineComponent({
  name: "CreateRoadMapView",
  data() {
    return {
      elements: [] as (Node | Edge)[],
    };
  },
  components: { VueFlow, Controls },
  created() {
    this.elements = initialElements;
  },
});
</script>

<style scoped lang="scss">
.create-roadmap-container {
  height: 80vh;
  display: grid;
  max-width: 100%;
  grid-template-columns: 1fr 3fr;
  grid-gap: 16px;
  @media screen and (max-width: 1024px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 3fr;
  }
}
.border {
  border-radius: 8px;
  border: 1px solid #d9d9d9;
}
.roadmap-option-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 32px;
  @media screen and (max-width: 720px) {
    padding: 16px;
    & > h3 {
      font-size: 24px;
    }
  }
  .form-element {
    width: 100%;
    margin-bottom: 16px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    &:first-child {
      border-bottom: 1px solid #d9d9d9;
      padding-bottom: 4px;
    }
    & > label {
      margin-bottom: 2px;
    }
    & > input,
    textarea {
      width: 100%;
      border: 1px solid #d9d9d9;
      border-radius: 4px;
      padding: 8px 16px;
    }
  }
}
</style>
