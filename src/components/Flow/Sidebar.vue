<template>
  <aside>
    <div class="description">You can drag these nodes to the pane.</div>
    <div
      class="vue-flow__node-input"
      :draggable="true"
      @dragstart="onDragStart($event, 'input')"
    >
      Input Node
    </div>
    <div
      class="vue-flow__node-default"
      :draggable="true"
      @dragstart="onDragStart($event, 'default')"
    >
      Default Node
    </div>
    <div
      class="vue-flow__node-output"
      :draggable="true"
      @dragstart="onDragStart($event, 'output')"
    >
      Output Node
    </div>
    <div class="item-options">
      <p>You can click on the items to change its content.</p>
      <div>
        <label class="title">Item Content</label>
        <textarea
          class="item-value"
          :value="selectedItemValue"
          @input="$emit('change', $event)"
          rows="4"
        />
      </div>
    </div>
  </aside>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Sidebar",
  props: {
    selectedItemValue: {
      type: String,
      default: "",
    },
  },
  methods: {
    onDragStart(event: DragEvent, nodeType: string) {
      if (event.dataTransfer) {
        event.dataTransfer.setData("application/vueflow", nodeType);
        event.dataTransfer.effectAllowed = "move";
      }
    },
  },
});
</script>
