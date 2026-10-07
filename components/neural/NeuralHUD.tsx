"use client";

import { COMMUNITY_COLORS, type GraphData, type GraphMode } from "./NeuralNetwork";

const MODES: { id: GraphMode; label: string; description: string }[] = [
  { id: "connections", label: "Connections", description: "Signals travel along edges. Select a node to reveal its immediate neighborhood." },
  { id: "communities", label: "Communities", description: "Four connected communities. Color reveals the groups; bridges tie the whole network together." },
  { id: "traversal", label: "Explore / BFS", description: "A breadth-first wave follows the shortest hop distance from your selected node." },
];

export default function NeuralHUD({ graph, mode, source, paused, onMode, onPause, onSelect }: {
  graph: GraphData; mode: GraphMode; source: number; paused: boolean;
  onMode: (mode: GraphMode) => void; onPause: () => void; onSelect: (source: number) => void;
}) {
  return <div className="relative border-t border-white/15 pt-5">
    <div className="flex flex-wrap items-center gap-2">
      {MODES.map((item) => <button key={item.id} type="button" aria-pressed={mode === item.id} onClick={() => onMode(item.id)} className={`border px-3 py-2.5 font-mono text-[9px] uppercase tracking-wider transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-500 ${mode === item.id ? "border-orange-500/60 bg-orange-500/10 text-orange-400" : "border-white/15 text-white/50 hover:border-white/40 hover:text-white"}`}>{item.label}</button>)}
      <button type="button" onClick={onPause} aria-pressed={paused} aria-label={paused ? "Resume graph animation" : "Pause graph animation"} className="ml-auto px-2 py-2.5 font-mono text-[9px] uppercase tracking-wider text-white/60 focus-visible:outline-2 focus-visible:outline-orange-500">{paused ? "Play +" : "Pause II"}</button>
    </div>
    <p className="mt-4 min-h-10 max-w-lg text-xs leading-5 text-white/50">{MODES.find((item) => item.id === mode)?.description}</p>
    <div className="mt-4 flex flex-wrap items-center justify-between gap-4 font-mono text-[9px] uppercase tracking-wider text-white/45">
      <span>{graph.nodes.length} nodes / {graph.edges.length} edges</span>
      <label className="flex items-center gap-2">Source <select aria-label="Select graph source node" value={source} onChange={(event) => onSelect(Number(event.target.value))} className="rounded-none border border-white/20 bg-[#111111] p-2 text-orange-400 focus-visible:outline-orange-500">{graph.nodes.map((node) => <option key={node.id} value={node.id}>N{String(node.id).padStart(3, "0")}</option>)}</select></label>
      <span aria-live="polite">Degree {graph.nodes[source].neighbors.length} / Group {graph.nodes[source].community + 1}</span>
    </div>
    {mode === "communities" && <div className="mt-4 flex flex-wrap gap-4 font-mono text-[9px] text-white/60">{COMMUNITY_COLORS.map((color, index) => <span key={color} className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} />Community {index + 1}</span>)}</div>}
  </div>;
}
