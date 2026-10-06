export type GraphMode = "connections" | "communities" | "traversal";
export type GraphNode = { id: number; community: number; position: [number, number, number]; neighbors: number[] };
export type GraphData = { nodes: GraphNode[]; edges: { from: number; to: number }[] };
export const COMMUNITY_COLORS = ["#ff6a24", "#70d6c6", "#a99bff", "#e8c778"];

export function createGraph(): GraphData {
  const nodes: GraphNode[] = Array.from({ length: 96 }, (_, id) => {
    const community = Math.floor(id / 24);
    const local = id % 24;
    const angle = local * 2.399963;
    const radius = 0.3 + Math.sqrt(local / 24) * 1.45;
    const center = community * Math.PI / 2 + Math.PI / 4;
    return { id, community, position: [Math.cos(center) * 1.65 + Math.cos(angle) * radius, Math.sin(center) * 1.65 + Math.sin(angle) * radius, Math.sin(id * 1.73) * 1.25], neighbors: [] };
  });
  const edges: GraphData["edges"] = [];
  const seen = new Set<string>();
  const connect = (a: number, b: number) => {
    const from = Math.min(a, b), to = Math.max(a, b);
    const key = `${from}:${to}`;
    if (from === to || seen.has(key)) return;
    seen.add(key);
    edges.push({ from, to });
    nodes[from].neighbors.push(to);
    nodes[to].neighbors.push(from);
  };
  nodes.forEach(({ id, community }) => {
    const base = community * 24, local = id % 24;
    connect(id, base + (local + 1) % 24);
    connect(id, base + (local + 5) % 24);
    if (local % 3 === 0) connect(id, base);
    if (local % 8 === 0) connect(id, ((community + 1) % 4) * 24 + local);
  });
  return { nodes, edges };
}

// Breadth-first search: each distance is the shortest hop count from the source.
export function traverseGraph(graph: GraphData, source: number): number[] {
  const distances = graph.nodes.map(() => -1);
  distances[source] = 0;
  const queue = [source];
  for (let index = 0; index < queue.length; index++) {
    for (const neighbor of graph.nodes[queue[index]].neighbors) {
      if (distances[neighbor] !== -1) continue;
      distances[neighbor] = distances[queue[index]] + 1;
      queue.push(neighbor);
    }
  }
  return distances;
}
