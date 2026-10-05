"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

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

        {/* ======================================================
            SECTION HEADER
        ====================================================== */}

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

        {/* ======================================================
            HERO TITLE
        ====================================================== */}

        <div className="grid grid-cols-1 items-end py-14 md:grid-cols-12 md:py-20">

          <div className="md:col-span-3">
            <div className="font-mono text-[9px] uppercase tracking-[0.15em] text-black/40">
              Based in
            </div>
          </div>

          <div className="mt-5 md:col-span-9 md:mt-0">
            <div className="flex items-start">
              <h2
                className="
                  text-[clamp(4rem,9vw,9.5rem)]
                  font-medium
                  leading-[0.78]
                  tracking-[-0.075em]
                "
              >
                HONG KONG
              </h2>

              <span
                className="
                  ml-4
                  mt-2
                  h-[10px]
                  w-[10px]
                  shrink-0
                  rounded-full
                  bg-orange-600
                  md:ml-6
                  md:mt-3
                "
              />
            </div>
          </div>
        </div>

        {/* ======================================================
            MAP
        ====================================================== */}

        <div className="border-t border-black/20 pt-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="font-mono text-[8px] uppercase tracking-[0.14em] text-black/35">
              Hong Kong SAR
            </div>

            <div className="font-mono text-[8px] uppercase tracking-[0.14em] text-black/35">
              Current position
            </div>
          </div>

          <div
            className="
              relative
              h-[55vh]
              min-h-[430px]
              max-h-[680px]
              w-full
              overflow-hidden
              border
              border-black/15
              bg-[#cfcec8]
            "
          >
            <Image
              src="/images/hong-kong-map.png"
              alt="Map of Hong Kong"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />

            {/* Small editorial marker */}

            <div
              className="
                pointer-events-none
                absolute
                bottom-5
                left-5
                bg-[#111111]
                px-4
                py-3
                text-[#f1f0eb]
              "
            >
              <div className="flex items-center gap-2">
                <span className="h-[5px] w-[5px] rounded-full bg-orange-600" />

                <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-white/55">
                  Currently
                </span>
              </div>

              <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.08em]">
                Hong Kong
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================
            INFORMATION GRID
        ====================================================== */}

        <div className="mt-6 grid grid-cols-1 border-y border-black/20 md:grid-cols-12">

          {/* LOCATION */}

          <InfoBlock className="md:col-span-3 md:border-r md:border-black/20">
            <MetaLabel>Location</MetaLabel>

            <div className="mt-5 text-[1.35rem] leading-[1.05] tracking-[-0.035em]">
              Hong Kong
              <br />
              SAR
            </div>

            <div className="mt-5 font-mono text-[8px] uppercase leading-4 tracking-[0.12em] text-black/35">
              22.2819° N
              <br />
              114.1582° E
            </div>
          </InfoBlock>

          {/* CURRENTLY */}

          <InfoBlock className="md:col-span-5 md:border-r md:border-black/20">
            <MetaLabel>Currently</MetaLabel>

            <p
              className="
                mt-5
                max-w-[480px]
                text-[clamp(1.5rem,2.4vw,2.5rem)]
                leading-[1.04]
                tracking-[-0.045em]
              "
            >
              Working with Data & AI.
              <br />
              Building products.
              <br />
              Playing jazz.
              <br />
              Exploring Asia.
            </p>
          </InfoBlock>

          {/* TIME */}

          <InfoBlock className="md:col-span-4">
            <div className="flex items-center gap-2">
              <span className="h-[5px] w-[5px] rounded-full bg-orange-600" />

              <MetaLabel>Local time</MetaLabel>
            </div>

            <div
              className="
                mt-4
                text-[clamp(3rem,5vw,5.5rem)]
                leading-none
                tracking-[-0.065em]
              "
            >
              {hongKongTime}
            </div>

            <div className="mt-3 font-mono text-[8px] uppercase tracking-[0.14em] text-black/35">
              HKT / UTC +08
            </div>
          </InfoBlock>
        </div>

        {/* ======================================================
            JOURNEY
        ====================================================== */}

        <div className="py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-12">

            <div className="md:col-span-3">
              <MetaLabel>Journey</MetaLabel>
            </div>

            <div className="mt-8 md:col-span-9 md:mt-0">
              <Journey />
            </div>

          </div>
        </div>

        {/* ======================================================
            FOOTER META
        ====================================================== */}

        <div className="grid grid-cols-2 border-t border-black/20 py-5 md:grid-cols-12">

          <div className="font-mono text-[8px] uppercase tracking-[0.12em] text-black/35 md:col-span-3">
            Cremona / Italy
          </div>

          <div className="hidden font-mono text-[8px] uppercase tracking-[0.12em] text-black/35 md:col-span-5 md:block">
            Data / AI / Building / Music
          </div>

          <div className="text-right font-mono text-[8px] uppercase tracking-[0.12em] text-black/35 md:col-span-4">
            Hong Kong / Asia
          </div>

        </div>
      </div>
    </section>
  );
}

/* =========================================================
   INFO BLOCK
========================================================= */

function InfoBlock({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`
        border-b
        border-black/20
        py-8
        md:border-b-0
        md:px-8
        md:py-10
        first:md:pl-0
        ${className}
      `}
    >
      {children}
    </div>
  );
}

/* =========================================================
   META LABEL
========================================================= */

function MetaLabel({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="font-mono text-[8px] uppercase tracking-[0.15em] text-black/35">
      {children}
    </div>
  );
}

/* =========================================================
   JOURNEY
========================================================= */

function Journey() {
  return (
    <div className="relative">

      {/* Base line */}

      <div className="absolute left-0 right-0 top-[7px] h-px bg-black/20" />

      {/* Nodes */}

      <div className="relative grid grid-cols-3">

        {/* CREMONA */}

        <JourneyPoint
          title="Cremona"
          subtitle="Origin"
        />

        {/* MILANO */}

        <JourneyPoint
          title="Milano"
          subtitle="Study / Work"
          centered
        />

        {/* HONG KONG */}

        <div className="text-right">
          <div
            className="
              relative
              z-10
              ml-auto
              h-[15px]
              w-[15px]
              rounded-full
              bg-orange-600
            "
          >
            <div className="absolute -inset-[6px] rounded-full border border-orange-600/25" />
          </div>

          <div className="mt-5 text-lg tracking-[-0.035em]">
            Hong Kong
          </div>

          <div className="mt-1 font-mono text-[8px] uppercase tracking-[0.12em] text-orange-600">
            Current / 2026
          </div>
        </div>

      </div>
    </div>
  );
}

/* =========================================================
   JOURNEY POINT
========================================================= */

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
        <div
          className="
            absolute
            left-1/2
            top-1/2
            h-[3px]
            w-[3px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-black
          "
        />
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