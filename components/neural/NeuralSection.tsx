"use client";

import { useMemo, useState } from "react";
import { createGraph, type GraphMode } from "./NeuralNetwork";
import NeuralScene from "./NeuralScene";
import NeuralHUD from "./NeuralHUD";

export default function NeuralSection() {
  const graph = useMemo(() => createGraph(), []);
  const [mode, setMode] = useState<GraphMode>("connections");
  const [source, setSource] = useState(0);
  const [paused, setPaused] = useState(false);
  return (
    <section id="neural-system" aria-labelledby="graph-title" className="relative overflow-hidden bg-[#080808] text-[#f1f0eb]">
      <div aria-hidden="true" className="technical-grid-dark pointer-events-none absolute inset-0 opacity-[0.08]" />
      <div className="page-shell relative">
        <div className="flex items-center justify-between gap-4 border-b border-white/15 py-6 font-mono text-[9px] uppercase tracking-[0.16em]">
          <span className="text-orange-500">03 / Graph thinking</span>
          <span className="text-white/45">Everything is connected</span>
        </div>
        <div className="grid items-center gap-8 pb-10 pt-16 lg:grid-cols-[0.85fr_1.5fr] lg:gap-0 lg:pt-20">
          <div className="relative z-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">A way of seeing the world</p>
            <h2 id="graph-title" className="mt-6 text-[clamp(3.7rem,6.8vw,7.5rem)] font-medium leading-[0.85] tracking-[-0.075em]">THINK IN<br /><span className="text-orange-500">GRAPHS.</span></h2>
            <p className="mt-8 max-w-[360px] text-xl leading-snug tracking-[-0.025em] text-white/85">The connections are where things get interesting.</p>
            <p className="mt-5 max-w-[370px] text-sm leading-7 text-white/50">I love graphs because they turn complexity into something I can explore. A node tells one story. Its connections reveal a much bigger one: how ideas relate, where information flows, and why a small change can ripple through an entire system.</p>
            <p className="mt-4 max-w-[370px] text-sm leading-7 text-white/50">From knowledge networks to dependencies and human relationships, I keep coming back to the same question: what becomes visible when we look at the connections?</p>
            <div className="mt-8 flex items-center gap-3 font-mono text-[10px] tracking-wider text-orange-500"><span className="h-px w-8 bg-orange-500" /> NODES. EDGES. POSSIBILITIES.</div>
          </div>
          <div className="min-w-0">
            <NeuralScene graph={graph} mode={mode} source={source} paused={paused} onSelect={setSource} />
            <NeuralHUD graph={graph} mode={mode} source={source} paused={paused} onMode={setMode} onPause={() => setPaused((value) => !value)} onSelect={setSource} />
          </div>
        </div>
        <div className="grid gap-8 border-t border-white/15 py-10 md:grid-cols-3">
          {[
            ["01 / Relationships", "Context changes everything.", "An isolated fact is useful. Knowing how it connects to everything else is what makes it powerful."],
            ["02 / Emergence", "Small rules. Big patterns.", "Simple connections can create communities, hubs and unexpected structures. That is the part I find endlessly fascinating."],
            ["03 / Exploration", "Follow the next connection.", "Graphs make curiosity tangible: start somewhere, trace a path, and discover something you did not know to look for."],
          ].map(([label, title, text]) => <article key={label}><p className="font-mono text-[9px] uppercase tracking-[0.13em] text-orange-500">{label}</p><h3 className="mt-4 text-xl tracking-tight">{title}</h3><p className="mt-3 max-w-sm text-sm leading-6 text-white/45">{text}</p></article>)}
        </div>
      </div>
    </section>
  );
}
