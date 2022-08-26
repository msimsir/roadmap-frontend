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
  </aside>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Sidebar",
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
