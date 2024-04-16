import React from 'react';
import GraphCanvas from './GraphCanvas';
import { useGraphData } from './hooks/useGraphData'; // Update the path accordingly

const App: React.FC = () => {
    const { graphData, zoomLevel, generateData, zoomIn, zoomOut } = useGraphData();

    return (
        <div>
            <button onClick={generateData}>Generate Graph Data</button>
            <button onClick={zoomIn}>Zoom In</button>
            <button onClick={zoomOut}>Zoom Out</button>
            {graphData && <GraphCanvas graphData={graphData} zoomLevel={zoomLevel} />}
        </div>
    );
};

export default App;
