
export const generateGraphData = (numNodes: number, numEdges: number) => {
    const nodes = Array.from({ length: numNodes }, (_, i) => ({
        id: i,
        x: Math.random() * 800,
        y: Math.random() * 600
    }));

    const edges = Array.from({ length: numEdges }, () => ({
        from: Math.floor(Math.random() * numNodes),
        to: Math.floor(Math.random() * numNodes)
    }));

    return { nodes, edges };
};
