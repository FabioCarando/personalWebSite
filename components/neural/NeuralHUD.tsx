"use client";

import { useEffect, useState } from "react";

import { NeuralGraphData } from "./NeuralNetwork";

const STAGES = [
  "INPUT",
  "EMBEDDING",
  "ATTENTION",
  "REASONING",
  "SYNTHESIS",
  "OUTPUT",
];

export default function NeuralHUD({
  graph,
}: {
  graph: NeuralGraphData;
}) {
  const [activeStage, setActiveStage] = useState(0);
  const [signal, setSignal] = useState(0.847);
  const [latency, setLatency] = useState(12.4);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveStage(
        (current) => (current + 1) % STAGES.length
      );

      setSignal(
        0.72 + Math.random() * 0.24
      );

      setLatency(
        9 + Math.random() * 7
      );
    }, 1800);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <>
      {/* RIGHT SYSTEM PANEL */}

      <div className="pointer-events-none absolute right-[4vw] top-[22%] z-20 hidden w-[205px] xl:block">
        <div className="border-l border-white/10 pl-5">
          <HudTitle>FC / NET 01</HudTitle>

          <HudRow
            label="Status"
            value="Inference"
            orange
          />

          <HudRow
            label="Architecture"
            value="Neural"
          />

          <HudRow
            label="Layers"
            value="06"
          />

          <HudRow
            label="Nodes"
            value={String(graph.nodes.length)}
          />

          <HudRow
            label="Edges"
            value={String(graph.connections.length)}
          />

          <HudRow
            label="Signal"
            value={signal.toFixed(3)}
          />

          <HudRow
            label="Latency"
            value={`${latency.toFixed(1)} ms`}
          />
        </div>

        {/* PIPELINE */}

        <div className="mt-10 border-l border-white/10 pl-5">
          <HudTitle>Process</HudTitle>

          <div className="space-y-3">
            {STAGES.map((stage, index) => {
              const completed = index < activeStage;
              const active = index === activeStage;

              return (
                <div
                  key={stage}
                  className="grid grid-cols-[20px_1fr_10px] items-center font-mono text-[7px] uppercase tracking-[0.12em]"
                >
                  <span className="text-white/20">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span
                    className={
                      active
                        ? "text-white/80"
                        : "text-white/30"
                    }
                  >
                    {stage}
                  </span>

                  <span
                    className={
                      active
                        ? "text-orange-500"
                        : completed
                          ? "text-white/45"
                          : "text-white/15"
                    }
                  >
                    {active
                      ? "●"
                      : completed
                        ? "✓"
                        : "○"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ACTIVITY */}

        <div className="mt-10 border-l border-white/10 pl-5">
          <HudTitle>Neural activity</HudTitle>

          <ActivityBars activeStage={activeStage} />
        </div>
      </div>

      {/* CENTER STAGE */}

      <div className="pointer-events-none absolute bottom-[100px] left-1/2 z-20 hidden -translate-x-1/2 md:block">
        <div className="text-center">
          <div className="font-mono text-[7px] uppercase tracking-[0.18em] text-white/20">
            Active stage
          </div>

          <div className="mt-2 font-mono text-[9px] uppercase tracking-[0.2em] text-orange-500">
            {STAGES[activeStage]}
          </div>
        </div>
      </div>
    </>
  );
}

function HudTitle({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mb-5 font-mono text-[7px] uppercase tracking-[0.18em] text-white/20">
      {children}
    </div>
  );
}

function HudRow({
  label,
  value,
  orange = false,
}: {
  label: string;
  value: string;
  orange?: boolean;
}) {
  return (
    <div className="mb-3 flex justify-between gap-4 font-mono text-[7px] uppercase tracking-[0.1em]">
      <span className="text-white/25">
        {label}
      </span>

      <span
        className={
          orange
            ? "text-orange-500"
            : "text-white/65"
        }
      >
        {value}
      </span>
    </div>
  );
}

function ActivityBars({
  activeStage,
}: {
  activeStage: number;
}) {
  const bars = [
    22,
    42,
    64,
    38,
    82,
    55,
    92,
    68,
    45,
    78,
    58,
    88,
  ];

  return (
    <div className="flex h-[38px] items-end gap-[3px]">
      {bars.map((height, index) => {
        const boost =
          (index + activeStage * 2) % 5 === 0
            ? 8
            : 0;

        return (
          <div
            key={index}
            className={
              index === activeStage * 2
                ? "w-[3px] bg-orange-500/70"
                : "w-[3px] bg-white/20"
            }
            style={{
              height: `${Math.min(
                100,
                height + boost
              )}%`,
            }}
          />
        );
      })}
    </div>
  );
}

