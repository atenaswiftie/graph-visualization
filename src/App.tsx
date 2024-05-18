import React, { useState, useEffect, useRef } from 'react';
import { SigmaContainer, ControlsContainer, ZoomControl, FullScreenControl } from '@react-sigma/core';
import Graph from 'graphology';
import { circular } from 'graphology-layout';
import "@react-sigma/core/lib/react-sigma.min.css";
import { IEdge, INode } from './types/GraphTypes';
import { Cosmograph } from '@cosmograph/react'


const TOTAL_NODES = 1_000_000;
const NODE_BATCH_SIZE = 100;
const TOTAL_EDGES = 200;
const EDGE_BATCH_SIZE = 200;
const INTERVAL_DURATION = 1000; // 1 second between batches

const App: React.FC = () => {
    const [graph, setGraph] = useState<Graph>(new Graph());
    const graphRef = useRef<Graph>(graph);
    const [loading, setLoading] = useState<boolean>(true);
    const workerRef = useRef<Worker | null>(null);
    const intervalId = useRef<number | null>(null);
    const sigmaRef = useRef<any>(null);  
    const [nodes, setNodes] = useState([ { id: '1', color: '#88C6FF' }]);
    // const [loading, setLoading] = useState(true); // Faster than p]);

    useEffect(() => {
        graphRef.current = graph;  
    }, [graph]);

    // useEffect(() => {
    //     workerRef.current = new Worker("graphWorker.js");
    //     workerRef.current.onmessage = (event: MessageEvent) => {
    //         const { nodes, edges } = event.data as { nodes: INode[], edges: IEdge[] };
    //         const newGraph = graphRef.current.copy(); 
    //         nodes.forEach(node => {
    //             if (!newGraph.hasNode(node.id)) {
    //                 newGraph.addNode(node.id, node);
    //             }
    //         });
    
    //         edges.forEach(edge => {
    //             if (!newGraph.hasEdge(edge.source, edge.target)) {
    //                 newGraph.addEdge(edge.source, edge.target);
    //             }
    //         });
    
    //         circular(newGraph); // Apply circular layout
    //         setGraph(newGraph);
    
    //         if (newGraph.order >= TOTAL_NODES && newGraph.size >= TOTAL_EDGES) {
    //             if (intervalId.current !== null) {
    //                 clearInterval(intervalId.current);
    //                 intervalId.current = null;
    //                 setLoading(false);
    //             }
    //         }
    //     };
    
    //     return () => {
    //         if (workerRef.current) {
    //             workerRef.current.terminate();
    //         }
    //         if (intervalId.current !== null) {
    //             clearInterval(intervalId.current);
    //         }
    //     };
    // }, []);

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
            }, 10);
        }
    };

    useEffect(() => {
   
    

    }, [])
    

      
      const links = [
        { source: '1', target: '2' },
        { source: '1', target: '3' },
        { source: '2', target: '3' },
      ]




useEffect(() => {
    const generateColor = () => {
        // Generate a random hex color or RGBA array
        if (Math.random() > 0.5) {
          // Hex color
          const hex = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
          return hex;
        } else {
          // RGBA array
          const r = Math.floor(Math.random() * 256);
          const g = Math.floor(Math.random() * 256);
          const b = Math.floor(Math.random() * 256);
          const a = Math.random().toFixed(2);
          return [r, g, b, a];
        }
      };
      
      const newnodes = [];
      for (let i = 1; i <= 500000; i++) {
        newnodes.push({ id: i.toString(), color: generateColor() });
      }
      setNodes(newnodes)
      setLoading(false)
}, [])


 return (
  <>
  {loading ? null: <Cosmograph
    nodes={nodes}
    links={links}
    nodeColor={d => d.color}
    simulationFriction={0.1} 
    simulationLinkSpring={0.5} 
    simulationLinkDistance={2.0}
  />}
  </>
 
)
};

export default App;
