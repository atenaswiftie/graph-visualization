// src/App.tsx
import React, { useState } from 'react';
import Graph from './components/GraphCanvas';
import { generateGraphData } from './utils/generateGraph';
import { Edge,Node } from './types/GraphTypes';


const App: React.FC = () => {
  const [graphData, setGraphData] = useState<{ nodes: Node[], edges: Edge[] }>({ nodes: [], edges: [] });

  const handleLoadGraph = () => {
    const data = generateGraphData();
    setGraphData(data);
  };

  return (
    <div className="App">
      <button onClick={handleLoadGraph}>Load Graph</button>
      <Graph nodes={graphData.nodes} edges={graphData.edges} />
    </div>
  );
}

export default App;
