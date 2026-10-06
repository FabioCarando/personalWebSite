"use client";

import { useEffect, useState } from "react";

import NetworkGraph from "./NetworkGraph";

export default function Hero() {
  const [hongKongTime, setHongKongTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const time = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Hong_Kong",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(new Date());

      setHongKongTime(time);
    };

    updateTime();

    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[calc(100vh-81px)] overflow-hidden">
      {/* Soft fade behind the main typography for readability */}
      <div
        className="
          pointer-events-none
          hidden md:block
          absolute
          inset-y-0
          left-0
          z-[1]
          w-[58%]
          bg-gradient-to-r
          from-[#f1f0eb]
          via-[#f1f0eb]/95
          to-transparent
        "
      />

      <div className="page-shell pointer-events-none relative z-20 flex min-h-[calc(100vh-81px)] flex-col">
        {/* Role */}
        <div className="relative z-10 pt-8 md:pt-16">
          <div className="label flex items-center gap-3 leading-5">
            <span className="block h-px w-6 shrink-0 bg-black/50" />

            <span>
              DATA SCIENTIST / MACHINE LEARNING ENGINEER
            </span>
          </div>
        </div>

        {/* Main content */}
        <div className="relative z-10 pb-8 pt-12 md:my-auto md:pb-10 md:pt-16">
          <div className="flex max-w-[760px] flex-col items-start gap-7 md:gap-8">
            <h1
              className="
                text-[clamp(3.2rem,13vw,6rem)] md:text-[clamp(4.7rem,9vw,9.5rem)]
                font-semibold
                leading-[0.9] md:leading-[0.78]
                tracking-[-0.075em]
              "
            >
              FABIO
              <br />
              CARANDO
            </h1>

            <h2
              className="
                max-w-[670px]
                text-[clamp(1.4rem,5.5vw,2.4rem)] md:text-[clamp(1.8rem,3vw,3.6rem)]
                font-normal
                leading-[1.15] md:leading-[1]
                tracking-[-0.05em]
              "
            >
              Data Scientist and
              <br />
              Machine Learning Engineer.
            </h2>

            <p className="max-w-[470px] font-mono text-[12px] leading-6 text-black/65 md:text-[13px]">
              I build data products, automation systems and
              AI-powered applications designed to solve real
              problems.
            </p>

            <a
            href="#selected-work"
            className="
                pointer-events-auto
                inline-flex
                items-center
                gap-6
                font-mono
                text-[11px]
                uppercase
                tracking-[0.05em]
                transition-opacity
                hover:opacity-50
            "
            >
              <span className="relative block h-px w-20 bg-orange-600">
                <span
                  className="
                    absolute
                    -right-1
                    -top-[3px]
                    h-[7px]
                    w-[7px]
                    rounded-full
                    bg-orange-600
                  "
                />
              </span>

              Explore my work

              <span className="text-xl font-light">→</span>
            </a>
          </div>
        </div>

        {/* On phones the graph has its own space below the introduction. */}
        <div className="relative h-[280px] w-full shrink-0 border-t border-black/10 sm:h-[340px] md:absolute md:inset-0 md:z-0 md:h-auto md:border-0">
          <NetworkGraph />
        </div>

        {/* Footer */}
        <div
          className="
            grid
            relative z-10
            grid-cols-1 gap-4
            items-end
            border-t
            border-black/20
            py-5
            font-mono
            text-[10px]
            uppercase
            sm:grid-cols-2 md:grid-cols-3
          "
        >
          <div className="flex gap-3">
            <span>{hongKongTime || "--:--:--"}</span>

            <span className="text-black/30">|</span>

            <span>Hong Kong (HKT)</span>
          </div>

          <div className="hidden text-center text-black/40 md:block">
            Scroll to explore ↓
          </div>

          <div className="sm:text-right">
            Building / Exploring / Playing
          </div>
        </div>
      </div>
    </section>
  );
}
