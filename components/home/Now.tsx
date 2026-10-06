"use client";

import { useEffect, useState } from "react";
import SupplyChainNetwork from "./SupplyChainNetwork";

export default function Now() {
  const [hongKongTime, setHongKongTime] = useState("--:--");

  useEffect(() => {
    const updateTime = () => {
      setHongKongTime(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Hong_Kong",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date())
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="now"
      className="relative bg-[#d9d8d2] text-[#111111]"
    >
      <div className="page-shell">
        {/* Header */}
        <div className="grid grid-cols-2 border-b border-black/20 py-5 md:grid-cols-12">
          <div className="md:col-span-3">
            <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-orange-600">
              03 / Currently
            </span>
          </div>

          <div className="hidden font-mono text-[8px] uppercase tracking-[0.14em] text-black/35 md:col-span-5 md:block">
            Current location / Asia Pacific
          </div>

          <div className="text-right font-mono text-[8px] uppercase tracking-[0.14em] text-black/40 md:col-span-4">
            22.2819° N / 114.1582° E
          </div>
        </div>

        {/* Title section */}
        <div className="grid grid-cols-1 items-end gap-6 py-14 md:grid-cols-12 md:gap-0 md:py-20 border-b border-black/20">
          <div className="md:col-span-3">
            <div className="font-mono text-[9px] uppercase tracking-[0.15em] text-black/40">
              Expertise
            </div>
          </div>

          <div className="mt-5 md:col-span-9 md:mt-0">
            <h2 className="text-[clamp(2.2rem,9vw,4rem)] font-medium leading-[0.95] tracking-[-0.07em] md:text-[clamp(4rem,8vw,9rem)] md:leading-[0.82]">
              PROJECT
              <br />
              EXPERIENCES
            </h2>
          </div>
        </div>

        {/* Sectors & Projects */}
        <div className="py-12 md:py-16 border-t border-black/20">
          <div className="mb-8 md:mb-12">
            <div className="font-mono text-[8px] uppercase tracking-[0.14em] text-black/35 mb-6">
              Industries & Expertise
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {/* Energy Sector */}
              <div>
                <div className="font-mono text-[9px] uppercase tracking-[0.15em] text-orange-600 mb-3">
                  Energy
                </div>
                <h3 className="text-xl font-medium tracking-[-0.03em] mb-3">
                  Power & Utilities
                </h3>
                <p className="text-sm text-black/60 leading-relaxed">
                  Demand forecasting, grid optimization, and energy distribution systems. Real-time analytics for renewable energy sources.
                </p>
              </div>

              {/* Financial Sector */}
              <div>
                <div className="font-mono text-[9px] uppercase tracking-[0.15em] text-orange-600 mb-3">
                  Finance
                </div>
                <h3 className="text-xl font-medium tracking-[-0.03em] mb-3">
                  Banking & Fintech
                </h3>
                <p className="text-sm text-black/60 leading-relaxed">
                  Risk assessment, fraud detection, and transaction analysis. AI-driven trading signals and portfolio optimization.
                </p>
              </div>

              {/* Supply Chain Sector */}
              <div>
                <div className="font-mono text-[9px] uppercase tracking-[0.15em] text-orange-600 mb-3">
                  Operations
                </div>
                <h3 className="text-xl font-medium tracking-[-0.03em] mb-3">
                  Supply Chain & Logistics
                </h3>
                <p className="text-sm text-black/60 leading-relaxed">
                  End-to-end visibility, demand planning, inventory optimization. Predictive logistics and route optimization.
                </p>
              </div>

              {/* Agriculture Sector */}
              <div>
                <div className="font-mono text-[9px] uppercase tracking-[0.15em] text-orange-600 mb-3">
                  Agriculture
                </div>
                <h3 className="text-xl font-medium tracking-[-0.03em] mb-3">
                  AgTech & Farming
                </h3>
                <p className="text-sm text-black/60 leading-relaxed">
                  Crop yield prediction, precision farming analytics, market price forecasting for farmers and agricultural enterprises.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Info grid */}
        <div className="grid grid-cols-1 border-t border-black/20 md:grid-cols-12">
          {/* Scope info */}
          <div className="md:col-span-3 md:border-r md:border-black/20 py-8 md:py-10">
            <div className="font-mono text-[8px] uppercase tracking-[0.15em] text-black/35 mb-5">
              Coverage
            </div>

            <div className="text-[1.35rem] leading-[1.05] tracking-[-0.035em] mb-5">
              End-to-End
              <br />
              Operations
            </div>

            <div className="font-mono text-[8px] uppercase leading-4 tracking-[0.12em] text-black/35">
              Source to
              <br />
              Consumer
            </div>
          </div>

          {/* Focus areas */}
          <div className="md:col-span-5 md:border-r md:border-black/20 py-8 md:py-10 md:px-8">
            <div className="font-mono text-[8px] uppercase tracking-[0.15em] text-black/35 mb-5">
              Key Areas
            </div>

            <p className="text-[clamp(1.4rem,2.2vw,2rem)] leading-[1.05] tracking-[-0.04em]">
              Demand planning & forecasting.
              <br />
              Logistics optimization.
              <br />
              AI-driven inventory.
              <br />
              Real-time visibility.
            </p>
          </div>

          {/* Active nodes info */}
          <div className="md:col-span-4 py-8 md:py-10 md:px-8">
            <div className="flex items-center gap-2 mb-5">
              <span className="h-[5px] w-[5px] rounded-full bg-orange-600 animate-pulse" />
              <div className="font-mono text-[8px] uppercase tracking-[0.15em] text-black/35">
                Network status
              </div>
            </div>

            <div className="text-[clamp(2.5rem,4vw,4rem)] leading-none tracking-[-0.065em] mb-4">
              28
            </div>

            <div className="font-mono text-[8px] uppercase tracking-[0.14em] text-black/35">
              Active nodes • 100 particles
            </div>
          </div>
        </div>

        {/* Approach & Methodology */}
        <div className="py-16 md:py-20 border-t border-black/20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-3">
              <div className="font-mono text-[8px] uppercase tracking-[0.15em] text-black/35">
                Methodology
              </div>
            </div>

            <div className="md:col-span-9">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <div className="text-lg font-medium tracking-[-0.03em] mb-3 text-orange-600">
                    Data-Driven
                  </div>
                  <p className="text-sm text-black/60 leading-relaxed">
                    Building solutions grounded in real data, statistical rigor, and validated assumptions across all industries.
                  </p>
                </div>

                <div>
                  <div className="text-lg font-medium tracking-[-0.03em] mb-3 text-orange-600">
                    Scalable Systems
                  </div>
                  <p className="text-sm text-black/60 leading-relaxed">
                    Engineering platforms that grow from pilot to enterprise deployment without losing performance or reliability.
                  </p>
                </div>

                <div>
                  <div className="text-lg font-medium tracking-[-0.03em] mb-3 text-orange-600">
                    Domain Expertise
                  </div>
                  <p className="text-sm text-black/60 leading-relaxed">
                    Deep understanding of energy markets, financial systems, supply chains, and agricultural cycles.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Project Results */}
        <div className="border-t border-black/20 py-8 md:py-10">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <div className="text-2xl font-medium tracking-[-0.05em] text-orange-600 mb-2">
                4+
              </div>
              <div className="font-mono text-[8px] uppercase tracking-[0.12em] text-black/35">
                Industry Sectors
              </div>
            </div>

            <div>
              <div className="text-2xl font-medium tracking-[-0.05em] text-orange-600 mb-2">
                7
              </div>
              <div className="font-mono text-[8px] uppercase tracking-[0.12em] text-black/35">
                Client Projects
              </div>
            </div>

            <div>
              <div className="text-2xl font-medium tracking-[-0.05em] text-orange-600 mb-2">
                $320k
              </div>
              <div className="font-mono text-[8px] uppercase tracking-[0.12em] text-black/35">
                Value Delivered
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


function JourneyPoint({
  title,
  subtitle,
  centered = false,
}: {
  title: string;
  subtitle: string;
  centered?: boolean;
}) {
  return (
    <div className={centered ? "text-center" : ""}>
      <div
        className={`
          relative
          z-10
          h-[15px]
          w-[15px]
          rounded-full
          border
          border-black/40
          bg-[#d9d8d2]
          ${centered ? "mx-auto" : ""}
        `}
      >
        <div className="absolute left-1/2 top-1/2 h-[3px] w-[3px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black" />
      </div>

      <div className="mt-5 text-lg tracking-[-0.035em]">
        {title}
      </div>

      <div className="mt-1 font-mono text-[8px] uppercase tracking-[0.12em] text-black/35">
        {subtitle}
      </div>
    </div>
  );
}

function JourneyPointActive({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="text-right">
      <div className="relative z-10 ml-auto h-[15px] w-[15px] rounded-full bg-orange-600">
        <div className="absolute -inset-[6px] rounded-full border border-orange-600/25" />
      </div>

      <div className="mt-5 text-lg tracking-[-0.035em]">
        {title}
      </div>

      <div className="mt-1 font-mono text-[8px] uppercase tracking-[0.12em] text-orange-600">
        {subtitle}
      </div>
    </div>
  );
}
