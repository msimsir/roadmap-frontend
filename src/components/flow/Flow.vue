<template>
  <div
    class="dndflow"
    @drop="onDrop"
  >
    <VueFlow
      v-model="elements"
      @dragover="onDragOver"
      :snap-to-grid="true"
      @pane-ready="onLoad"
      @edge-update="onEdgeUpdate"
      @connect="onConnect"
      @edge-update-start="onEdgeUpdateStart"
      @edge-update-end="onEdgeUpdateEnd"
    >
      <Controls />
    </VueFlow>
    <Sidebar />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import {
  VueFlow,
  Controls,
  updateEdge,
  addEdge,
  Elements,
  Connection,
  Edge,
  FlowEvents,
} from "@braks/vue-flow";
import Sidebar from "./Sidebar.vue";
import { initialElements } from "../../contants/initialElements";

export default defineComponent({
  name: "Flow",
  components: {
    Sidebar,
    VueFlow,
    Controls,
  },
  data() {
    return {
      elements: [] as Elements,
    };
  },
  methods: {
    onDrop(event: DragEvent) {
      const type = event.dataTransfer?.getData("application/vueflow");
      const position = { x: event.clientX - 800, y: event.clientY - 400 };
      const newNode = {
        id: (this.elements?.length + 1) as any,
        type,
        position,
        label: `${type} node`,
      };
      this.elements.push(newNode);
    },
    onDragOver(event: DragEvent) {
      event.preventDefault();
      if (event.dataTransfer) {
        event.dataTransfer.dropEffect = "move";
      }
    },
    onLoad(flowInstance: any) {
      flowInstance.fitView();
    },
    onConnect(params: Connection | Edge) {
      this.elements = addEdge(params, this.elements);
    },
    onEdgeUpdate({ edge, connection }: FlowEvents["edgeUpdate"]) {
      this.elements = updateEdge(edge, connection, this.elements);
    },
    onEdgeUpdateStart(edge: Edge) {
      console.log("start update", edge);
    },
    onEdgeUpdateEnd(edge: Edge) {
      console.log("end update", edge);
    },
  },
  created() {
    this.elements = initialElements;
  },
});
</script>

