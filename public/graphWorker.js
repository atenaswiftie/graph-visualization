self.onmessage = function (e) {
    const { type, count, totalNodes } = e.data;
    if (type === 'GENERATE_GRAPH_ELEMENTS') {
        const nodes = [];
        const edges = [];
        for (let i = 0; i < count; i++) {
            const nodeId = `node${i + totalNodes}`;
            nodes.push({
                id: nodeId,
                label: `Node ${nodeId}`,
                // x: Math.random(),
                // y: Math.random(),
                size: 1,
                color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
                showLabel : false 
            });
            if (i > 0) { // Simple chain for demo purposes
                edges.push({
                    id: `edge${i + totalNodes}`,
                    source: `node${i - 1 + totalNodes}`,
                    target: nodeId,
                    color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
                    size: 0.1,
                    showLabel : false 
                });
            }
        }
        postMessage({ nodes, edges });
    }
};