export interface INode {
  id: string;
  label: string;
  x: number;
  y: number;
  size: number;
  color: string;
  showLabel?: boolean;
}

export interface IEdge {
  id: string;
  source: string;
  target: string;
  color: string;
  size: number;
  showLabel?: boolean;
}
