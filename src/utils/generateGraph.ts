import { Edge,Node } from "../types/graphTypes";

export const generateGraphData = (): { nodes: Node[], edges: Edge[] } => {
    const nodes: Node[] = Array.from({ length: 500 }, (_, i) => ({
      id: `n${i}`,
      label: `Node ${i}`,
      x: Math.random(),
      y: Math.random(),
      size: Math.random(),
      color: `#${Math.floor(Math.random() * 16777215).toString(16)}`
    }));
  
    const edges: Edge[] = [];
    // Optionally add edges here if needed
  
    return { nodes, edges };
  };