import { Edge, Node } from "@braks/vue-flow";

export const initialElements: (Node | Edge)[] = [
  {
    id: "1",
    type: "input",
    label: "Node 1",
    position: { x: 250, y: 5 },
    class: "light",
  },
  {
    id: "2",
    label: "Node <strong>B</strong>",
    position: { x: 100, y: 100 },
  },
  {
    id: "3",
    label: "Node <strong>C</strong>",
    position: { x: 400, y: 100 },
    style: {
      background: "#D6D5E6",
      color: "#333",
      border: "1px solid #222138",
      width: 180,
    },
  },
  {
    id: "e1-2",
    source: "1",
    target: "2",
    label: "Updateable edge",
    updatable: true,
  },
];
