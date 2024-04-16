import React, { useRef, useEffect } from 'react';
import { GraphData, Node, Edge } from '../types/GraphTypes';

interface GraphCanvasProps {
    graphData: GraphData;
    zoomLevel: number;
    onNodeClick: (node: Node) => void;
    onEdgeClick: (edge: Edge) => void;
}

const GraphCanvas: React.FC<GraphCanvasProps> = ({ graphData, zoomLevel, onNodeClick, onEdgeClick }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const context = canvas.getContext('2d');
        if (!context) return;

        // Function to draw the graph
        function drawGraph() {
            context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
            graphData.edges.forEach(edge => {
                const fromNode = graphData.nodes.find(node => node.id === edge.from);
                const toNode = graphData.nodes.find(node => node.id === edge.to);
                if (fromNode && toNode) {
                    context.beginPath();
                    context.moveTo(fromNode.x, fromNode.y);
                    context.lineTo(toNode.x, toNode.y);
                    context.strokeStyle = 'rgba(0, 0, 0, 0.6)';
                    context.stroke();
                }
            });
            graphData.nodes.forEach(node => {
                context.beginPath();
                context.arc(node.x, node.y, 5, 0, 2 * Math.PI);
                context.fillStyle = 'blue';
                context.fill();
                context.stroke();
            });
        }

        // Event handling for interaction
        function handleInteraction(event: MouseEvent, action: (node: Node) => void) {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const clickedNode = graphData.nodes.find(node => 
                Math.sqrt((node.x - x) ** 2 + (node.y - y) ** 2) < 5);
            if (clickedNode) {
                action(clickedNode);
            }
        }

        drawGraph(); // Initial drawing of the graph

        canvas.addEventListener('click', (event) => handleInteraction(event, onNodeClick));

        return () => {
            canvas.removeEventListener('click', (event) => handleInteraction(event, onNodeClick));
        };
    }, [graphData, zoomLevel, onNodeClick, onEdgeClick]);

    return <canvas ref={canvasRef} width={800} height={600} style={{ border: '1px solid black' }} />;
};

export default GraphCanvas;
