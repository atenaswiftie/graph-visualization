// src/components/Graph.tsx
import React from 'react';
import { Sigma, RandomizeNodePositions } from 'react-sigma';
import { Edge, Node } from '../types/GraphTypes';


interface GraphProps {
  nodes: Node[];
  edges: Edge[];
}

const Graph: React.FC<GraphProps> = ({ nodes, edges }) => {
  return (
    <Sigma graph={{ nodes, edges }}>
      <RandomizeNodePositions />
    </Sigma>
  );
};

export default Graph;