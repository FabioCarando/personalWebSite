"use client";

import { useEffect, useRef, useState } from "react";

type NodeLevel = "primary" | "secondary" | "tertiary";

type Node = {
  id: string;
  x: number;
  y: number;
  label: string;
  description: string;
  level: NodeLevel;
  orange?: boolean;
};

type Connection = {
  from: string;
  to: string;
  orange?: boolean;
};

type Particle = {
  connectionIndex: number;
  progress: number;
  speed: number;
  trail: { x: number; y: number }[];
};

const majorNodes: Node[] = [
  {
    id: "hong-kong",
    x: 0.50,
    y: 0.50,
    label: "HONG KONG",
    description: "Gateway to Asia.",
    level: "primary",
    orange: true,
  },
  {
    id: "central",
    x: 0.55,
    y: 0.35,
    label: "CENTRAL",
    description: "Financial heart.",
    level: "secondary",
    orange: true,
  },
  {
    id: "kowloon",
    x: 0.45,
    y: 0.30,
    label: "KOWLOON",
    description: "Urban energy.",
    level: "secondary",
  },
  {
    id: "new-territories",
    x: 0.40,
    y: 0.20,
    label: "NEW TERRITORIES",
    description: "Growth frontier.",
    level: "secondary",
  },
  {
    id: "outlying-islands",
    x: 0.35,
    y: 0.60,
    label: "OUTLYING ISLANDS",
    description: "Escape and nature.",
    level: "tertiary",
  },
  {
    id: "fintech",
    x: 0.65,
    y: 0.25,
    label: "FINTECH",
    description: "Financial innovation.",
    level: "secondary",
    orange: true,
  },
  {
    id: "data-hub",
    x: 0.70,
    y: 0.40,
    label: "DATA HUB",
    description: "Information flows.",
    level: "secondary",
    orange: true,
  },
  {
    id: "ai-center",
    x: 0.75,
    y: 0.50,
    label: "AI CENTER",
    description: "Machine intelligence.",
    level: "primary",
    orange: true,
  },
  {
    id: "tech-park",
    x: 0.68,
    y: 0.65,
    label: "TECH PARK",
    description: "Innovation ecosystem.",
    level: "secondary",
  },
  {
    id: "culture",
    x: 0.35,
    y: 0.75,
    label: "CULTURE",
    description: "Art and heritage.",
    level: "secondary",
  },
  {
    id: "food-scene",
    x: 0.42,
    y: 0.82,
    label: "FOOD SCENE",
    description: "Culinary paradise.",
    level: "tertiary",
  },
  {
    id: "nightlife",
    x: 0.50,
    y: 0.80,
    label: "NIGHTLIFE",
    description: "24-hour city.",
    level: "tertiary",
  },
  {
    id: "jazz",
    x: 0.25,
    y: 0.50,
    label: "JAZZ",
    description: "Living improvisation.",
    level: "secondary",
    orange: true,
  },
  {
    id: "music-venues",
    x: 0.20,
    y: 0.40,
    label: "MUSIC VENUES",
    description: "Performance spaces.",
    level: "tertiary",
  },
  {
    id: "exploration",
    x: 0.30,
    y: 0.60,
    label: "EXPLORATION",
    description: "Asia discovery.",
    level: "secondary",
  },
  {
    id: "harbor",
    x: 0.58,
    y: 0.60,
    label: "VICTORIA HARBOR",
    description: "Trading gateway.",
    level: "secondary",
  },
  {
    id: "logistics",
    x: 0.62,
    y: 0.72,
    label: "LOGISTICS",
    description: "Supply chain hub.",
    level: "secondary",
  },
  {
    id: "connectivity",
    x: 0.55,
    y: 0.68,
    label: "CONNECTIVITY",
    description: "Global bridge.",
    level: "secondary",
    orange: true,
  },
  {
    id: "2024",
    x: 0.10,
    y: 0.25,
    label: "2024",
    description: "Arrival.",
    level: "tertiary",
  },
  {
    id: "present",
    x: 0.10,
    y: 0.50,
    label: "2026+",
    description: "Current chapter.",
    level: "secondary",
    orange: true,
  },
];

const connections: Connection[] = [
  { from: "hong-kong", to: "central", orange: true },
  { from: "hong-kong", to: "kowloon" },
  { from: "hong-kong", to: "new-territories" },
  { from: "hong-kong", to: "outlying-islands" },
  { from: "central", to: "kowloon" },
  { from: "kowloon", to: "new-territories" },
  { from: "central", to: "fintech", orange: true },
  { from: "fintech", to: "data-hub", orange: true },
  { from: "data-hub", to: "ai-center", orange: true },
  { from: "ai-center", to: "tech-park" },
  { from: "fintech", to: "ai-center", orange: true },
  { from: "kowloon", to: "tech-park" },
  { from: "tech-park", to: "connectivity", orange: true },
  { from: "hong-kong", to: "culture" },
  { from: "culture", to: "food-scene" },
  { from: "culture", to: "nightlife" },
  { from: "food-scene", to: "nightlife" },
  { from: "hong-kong", to: "jazz", orange: true },
  { from: "jazz", to: "music-venues" },
  { from: "jazz", to: "nightlife" },
  { from: "hong-kong", to: "exploration", orange: true },
  { from: "exploration", to: "outlying-islands" },
  { from: "exploration", to: "culture" },
  { from: "central", to: "harbor" },
  { from: "harbor", to: "logistics" },
  { from: "logistics", to: "connectivity", orange: true },
  { from: "harbor", to: "fintech" },
  { from: "ai-center", to: "jazz", orange: true },
  { from: "data-hub", to: "exploration", orange: true },
  { from: "present", to: "ai-center", orange: true },
  { from: "2024", to: "present" },
  { from: "present", to: "hong-kong", orange: true },
];

const nodeMap = Object.fromEntries(
  majorNodes.map((node) => [node.id, node])
);

export default function HongKongNetworkGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredNode, setHoveredNode] = useState<Node | null>(null);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationFrame = 0;
    let backgroundNodes: { x: number; y: number }[] = [];
    let particles: Particle[] = [];
    const mouse = { x: -1000, y: -1000 };

    const getPoint = (node: { x: number; y: number }) => ({
      x: node.x * width,
      y: node.y * height,
    });

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      createBackground();
    };

    const createBackground = () => {
      backgroundNodes = [];
      for (let i = 0; i < 250; i++) {
        backgroundNodes.push({
          x: Math.random(),
          y: Math.random(),
        });
      }

      particles = [];
      for (let i = 0; i < 80; i++) {
        particles.push({
          connectionIndex: Math.floor(Math.random() * connections.length),
          progress: Math.random(),
          speed: 0.0003 + Math.random() * 0.0012,
          trail: [],
        });
      }
    };

    const draw = () => {
      timeRef.current += 1;

      // Background
      ctx.fillStyle = "rgba(217, 216, 210, 1)";
      ctx.fillRect(0, 0, width, height);

      // Background noise
      ctx.fillStyle = "#111111";
      ctx.globalAlpha = 0.015;
      for (const node of backgroundNodes) {
        const p = getPoint(node);
        ctx.fillRect(p.x, p.y, 1, 1);
      }
      ctx.globalAlpha = 1;

      // Draw connections with gradient
      for (const connection of connections) {
        const fromNode = nodeMap[connection.from];
        const toNode = nodeMap[connection.to];
        if (!fromNode || !toNode) continue;

        const from = getPoint(fromNode);
        const to = getPoint(toNode);

        // Pulsing effect
        const pulse =
          0.8 +
          0.2 * Math.sin((timeRef.current + connection.from.length) * 0.005);

        ctx.strokeStyle = connection.orange
          ? `rgba(234, 88, 12, ${0.12 * pulse})`
          : `rgba(17, 17, 17, ${0.06 * pulse})`;
        ctx.lineWidth = connection.orange ? 1.5 : 1;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();
      }

      // Draw particles with neural trails
      for (const particle of particles) {
        const connection = connections[particle.connectionIndex];
        const fromNode = nodeMap[connection.from];
        const toNode = nodeMap[connection.to];

        if (!fromNode || !toNode) continue;

        const from = getPoint(fromNode);
        const to = getPoint(toNode);

        const x = from.x + (to.x - from.x) * particle.progress;
        const y = from.y + (to.y - from.y) * particle.progress;

        // Add to trail
        particle.trail.push({ x, y });
        if (particle.trail.length > 15) {
          particle.trail.shift();
        }

        // Draw trail
        ctx.strokeStyle = connection.orange
          ? "rgba(234, 88, 12, 0.4)"
          : "rgba(17, 17, 17, 0.2)";
        ctx.lineWidth = 1;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.beginPath();

        for (let i = 0; i < particle.trail.length; i++) {
          const p = particle.trail[i];
          const alpha = (i / particle.trail.length) * 0.5;
          ctx.globalAlpha = alpha;
          if (i === 0) {
            ctx.moveTo(p.x, p.y);
          } else {
            ctx.lineTo(p.x, p.y);
          }
        }
        ctx.stroke();
        ctx.globalAlpha = 1;

        // Draw particle core with glow
        const glowRadius = connection.orange ? 3.5 : 2.5;
        ctx.fillStyle = connection.orange
          ? "rgba(234, 88, 12, 0.3)"
          : "rgba(17, 17, 17, 0.15)";
        ctx.beginPath();
        ctx.arc(x, y, glowRadius + 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = connection.orange
          ? "rgba(234, 88, 12, 0.8)"
          : "rgba(17, 17, 17, 0.5)";
        ctx.beginPath();
        ctx.arc(x, y, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
        ctx.beginPath();
        ctx.arc(x, y, glowRadius * 0.4, 0, Math.PI * 2);
        ctx.fill();

        particle.progress += particle.speed;
        if (particle.progress > 1) {
          particle.progress = 0;
          particle.trail = [];
        }
      }

      // Draw nodes with neural glow
      for (const node of majorNodes) {
        const p = getPoint(node);
        const isHovered = hoveredNode?.id === node.id;

        let radius = 0;
        let alpha = 0;

        switch (node.level) {
          case "primary":
            radius = isHovered ? 14 : 12;
            alpha = 1;
            break;
          case "secondary":
            radius = isHovered ? 11 : 9;
            alpha = 0.85;
            break;
          case "tertiary":
            radius = isHovered ? 8 : 6;
            alpha = 0.65;
            break;
        }

        // Pulsing glow
        const pulseGlow =
          1 + 0.15 * Math.sin((timeRef.current + node.id.length) * 0.008);

        // Outer neural glow
        if (node.orange) {
          ctx.globalAlpha = 0.15 * pulseGlow;
          ctx.fillStyle = "#ea580c";
          ctx.beginPath();
          ctx.arc(p.x, p.y, radius + 12, 0, Math.PI * 2);
          ctx.fill();

          ctx.globalAlpha = 0.25 * pulseGlow;
          ctx.fillStyle = "#ea580c";
          ctx.beginPath();
          ctx.arc(p.x, p.y, radius + 7, 0, Math.PI * 2);
          ctx.fill();
        }

        // Node core
        ctx.globalAlpha = alpha;
        ctx.fillStyle = node.orange ? "#ea580c" : "#111111";
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fill();

        // Node border ring
        ctx.strokeStyle = node.orange
          ? "rgba(234, 88, 12, 0.4)"
          : "rgba(17, 17, 17, 0.2)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius + 2, 0, Math.PI * 2);
        ctx.stroke();

        // Inner highlight
        ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius * 0.35, 0, Math.PI * 2);
        ctx.fill();

        ctx.globalAlpha = 1;

        // Draw animated labels
        const labelDistance = radius + 25;
        const angleOffset = (timeRef.current * 0.002 + node.id.length) * 0.5;

        for (let i = 0; i < 3; i++) {
          const angle = angleOffset + (i * Math.PI * 2) / 3;
          const labelX = p.x + Math.cos(angle) * labelDistance;
          const labelY = p.y + Math.sin(angle) * labelDistance;

          const distFromMouse = Math.sqrt(
            (labelX - mouse.x) ** 2 + (labelY - mouse.y) ** 2
          );
          const labelAlpha = Math.max(0, Math.min(1, 1 - distFromMouse / 200));

          ctx.fillStyle = `rgba(17, 17, 17, ${0.3 * labelAlpha})`;
          ctx.font = "8px monospace";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";

          // Only show primary node label
          if (node.level === "primary" && i === 0) {
            ctx.fillStyle = node.orange
              ? `rgba(234, 88, 12, ${0.6 + labelAlpha * 0.4})`
              : `rgba(17, 17, 17, ${0.5 + labelAlpha * 0.5})`;
            ctx.font = "bold 9px monospace";
            ctx.fillText(node.label.substring(0, 3), labelX, labelY);
          }
        }
      }

      animationFrame = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;

      let closestNode: Node | null = null;
      let closestDistance = 50;

      for (const node of majorNodes) {
        const p = getPoint(node);
        const dist = Math.sqrt((p.x - mouse.x) ** 2 + (p.y - mouse.y) ** 2);

        if (dist < closestDistance) {
          closestNode = node;
          closestDistance = dist;
        }
      }

      setHoveredNode(closestNode);
    };

    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", () => setHoveredNode(null));

    resize();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", () => setHoveredNode(null));
      cancelAnimationFrame(animationFrame);
    };
  }, [hoveredNode]);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ background: "#d9d8d2" }}
      />

      {hoveredNode && (
        <div className="absolute top-6 left-6 pointer-events-none animate-in fade-in duration-300">
          <div className="font-mono text-[9px] uppercase tracking-[0.15em] text-orange-600 mb-2">
            {hoveredNode.label}
          </div>
          <div className="max-w-[220px] text-sm text-black/60 leading-relaxed">
            {hoveredNode.description}
          </div>
        </div>
      )}
    </div>
  );
}
