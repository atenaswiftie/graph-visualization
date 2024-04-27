// graphWorker.js
self.onmessage = function (e) {
    const { type, nodeCount, edgeCount, totalNodes, totalEdges, TOTAL_NODES, TOTAL_EDGES } = e.data;
    if (type === 'GENERATE_GRAPH_ELEMENTS') {
        const nodes = [];
        const edges = [];

        // Generate nodes only if needed
        for (let i = 0; i < nodeCount && totalNodes + i < TOTAL_NODES; i++) {
            const nodeId = `node${i + totalNodes}`;
            nodes.push({
                id: nodeId,
                label: `Node ${nodeId}`,
                x: Math.random(),
                y: Math.random(),
                size: 1,
                color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
                showLabel: false
            });
        }


        while (edges.length < edgeCount && totalEdges + edges.length < TOTAL_EDGES) {
            const sourceIndex = Math.floor(Math.random() * nodes.length);
            let targetIndex = Math.floor(Math.random() * nodes.length);

          
                targetIndex = Math.floor(Math.random() * nodes.length);
          

            const sourceId = nodes[sourceIndex].id;
            const targetId = nodes[targetIndex].id;
            const edgeId = `edge-${sourceId}-${targetId}`;

            if (!edges.some(e => e.id === edgeId)) {
                edges.push({
                    id: edgeId,
                    source: sourceId,
                    target: targetId,
                    color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
                    size: 0.1,
                    showLabel: false
                });
            }
      
        }

        self.postMessage({ nodes, edges });
    }
};
