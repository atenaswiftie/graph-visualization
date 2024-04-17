export interface Node {
    id: string;
    label: string;
    x: number;
    y: number;
    size: number;
    color: string;
  }
  
  export interface Edge {
    id: string;
    source: string;
    target: string;
    color?: string;
  }