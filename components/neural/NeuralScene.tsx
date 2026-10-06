"use client";

import { useEffect, useMemo, useRef } from "react";
import { COMMUNITY_COLORS, traverseGraph, type GraphData, type GraphMode } from "./NeuralNetwork";

type Projected = { x: number; y: number; depth: number; radius: number };

export default function NeuralScene({ graph, mode, source, paused, onSelect }: {
  graph: GraphData; mode: GraphMode; source: number; paused: boolean; onSelect: (id: number) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const projected = useRef<Projected[]>([]);
  const pointer = useRef({ x: 0, y: 0, hover: -1 });
  const time = useRef(0);
  const distances = useMemo(() => traverseGraph(graph, source), [graph, source]);
  const maxDistance = Math.max(...distances);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    let width = 1, height = 1, frame = 0, last = 0, lastDraw = 0, visible = false;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const resize = new ResizeObserver(([entry]) => {
      width = entry.contentRect.width;
      height = entry.contentRect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, width < 768 ? 1.5 : 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    });
    const draw = () => {
      context.clearRect(0, 0, width, height);
      const t = time.current;
      const angle = t * 0.09 + pointer.current.x * 0.18;
      const tilt = -0.22 + pointer.current.y * 0.13;
      const size = Math.min(width / 8.8, height / 8.1);
      const wave = (t * 1.3) % (maxDistance + 3);
      const hover = pointer.current.hover;
      const focus = hover >= 0 ? hover : source;
      const neighbors = graph.nodes[focus].neighbors;
      const glow = context.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, width * 0.48);
      glow.addColorStop(0, "rgba(234,88,12,0.08)");
      glow.addColorStop(1, "rgba(234,88,12,0)");
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);
      // A restrained orbital grid gives the network spatial scale.
      context.strokeStyle = "rgba(255,255,255,0.055)";
      context.lineWidth = 1;
      for (let ring = 0; ring < 3; ring++) {
        context.beginPath();
        context.ellipse(width / 2, height / 2, size * (3.3 + ring * 0.35), size * (1.2 + ring * 0.12), -0.2, 0, Math.PI * 2);
        context.stroke();
      }
      projected.current = graph.nodes.map((node) => {
        const [bx, by, bz] = node.position;
        const breathe = motion.matches ? 0 : Math.sin(t * 0.65 + node.id * 0.8) * 0.06;
        const spread = mode === "communities" ? 1.12 : 1;
        const x = (bx * Math.cos(angle) + bz * Math.sin(angle)) * spread;
        const z = bz * Math.cos(angle) - bx * Math.sin(angle);
        const y = by * Math.cos(tilt) - z * Math.sin(tilt) + breathe;
        const depth = z * Math.cos(tilt) + by * Math.sin(tilt);
        const perspective = 8 / (8 - depth);
        return { x: width / 2 + x * size * perspective, y: height / 2 + y * size * perspective, depth, radius: (2.1 + node.neighbors.length * 0.19) * perspective };
      });
      graph.edges.forEach((edge, index) => {
        const a = projected.current[edge.from], b = projected.current[edge.to];
        const adjacent = edge.from === focus || edge.to === focus;
        const reached = distances[edge.from] <= wave && distances[edge.to] <= wave;
        const color = mode === "communities" ? (graph.nodes[edge.from].community === graph.nodes[edge.to].community ? COMMUNITY_COLORS[graph.nodes[edge.from].community] : "#f1f0eb") : "#ff782f";
        context.strokeStyle = color;
        context.globalAlpha = mode === "traversal" ? (reached ? 0.35 : 0.045) : adjacent ? 0.7 : mode === "communities" ? 0.22 : 0.12;
        context.lineWidth = adjacent ? 1.3 : 0.7;
        context.beginPath(); context.moveTo(a.x, a.y); context.lineTo(b.x, b.y); context.stroke();
        if (!motion.matches && (mode !== "traversal" || reached) && index % 3 === 0) {
          const progress = (t * 0.3 + index * 0.173) % 1;
          const x = a.x + (b.x - a.x) * progress, y = a.y + (b.y - a.y) * progress;
          context.globalAlpha = 0.8;
          context.fillStyle = color;
          context.shadowBlur = 12; context.shadowColor = color;
          context.beginPath(); context.arc(x, y, 1.5, 0, Math.PI * 2); context.fill();
          context.shadowBlur = 0;
        }
      });
      graph.nodes.map((node) => ({ node, point: projected.current[node.id] })).sort((a, b) => a.point.depth - b.point.depth).forEach(({ node, point }) => {
        const active = node.id === focus;
        const frontier = mode === "traversal" && Math.abs(distances[node.id] - wave) < 0.65;
        const color = mode === "communities" ? COMMUNITY_COLORS[node.community] : active || frontier || neighbors.includes(node.id) ? "#ff782f" : "#e4e0d8";
        context.globalAlpha = mode === "traversal" && distances[node.id] > wave ? 0.18 : 0.85;
        context.fillStyle = color; context.shadowColor = color; context.shadowBlur = active || frontier ? 20 : 6;
        context.beginPath(); context.arc(point.x, point.y, point.radius * (active ? 1.6 : 1), 0, Math.PI * 2); context.fill();
        context.shadowBlur = 0;
        if (active || frontier) {
          context.strokeStyle = color; context.globalAlpha = 0.45;
          context.beginPath(); context.arc(point.x, point.y, point.radius + 5 + (motion.matches ? 0 : Math.sin(t * 3) * 2), 0, Math.PI * 2); context.stroke();
        }
        if (active || node.neighbors.length >= 9) {
          context.globalAlpha = active ? 0.9 : 0.35;
          context.font = "9px monospace"; context.fillText(`N${String(node.id).padStart(3, "0")}`, point.x + 12, point.y - 9);
        }
      });
      context.globalAlpha = 1;
    };
    const tick = (now: number) => {
      if (visible && !document.hidden) {
        if (!paused && !motion.matches) time.current += Math.min((now - (last || now)) / 1000, 0.05);
        if (width >= 768 || now - lastDraw >= 1000 / 30) { draw(); lastDraw = now; }
      }
      last = now;
      frame = requestAnimationFrame(tick);
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { rootMargin: "80px" });
    resize.observe(canvas);
    observer.observe(canvas);
    frame = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(frame); resize.disconnect(); observer.disconnect(); };
  }, [graph, mode, source, paused, distances, maxDistance]);

  const findNode = (x: number, y: number) => {
    let closest = -1, distance = 18;
    projected.current.forEach((point, id) => {
      const current = Math.hypot(point.x - x, point.y - y);
      if (current < distance) { distance = current; closest = id; }
    });
    return closest;
  };

  return <div className="relative h-[390px] w-full sm:h-[500px] lg:h-[570px]">
    <div className="pointer-events-none absolute left-0 top-3 z-10 font-mono text-[9px] uppercase tracking-[0.14em] text-white/35">Fig. 03 / A living network</div>
    <canvas ref={canvasRef} role="img" aria-label="Interactive three-dimensional graph of 96 nodes in four communities. Use the controls below to switch views and select a source node." className="h-full w-full" onPointerMove={(event) => {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - rect.left, y = event.clientY - rect.top;
      pointer.current = { x: x / rect.width - 0.5, y: y / rect.height - 0.5, hover: findNode(x, y) };
      event.currentTarget.style.cursor = pointer.current.hover >= 0 ? "pointer" : "default";
    }} onPointerLeave={() => { pointer.current = { x: 0, y: 0, hover: -1 }; }} onClick={(event) => {
      const rect = event.currentTarget.getBoundingClientRect();
      const id = findNode(event.clientX - rect.left, event.clientY - rect.top);
      if (id >= 0) { time.current = 0; onSelect(id); }
    }} />
    <div className="pointer-events-none absolute bottom-4 left-0 right-0 flex justify-between gap-4 font-mono text-[8px] uppercase tracking-wider text-white/35"><span>Move to orbit / Select to explore</span><span className="text-orange-400">G = (V, E)</span></div>
  </div>;
}
