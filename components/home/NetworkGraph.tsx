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
};

const majorNodes: Node[] = [
  {
    id: "hong-kong",
    x: 0.88,
    y: 0.20,
    label: "HONG KONG",
    description: "Currently based here.",
    level: "primary",
    orange: true,
  },
  {
    id: "milano",
    x: 0.43,
    y: 0.31,
    label: "MILANO",
    description: "Study, work and music.",
    level: "tertiary",
  },
  {
    id: "cremona",
    x: 0.46,
    y: 0.50,
    label: "CREMONA",
    description: "Where everything started.",
    level: "tertiary",
  },
  {
    id: "italy",
    x: 0.39,
    y: 0.76,
    label: "ITALY",
    description: "Home.",
    level: "tertiary",
  },
  {
    id: "data",
    x: 0.58,
    y: 0.20,
    label: "DATA",
    description: "The raw material.",
    level: "secondary",
  },
  {
    id: "ai",
    x: 0.65,
    y: 0.45,
    label: "AI",
    description: "Building intelligent systems.",
    level: "primary",
    orange: true,
  },
  {
    id: "ml",
    x: 0.76,
    y: 0.31,
    label: "MACHINE LEARNING",
    description: "Models that learn from data.",
    level: "secondary",
  },
  {
    id: "llm",
    x: 0.72,
    y: 0.58,
    label: "LLM",
    description: "Language as an interface to intelligence.",
    level: "tertiary",
  },
  {
    id: "agents",
    x: 0.82,
    y: 0.42,
    label: "AGENTS",
    description: "Systems that reason, decide and act.",
    level: "secondary",
    orange: true,
  },
  {
    id: "deep-learning",
    x: 0.58,
    y: 0.63,
    label: "RNN & CNN",
    description: "Deep learning architectures.",
    level: "tertiary",
  },
  {
    id: "products",
    x: 0.90,
    y: 0.53,
    label: "PRODUCTS",
    description: "Turning models into useful things.",
    level: "secondary",
  },
  {
    id: "jazz",
    x: 0.70,
    y: 0.75,
    label: "JAZZ",
    description: "Improvisation, structure and freedom.",
    level: "secondary",
    orange: true,
  },
  {
    id: "music",
    x: 0.86,
    y: 0.80,
    label: "MUSIC",
    description: "Twenty years behind the keys.",
    level: "tertiary",
  },
];

const connections: Connection[] = [
  // Journey
  { from: "italy", to: "cremona" },
  { from: "cremona", to: "milano" },
  { from: "milano", to: "hong-kong", orange: true },

  // Data / AI
  { from: "data", to: "ai", orange: true },
  { from: "data", to: "ml" },
  { from: "ml", to: "ai" },

  // AI stack
  { from: "ai", to: "llm", orange: true },
  { from: "llm", to: "agents", orange: true },
  { from: "ai", to: "agents" },

  // Deep learning
  { from: "ml", to: "deep-learning" },
  { from: "deep-learning", to: "ai" },

  // Building
  { from: "ai", to: "products", orange: true },
  { from: "ml", to: "products" },
  { from: "agents", to: "products", orange: true },

  // Music
  { from: "italy", to: "jazz" },
  { from: "jazz", to: "music", orange: true },

  // Cross-world
  { from: "ai", to: "jazz", orange: true },
  { from: "products", to: "music" },
  { from: "hong-kong", to: "agents", orange: true },
];

const nodeMap = Object.fromEntries(
  majorNodes.map((node) => [node.id, node])
);

export default function NetworkGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [hoveredNode, setHoveredNode] = useState<Node | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationFrame = 0;
    let visible = true;
    let lastDraw = 0;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    observer.observe(canvas);

    let backgroundNodes: { x: number; y: number }[] = [];

    let particles: Particle[] = [];

    let activeNodeId: string | null = null;

    const mouse = {
      x: -1000,
      y: -1000,
    };

    const getPoint = (node: { x: number; y: number }) => ({
      x: (width < 768 ? 0.08 + ((node.x - 0.31) / 0.66) * 0.84 : node.x) * width,
      y: node.y * height,
    });

    const resize = () => {
      const rect = canvas.getBoundingClientRect();

      width = rect.width;
      height = rect.height;

      const dpr = Math.min(window.devicePixelRatio || 1, width < 768 ? 1.5 : 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      createBackground();
    };

    const createBackground = () => {
      backgroundNodes = [];

      for (let i = 0; i < (width < 768 ? 65 : 165); i++) {
        backgroundNodes.push({
          x: 0.31 + Math.random() * 0.66,
          y: 0.05 + Math.random() * 0.9,
        });
      }

      particles = [];

      for (let i = 0; i < (width < 768 ? 18 : 38); i++) {
        particles.push({
          connectionIndex: Math.floor(
            Math.random() * connections.length
          ),
          progress: Math.random(),
          speed: 0.001 + Math.random() * 0.002,
        });
      }
    };

    const getControlPoint = (from: Node, to: Node) => {
      const a = getPoint(from);
      const b = getPoint(to);

      const midX = (a.x + b.x) / 2;
      const midY = (a.y + b.y) / 2;

      const dx = b.x - a.x;
      const dy = b.y - a.y;

      const length = Math.sqrt(dx * dx + dy * dy) || 1;

      const normalX = -dy / length;
      const normalY = dx / length;

      const amount = Math.min(length * 0.1, 45);

      return {
        x: midX + normalX * amount,
        y: midY + normalY * amount,
      };
    };

    const connectionIsActive = (connection: Connection) => {
      if (!activeNodeId) return true;

      return (
        connection.from === activeNodeId ||
        connection.to === activeNodeId
      );
    };

    const nodeIsConnected = (nodeId: string) => {
      if (!activeNodeId) return true;

      if (nodeId === activeNodeId) return true;

      return connections.some(
        (connection) =>
          (connection.from === activeNodeId &&
            connection.to === nodeId) ||
          (connection.to === activeNodeId &&
            connection.from === nodeId)
      );
    };

    const drawConnection = (connection: Connection) => {
      const from = nodeMap[connection.from];
      const to = nodeMap[connection.to];

      const a = getPoint(from);
      const b = getPoint(to);

      const control = getControlPoint(from, to);

      const active = connectionIsActive(connection);

      const opacity = activeNodeId
        ? active
          ? 0.65
          : 0.035
        : connection.orange
          ? 0.26
          : 0.15;

      ctx.beginPath();

      ctx.moveTo(a.x, a.y);

      ctx.quadraticCurveTo(
        control.x,
        control.y,
        b.x,
        b.y
      );

      ctx.strokeStyle = connection.orange
        ? `rgba(234,88,12,${opacity})`
        : `rgba(17,17,17,${opacity})`;

      ctx.lineWidth =
        activeNodeId && active
          ? 1.3
          : connection.orange
            ? 0.8
            : 0.55;

      ctx.stroke();
    };

    const drawBackground = () => {
      for (let i = 0; i < backgroundNodes.length; i++) {
        const a = backgroundNodes[i];

        const pointA = getPoint(a);

        for (
          let j = i + 1;
          j < backgroundNodes.length;
          j++
        ) {
          const b = backgroundNodes[j];

          const pointB = getPoint(b);

          const dx = pointA.x - pointB.x;
          const dy = pointA.y - pointB.y;

          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 90) {
            ctx.beginPath();

            ctx.moveTo(pointA.x, pointA.y);
            ctx.lineTo(pointB.x, pointB.y);

            ctx.strokeStyle = activeNodeId
              ? "rgba(17,17,17,.018)"
              : "rgba(17,17,17,.055)";

            ctx.lineWidth = 0.35;

            ctx.stroke();
          }
        }

        ctx.beginPath();

        ctx.arc(
          pointA.x,
          pointA.y,
          1,
          0,
          Math.PI * 2
        );

        ctx.fillStyle = activeNodeId
          ? "rgba(17,17,17,.08)"
          : i % 9 === 0
            ? "rgba(234,88,12,.55)"
            : "rgba(17,17,17,.32)";

        ctx.fill();
      }
    };

    const getNodeRadius = (node: Node) => {
      if (node.level === "primary") return 8;
      if (node.level === "secondary") return 5.5;

      return 4;
    };

    const drawNodes = (time: number) => {
      majorNodes.forEach((node, index) => {
        const point = getPoint(node);

        const connected = nodeIsConnected(node.id);

        const isHovered = activeNodeId === node.id;

        const baseRadius = getNodeRadius(node);

        const pulse =
          Math.sin(time * 0.0015 + index) * 0.6;

        const radius =
          baseRadius +
          pulse +
          (isHovered ? 3 : 0);

        const alpha =
          activeNodeId && !connected ? 0.12 : 1;

        // Glow
        const glowRadius =
          node.level === "primary"
            ? 30
            : node.level === "secondary"
              ? 20
              : 14;

        const gradient = ctx.createRadialGradient(
          point.x,
          point.y,
          0,
          point.x,
          point.y,
          isHovered ? glowRadius * 1.8 : glowRadius
        );

        gradient.addColorStop(
          0,
          node.orange
            ? `rgba(234,88,12,${0.35 * alpha})`
            : `rgba(17,17,17,${0.16 * alpha})`
        );

        gradient.addColorStop(
          1,
          "rgba(0,0,0,0)"
        );

        ctx.fillStyle = gradient;

        ctx.beginPath();

        ctx.arc(
          point.x,
          point.y,
          isHovered
            ? glowRadius * 1.8
            : glowRadius,
          0,
          Math.PI * 2
        );

        ctx.fill();

        // Node
        ctx.beginPath();

        ctx.arc(
          point.x,
          point.y,
          Math.max(radius, 2),
          0,
          Math.PI * 2
        );

        ctx.fillStyle = node.orange
          ? `rgba(234,88,12,${alpha})`
          : `rgba(17,17,17,${alpha})`;

        ctx.fill();

        // Ring when hovered
        if (isHovered) {
          ctx.beginPath();

          ctx.arc(
            point.x,
            point.y,
            radius + 8,
            0,
            Math.PI * 2
          );

          ctx.strokeStyle = node.orange
            ? "rgba(234,88,12,.6)"
            : "rgba(17,17,17,.35)";

          ctx.lineWidth = 1;

          ctx.stroke();
        }

        // Label
        ctx.font =
          node.level === "primary"
            ? "600 12px monospace"
            : "500 10px monospace";

        ctx.fillStyle =
          activeNodeId && !connected
            ? "rgba(17,17,17,.13)"
            : "rgba(17,17,17,.82)";

        ctx.fillText(
          node.label,
          Math.max(4, Math.min(point.x + baseRadius + 10, width - ctx.measureText(node.label).width - 4)),
          point.y - 8
        );
      });
    };

    const getParticlePoint = (
      connection: Connection,
      progress: number
    ) => {
      const from = nodeMap[connection.from];
      const to = nodeMap[connection.to];

      const start = getPoint(from);
      const end = getPoint(to);

      const control = getControlPoint(from, to);

      const inverse = 1 - progress;

      return {
        x:
          inverse * inverse * start.x +
          2 *
            inverse *
            progress *
            control.x +
          progress * progress * end.x,

        y:
          inverse * inverse * start.y +
          2 *
            inverse *
            progress *
            control.y +
          progress * progress * end.y,
      };
    };

    const drawParticles = () => {
      particles.forEach((particle) => {
        particle.progress += particle.speed;

        if (particle.progress >= 1) {
          particle.progress = 0;

          particle.connectionIndex =
            Math.floor(
              Math.random() *
                connections.length
            );

          particle.speed =
            0.001 +
            Math.random() * 0.002;
        }

        const connection =
          connections[particle.connectionIndex];

        const active =
          connectionIsActive(connection);

        if (activeNodeId && !active) {
          return;
        }

        const point = getParticlePoint(
          connection,
          particle.progress
        );

        ctx.beginPath();

        ctx.arc(
          point.x,
          point.y,
          connection.orange ? 2.2 : 1.5,
          0,
          Math.PI * 2
        );

        ctx.fillStyle = connection.orange
          ? "#ea580c"
          : "#111111";

        ctx.fill();
      });
    };

    const findHoveredNode = (
      mouseX: number,
      mouseY: number
    ) => {
      let found: Node | null = null;

      for (const node of majorNodes) {
        const point = getPoint(node);

        const dx = mouseX - point.x;
        const dy = mouseY - point.y;

        const distance = Math.sqrt(
          dx * dx + dy * dy
        );

        if (distance < 28) {
          found = node;
          break;
        }
      }

      return found;
    };

    const draw = (time: number) => {
      if (!visible || document.hidden || (width < 768 && time - lastDraw < 1000 / 30)) {
        animationFrame = requestAnimationFrame(draw);
        return;
      }
      lastDraw = time;
      ctx.clearRect(0, 0, width, height);

      drawBackground();

      connections.forEach(drawConnection);

      if (!motion.matches) drawParticles();

      drawNodes(motion.matches ? 0 : time);

      animationFrame =
        requestAnimationFrame(draw);
    };

    const onMouseMove = (
      event: MouseEvent
    ) => {
      const rect =
        canvas.getBoundingClientRect();

      mouse.x =
        event.clientX - rect.left;

      mouse.y =
        event.clientY - rect.top;

      const hovered = findHoveredNode(
        mouse.x,
        mouse.y
      );

      const nextId = hovered?.id ?? null;

      if (nextId !== activeNodeId) {
        activeNodeId = nextId;

        setHoveredNode(hovered);

        canvas.style.cursor = hovered
          ? "crosshair"
          : "default";
      }
    };

    const onMouseLeave = () => {
      activeNodeId = null;

      setHoveredNode(null);

      mouse.x = -1000;
      mouse.y = -1000;
    };

    resize();

    animationFrame =
      requestAnimationFrame(draw);

    window.addEventListener(
      "resize",
      resize
    );

    canvas.addEventListener(
      "mousemove",
      onMouseMove
    );

    canvas.addEventListener(
      "mouseleave",
      onMouseLeave
    );

    return () => {
      observer.disconnect();
      cancelAnimationFrame(
        animationFrame
      );

      window.removeEventListener(
        "resize",
        resize
      );

      canvas.removeEventListener(
        "mousemove",
        onMouseMove
      );

      canvas.removeEventListener(
        "mouseleave",
        onMouseLeave
      );
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="pointer-events-auto absolute inset-0 z-[2] h-full w-full"
        aria-label="Interactive knowledge graph"
      />

      {hoveredNode && (
        <div
          className="
            pointer-events-none
            absolute
            bottom-20
            right-8
            z-20
            w-[260px]
            border-t
            border-black/30
            pt-3
            md:right-12
          "
        >
          <div className="font-mono text-[9px] uppercase tracking-[0.15em] text-orange-600">
            Node / {hoveredNode.id}
          </div>

          <div className="mt-2 text-lg font-medium tracking-[-0.03em]">
            {hoveredNode.label}
          </div>

          <p className="mt-1 font-mono text-[10px] leading-4 text-black/55">
            {hoveredNode.description}
          </p>
        </div>
      )}
    </>
  );
}
