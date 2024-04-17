import React, { useState, useEffect, useRef } from 'react';
import { Sigma, RandomizeNodePositions, RelativeSize } from 'react-sigma';


const TOTAL_NODES = 50000;
const NODE_BATCH_SIZE = 10000;
const TOTAL_EDGES = 1000000;
const EDGE_BATCH_SIZE = 10000;

const App = () => {
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const loading = useRef(false);
    const workerRef = useRef(null);

    useEffect(() => {
        workerRef.current = new Worker("graphWorker.js");
        workerRef.current.onmessage = (event) => {
            const { nodes, edges } = event.data;
            setNodes(prev => [...prev, ...nodes]);
            setEdges(prev => [...prev, ...edges]);
            if (nodes.length >= TOTAL_NODES && edges.length >= TOTAL_EDGES) {
                loading.current = false; // Stop loading when limits are reached
            }
        };

        return () => {
            workerRef.current.terminate();
        };
    }, []);

    const handleLoadGraph = () => {
        if (!loading.current && (nodes.length < TOTAL_NODES || edges.length < TOTAL_EDGES)) {
            loading.current = true;
            // Calculate the remaining nodes and edges to be generated
            const nodesToGenerate = Math.min(NODE_BATCH_SIZE, TOTAL_NODES - nodes.length);
            const edgesToGenerate = Math.min(EDGE_BATCH_SIZE, TOTAL_EDGES - edges.length);
            // Send a message to the worker to start generating nodes/edges
            workerRef.current.postMessage({
                type: 'GENERATE_GRAPH_ELEMENTS',
                count: nodesToGenerate,
                totalNodes: nodes.length
            });
        }
    };

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <button onClick={handleLoadGraph} disabled={loading.current}>
                {loading.current ? 'Loading...' : 'Load Graph Elements'}
            </button>
            <Sigma key={nodes+edges} graph={{ nodes, edges }} settings={{ drawEdges: true, clone: false }}>
                <RelativeSize initialSize={15}/>
                <RandomizeNodePositions/>
            </Sigma>
        </div>
    );
};

export default App;