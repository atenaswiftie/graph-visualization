import React, { useState, useEffect, useRef } from 'react';
import { SigmaContainer, ControlsContainer, ZoomControl, FullScreenControl } from '@react-sigma/core';
import Graph from 'graphology';
import { circular } from 'graphology-layout';
import "@react-sigma/core/lib/react-sigma.min.css";
import { IEdge, INode } from './types/GraphTypes';


const TOTAL_NODES = 50000;
const NODE_BATCH_SIZE = 10000;
const TOTAL_EDGES = 1000000;
const EDGE_BATCH_SIZE = 100000;
const INTERVAL_DURATION = 1000; // 1 second between batches

const App: React.FC = () => {
    const [graph, setGraph] = useState<Graph>(new Graph());
    const graphRef = useRef<Graph>(graph);
    const [loading, setLoading] = useState<boolean>(false);
    const workerRef = useRef<Worker | null>(null);
    const intervalId = useRef<number | null>(null);
    const sigmaRef = useRef<any>(null);  
useEffect(() => {
  var graph = require('ngraph.graph')();
graph.addLink(1, 2);

var renderGraph = require('ngraph.pixel');
var renderer = renderGraph(graph);

 
}, [])

    return (
        <div style={{ width: '100%', height: '100vh' }}>
            <b>nodes:{graphRef.current.order}</b>
            <br/>
            <b>edges:{graphRef.current.size}</b>
            <br/>
            <button onClick={handleLoadGraph} disabled={loading}>
                {loading ? 'Loading...' : 'Load Graph Elements'}
            </button>
            <SigmaContainer ref={sigmaRef} graph={graph} settings={{allowInvalidContainer: true}}>
                <ControlsContainer position="top-right">
                    <ZoomControl />
                    <FullScreenControl />
                </ControlsContainer>
            </SigmaContainer>
        </div>
    );
};

export default App;
