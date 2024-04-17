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
        graphRef.current = graph;  
    }, [graph]);

    useEffect(() => {
        workerRef.current = new Worker("graphWorker.js");
        workerRef.current.onmessage = (event: MessageEvent) => {
            const { nodes, edges } = event.data as { nodes: INode[], edges: IEdge[] };
            const newGraph = graphRef.current.copy(); 
            nodes.forEach(node => {
                if (!newGraph.hasNode(node.id)) {
                    newGraph.addNode(node.id, node);
                }
            });
    
            edges.forEach(edge => {
                if (!newGraph.hasEdge(edge.source, edge.target)) {
                    newGraph.addEdge(edge.source, edge.target);
                }
            });
    
            circular(newGraph); // Apply circular layout
            setGraph(newGraph);
    
            if (newGraph.order >= TOTAL_NODES && newGraph.size >= TOTAL_EDGES) {
                if (intervalId.current !== null) {
                    clearInterval(intervalId.current);
                    intervalId.current = null;
                    setLoading(false);
                }
            }
        };
    
        return () => {
            if (workerRef.current) {
                workerRef.current.terminate();
            }
            if (intervalId.current !== null) {
                clearInterval(intervalId.current);
            }
        };
    }, []);

    const handleLoadGraph = () => {
        if (!loading) {
            setLoading(true);
            intervalId.current = window.setInterval(() => {
                const currentGraph = graphRef.current;
                if (currentGraph.order < TOTAL_NODES || currentGraph.size < TOTAL_EDGES) {
                    workerRef.current?.postMessage({
                        type: 'GENERATE_GRAPH_ELEMENTS',
                        nodeCount: Math.min(NODE_BATCH_SIZE, TOTAL_NODES - currentGraph.order),
                        edgeCount: Math.min(EDGE_BATCH_SIZE, TOTAL_EDGES - currentGraph.size),
                        totalNodes: currentGraph.order,
                        totalEdges: currentGraph.size,
                        TOTAL_EDGES,
                        TOTAL_NODES
                    });
                } else {
                    if (intervalId.current !== null) {
                        clearInterval(intervalId.current);
                        intervalId.current = null;
                        setLoading(false);
                    }
                }
            }, INTERVAL_DURATION);
        }
    };

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
