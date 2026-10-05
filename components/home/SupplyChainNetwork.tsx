"use client";

import { useEffect, useRef, useState } from "react";

type Neuron = {
  id: string;
  x: number;
  y: number;
  activation: number;
  targetActivation: number;
  layer: number;
  neighbors: number[];
};

type Synapse = {
  from: number;
  to: number;
  strength: number;
  activation: number;
};

export default function NeuralNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredNeuron, setHoveredNeuron] = useState<Neuron | null>(null);
  const neuronsRef = useRef<Neuron[]>([]);
  const synapsesRef = useRef<Synapse[]>([]);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationFrame = 0;
    const mouse = { x: -1000, y: -1000 };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (neuronsRef.current.length === 0) {
        const layers = 4;
        const neuronsPerLayer = [8, 16, 16, 8];
        let neuronId = 0;

        // Create neurons
        for (let layer = 0; layer < layers; layer++) {
          const count = neuronsPerLayer[layer];
          const layerX = (width / (layers + 1)) * (layer + 1);

          for (let i = 0; i < count; i++) {
            const y = (height / (count + 1)) * (i + 1);

            neuronsRef.current.push({
              id: `neuron-${neuronId}`,
              x: layerX,
              y: y,
              activation: 0,
              targetActivation: 0,
              layer: layer,
              neighbors: [],
            });

            neuronId++;
          }
        }

        // Create synapses between layers
        for (let layer = 0; layer < layers - 1; layer++) {
          const startIdx = neuronsPerLayer.slice(0, layer).reduce((a, b) => a + b, 0);
          const endIdx = neuronsPerLayer.slice(0, layer + 1).reduce((a, b) => a + b, 0);
          const nextEndIdx = neuronsPerLayer.slice(0, layer + 2).reduce((a, b) => a + b, 0);

          for (let from = startIdx; from < endIdx; from++) {
            // Connect to random neurons in next layer
            const connectionsPerNeuron = Math.floor(neuronsPerLayer[layer + 1] / 2);
            for (let c = 0; c < connectionsPerNeuron; c++) {
              const to = endIdx + Math.floor(Math.random() * neuronsPerLayer[layer + 1]);

              synapsesRef.current.push({
                from,
                to,
                strength: 0.5 + Math.random() * 0.5,
                activation: 0,
              });

              neuronsRef.current[from].neighbors.push(to);
            }
          }
        }
      }
    };

    const activateNeurons = () => {
      const time = timeRef.current;

      // Input layer activation (stimulus patterns)
      const inputLayer = neuronsRef.current.filter((n) => n.layer === 0);

      if (time % 40 === 0) {
        // Random input spikes
        for (let i = 0; i < 2; i++) {
          const randomInput = inputLayer[Math.floor(Math.random() * inputLayer.length)];
          randomInput.targetActivation = 1;
        }
      }

      // Propagate activation through network
      for (const neuron of neuronsRef.current) {
        // Decay activation
        neuron.activation *= 0.92;
        neuron.targetActivation *= 0.88;

        // Move toward target
        neuron.activation += (neuron.targetActivation - neuron.activation) * 0.15;

        // Fire if activation is high enough
        if (neuron.activation > 0.3) {
          for (const neighborIdx of neuron.neighbors) {
            const neighbor = neuronsRef.current[neighborIdx];
            neighbor.targetActivation = Math.min(1, neighbor.targetActivation + 0.4);
          }
        }
      }

      // Update synapses based on source neuron activation
      for (const synapse of synapsesRef.current) {
        const sourceActivation =
          neuronsRef.current[synapse.from].activation * synapse.strength;
        synapse.activation += (sourceActivation - synapse.activation) * 0.2;
      }
    };

    const draw = () => {
      timeRef.current += 1;

      // Beautiful gradient background
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "#f1f0eb");
      gradient.addColorStop(0.5, "#ebe8df");
      gradient.addColorStop(1, "#f1f0eb");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      activateNeurons();

      // Draw synapses (connections)
      for (const synapse of synapsesRef.current) {
        const fromNeuron = neuronsRef.current[synapse.from];
        const toNeuron = neuronsRef.current[synapse.to];

        // Color based on activation
        const activation = Math.pow(synapse.activation, 0.5);
        const hue = 12; // Orange hue
        const saturation = Math.min(100, activation * 150);
        const lightness = 55 - activation * 25;

        ctx.strokeStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        ctx.lineWidth = 0.5 + activation * 1.5;
        ctx.lineCap = "round";
        ctx.globalAlpha = 0.2 + activation * 0.4;

        ctx.beginPath();
        ctx.moveTo(fromNeuron.x, fromNeuron.y);
        ctx.lineTo(toNeuron.x, toNeuron.y);
        ctx.stroke();

        ctx.globalAlpha = 1;
      }

      // Draw neurons
      for (const neuron of neuronsRef.current) {
        const isHovered = hoveredNeuron?.id === neuron.id;
        const activation = neuron.activation;

        // Glow halo
        const glowSize = 12 + activation * 15;
        const glowGradient = ctx.createRadialGradient(
          neuron.x,
          neuron.y,
          0,
          neuron.x,
          neuron.y,
          glowSize
        );

        glowGradient.addColorStop(0, `rgba(234, 88, 12, ${activation * 0.4})`);
        glowGradient.addColorStop(1, `rgba(234, 88, 12, 0)`);

        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(neuron.x, neuron.y, glowSize, 0, Math.PI * 2);
        ctx.fill();

        // Neuron body - color based on activation
        const baseSize = isHovered ? 5.5 : 4.5;
        const size = baseSize + activation * 3;

        // Gradient for 3D effect
        const neuronGradient = ctx.createRadialGradient(
          neuron.x - size * 0.3,
          neuron.y - size * 0.3,
          0,
          neuron.x,
          neuron.y,
          size
        );

        const activationColor = Math.round(activation * 255);
        neuronGradient.addColorStop(
          0,
          `rgb(255, ${200 - activationColor}, 100)`
        );
        neuronGradient.addColorStop(
          1,
          `rgb(234, ${100 - activationColor * 0.5}, 12)`
        );

        ctx.fillStyle = neuronGradient;
        ctx.beginPath();
        ctx.arc(neuron.x, neuron.y, size, 0, Math.PI * 2);
        ctx.fill();

        // Bright core
        ctx.fillStyle = `rgba(255, 255, 255, ${0.4 + activation * 0.4})`;
        ctx.beginPath();
        ctx.arc(neuron.x, neuron.y, size * 0.4, 0, Math.PI * 2);
        ctx.fill();

        // Pulsing ring when highly active
        if (activation > 0.5) {
          const pulseAlpha = Math.sin(timeRef.current * 0.15) * 0.5 + 0.5;
          ctx.strokeStyle = `rgba(234, 88, 12, ${pulseAlpha * activation})`;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(neuron.x, neuron.y, size + 6, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Hover ring
        if (isHovered) {
          ctx.strokeStyle = "rgba(17, 17, 17, 0.3)";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(neuron.x, neuron.y, size + 10, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // Draw layer labels
      const layers = [
        "INPUT",
        "HIDDEN 1",
        "HIDDEN 2",
        "OUTPUT",
      ];
      const layerPositions = [
        width / 5,
        width / 2.5,
        (width * 3) / 5,
        (width * 4) / 5,
      ];

      ctx.fillStyle = "rgba(17, 17, 17, 0.4)";
      ctx.font = "10px monospace";
      ctx.textAlign = "center";

      for (let i = 0; i < layers.length; i++) {
        ctx.fillText(layers[i], layerPositions[i], 25);
      }

      animationFrame = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;

      let closestNeuron: Neuron | null = null;
      let closestDistance = 25;

      for (const neuron of neuronsRef.current) {
        const dist = Math.sqrt(
          (neuron.x - mouse.x) ** 2 + (neuron.y - mouse.y) ** 2
        );

        if (dist < closestDistance) {
          closestNeuron = neuron;
          closestDistance = dist;
        }
      }

      setHoveredNeuron(closestNeuron);
    };

    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", () => setHoveredNeuron(null));

    resize();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", () => setHoveredNeuron(null));
      cancelAnimationFrame(animationFrame);
    };
  }, [hoveredNeuron]);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ background: "#f1f0eb" }}
      />

      {hoveredNeuron && (
        <div className="absolute top-6 left-6 pointer-events-none animate-in fade-in duration-300">
          <div className="font-mono text-[8px] uppercase tracking-[0.2em] text-orange-600 mb-2">
            Neuron Active
          </div>
          <div className="text-[9px] font-mono text-black/40">
            Layer {hoveredNeuron.layer + 1}
          </div>
          <div className="text-[8px] font-mono text-black/30 mt-1">
            Activation: {(hoveredNeuron.activation * 100).toFixed(0)}%
          </div>
        </div>
      )}
    </div>
  );
}
