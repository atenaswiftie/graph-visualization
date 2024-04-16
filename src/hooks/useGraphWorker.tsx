import { useState, useCallback } from 'react';
import { generateGraphData } from './GraphGenerator'; // Assuming this utility generates the data

interface GraphData {
    nodes: any[];
    edges: any[];
}

// Define the structure for the return type of the hook
interface UseGraphData {
    graphData: GraphData | null;
    zoomLevel: number;
    generateData: () => void;
    zoomIn: () => void;
    zoomOut: () => void;
}

export function useGraphData(initialZoom: number = 1): UseGraphData {
    const [graphData, setGraphData] = useState<GraphData | null>(null);
    const [zoomLevel, setZoomLevel] = useState<number>(initialZoom);

    const generateData = useCallback(() => {
        // Parameters could be dynamic or based on user input
        const data = generateGraphData(500000, 1000000);
        setGraphData(data);
    }, []);

    const zoomIn = useCallback(() => {
        setZoomLevel(prevZoom => prevZoom * 1.2);
    }, []);

    const zoomOut = useCallback(() => {
        setZoomLevel(prevZoom => prevZoom / 1.2);
    }, []);

    return { graphData, zoomLevel, generateData, zoomIn, zoomOut };
}
