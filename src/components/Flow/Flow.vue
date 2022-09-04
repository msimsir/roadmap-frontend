<template>
  <div class="dndflow" @drop="onDrop">
    <VueFlow
      v-model="elements"
      @dragover="onDragOver"
      :snap-to-grid="true"
      @pane-ready="onLoad"
      @edge-update="onEdgeUpdate"
      @connect="onConnect"
      @edge-update-start="onEdgeUpdateStart"
      @edge-update-end="onEdgeUpdateEnd"
      @node-click="onNodeClick"
      @edge-click="onEdgeClick"
    >
      <Controls />
    </VueFlow>
    <Sidebar
      v-model:selected-item-value="selectedItemValue"
      @change="changeNodeTitle"
    />
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
  EdgeMouseEvent,
  NodeMouseEvent,
  GraphNode,
  GraphEdge,
} from "@braks/vue-flow";
import Sidebar from "./Sidebar.vue";
import { initialElements } from "../../contants/initialElements";

export default defineComponent({
  name: "Flow",
  props: ["flowData"],
  components: {
    Sidebar,
    VueFlow,
    Controls,
  },
  data() {
    return {
      selectedItem: {} as GraphNode | GraphEdge,
      selectedItemValue: "",
      elements: [] as Elements,
    };
  },
  computed: {
    changedElements() {
      return this.flowData || this.elements;
    },
  },
  methods: {
    onDrop(event: DragEvent) {
      const type = event.dataTransfer?.getData("application/vueflow");
      const position = { x: event.clientX - 800, y: event.clientY - 400 };
      const newNode = {
        // eslint-disable-next-line
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
    // eslint-disable-next-line
    onLoad(flowInstance: any) {
      flowInstance.fitView();
    },
    onConnect(params: Connection | Edge) {
      this.elements = addEdge({ ...params, updatable: true }, this.elements);
    },
    onEdgeUpdate({ edge, connection }: FlowEvents["edgeUpdate"]) {
      this.elements = updateEdge(edge, connection, this.elements);
    },
    onEdgeUpdateStart(edge: EdgeMouseEvent) {
      console.log("start update", edge);
    },
    onEdgeUpdateEnd(edge: EdgeMouseEvent) {
      console.log("end update", edge);
    },
    onNodeClick(nodeMouseEvent: NodeMouseEvent) {
      this.selectedItemValue = nodeMouseEvent.node.label as string;
      this.selectedItem = nodeMouseEvent.node;
    },
    onEdgeClick(edgeMouseEvent: EdgeMouseEvent) {
      this.selectedItemValue = edgeMouseEvent.edge.label as string;
      this.selectedItem = edgeMouseEvent.edge;
    },
    // eslint-disable-next-line
    changeNodeTitle(e: any) {
      this.selectedItem.label = e.target.value;
    },
  },
  created() {
    this.elements = initialElements;
  },
});
</script>
