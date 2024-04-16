export interface Node {
    id: number;
    x: number;
    y: number;
}

export interface Edge {
    from: number;
    to: number;
}

export interface GraphData {
    nodes: Node[];
    edges: Edge[];
}