"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { ALARM_THRESHOLD, simulateRetention, START_ACCURACY, STEPS, TASK_SWITCH, type Scenario } from "./retentionModel";

const SERIES = [
  { key: "baseline", label: "No replay", color: "#8c8b85" },
  { key: "periodic", label: "Periodic replay", color: "#79cbbd" },
  { key: "triggered", label: "Threshold-triggered replay", color: "#fb923c" },
] as const;
const x = (step: number) => 58 + step / STEPS * 704;
const y = (accuracy: number) => 280 - (accuracy - 0.1) / 0.9 * 244;
const percent = (value: number) => `${(value * 100).toFixed(1)}%`;
const buttonClass = "border border-white/20 px-4 py-3 font-mono text-[10px] uppercase tracking-wider transition-colors hover:border-orange-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-400";

export default function RetentionLab() {
  const [intensity, setIntensity] = useState(65);
  const [budget, setBudget] = useState(24);
  const [scenario, setScenario] = useState<Scenario>("smooth");
  const [step, setStep] = useState(STEPS);
  const [running, setRunning] = useState(false);
  const id = useId().replace(/:/g, "");
  const points = useMemo(() => simulateRetention(intensity, budget, scenario), [intensity, budget, scenario]);
  const current = points[step];
  const alarms = points.slice(0, step + 1).filter((point) => point.alarm);

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => {
      setStep((value) => Math.min(STEPS, value + 2));
    }, 55);
    return () => window.clearInterval(timer);
  }, [running]);
  useEffect(() => {
    if (running && step === STEPS) {
      // Defer the completion update outside the effect's synchronous body.
      const timer = window.setTimeout(() => setRunning(false), 0);
      return () => window.clearTimeout(timer);
    }
  }, [step, running]);

  const stopPlayback = () => { setRunning(false); setStep(STEPS); };

  return (
    <section id="retention-lab" aria-labelledby="retention-title" className="overflow-hidden bg-[#0d1415] text-[#f1f0eb]">
      <div className="page-shell flex flex-col gap-12 py-16 md:gap-16 md:py-24">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/15 pb-6 font-mono text-[9px] uppercase tracking-[0.14em]"><span className="text-orange-400">Interactive lab / Continual learning</span><span className="text-white/50">Illustrative simulation</span></div>
        <div className="grid items-end gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-6"><p className="font-mono text-[10px] uppercase tracking-wider text-white/50">Explore the question behind the research</p><h2 id="retention-title" className="text-[clamp(2.8rem,5.5vw,6rem)] font-medium leading-[0.95] tracking-[-0.055em]">WATCH A MODEL<br /><span className="text-orange-400">FORGET.</span></h2></div>
          <div className="flex flex-col gap-5"><p className="max-w-xl text-lg leading-relaxed text-white/80">Learning something new can erode what came before. Change the interference, choose a replay budget, and explore when rehearsal helps retain an earlier task.</p><p className="max-w-xl text-sm leading-7 text-white/50">This deterministic teaching model illustrates timing and resource allocation. It does not train a neural network or reproduce the paper&apos;s statistical e-detector or experimental results.</p></div>
        </div>

        <div className="grid items-start gap-8 xl:grid-cols-[minmax(0,1fr)_300px] xl:gap-10">
          <div className="flex min-w-0 flex-col gap-6 border border-white/15 bg-black/15 p-4 sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-4"><div className="flex flex-col gap-2"><h3 className="text-lg tracking-tight">Retention of the original task</h3><p className="font-mono text-[9px] uppercase tracking-wider text-white/45">{step <= TASK_SWITCH ? "Task A / Stable competence" : "Task B / Interference begins"}</p></div><span className="font-mono text-[10px] text-orange-400">Step {step} / {STEPS}</span></div>
            <ul className="flex list-none flex-wrap gap-x-5 gap-y-3 p-0 text-xs text-white/65">{SERIES.map((series, index) => <li key={series.key} className="flex items-center gap-2"><span className="w-5 border-t-2" style={{ borderColor: series.color, borderStyle: index === 0 ? "dashed" : "solid" }} />{series.label}</li>)}</ul>
            <svg viewBox="0 0 800 320" role="img" aria-labelledby={`${id}-title ${id}-description`} className="w-full overflow-visible">
              <title id={`${id}-title`}>Simulated retention accuracy over training steps</title>
              <desc id={`${id}-description`}>At step {step}, no replay retains {percent(current.baseline)}, periodic replay {percent(current.periodic)}, and threshold-triggered replay {percent(current.triggered)}. New-task interference starts at step 40. These are illustrative values.</desc>
              <defs><clipPath id={`${id}-clip`}><rect x="57" y="20" width={x(step) - 57} height="270" /></clipPath><linearGradient id={`${id}-wash`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#fb923c" stopOpacity="0.12" /><stop offset="100%" stopColor="#fb923c" stopOpacity="0" /></linearGradient></defs>
              {[0.2, 0.4, 0.6, 0.8, 1].map((tick) => <g key={tick}><line x1="58" x2="762" y1={y(tick)} y2={y(tick)} stroke="white" strokeOpacity="0.08" /><text x="44" y={y(tick) + 4} textAnchor="end" fill="#929b99" fontSize="12" fontFamily="monospace">{Math.round(tick * 100)}%</text></g>)}
              {[0, 40, 80, 120, 160, 200, 240].map((tick) => <text key={tick} x={x(tick)} y="306" textAnchor="middle" fill="#929b99" fontSize="12" fontFamily="monospace">{tick}</text>)}
              <rect x={x(TASK_SWITCH)} y="36" width={x(STEPS) - x(TASK_SWITCH)} height="244" fill={`url(#${id}-wash)`} />
              <line x1={x(TASK_SWITCH)} x2={x(TASK_SWITCH)} y1="36" y2="280" stroke="#929b99" strokeDasharray="4 5" /><text x={x(TASK_SWITCH) + 9} y="23" fill="#929b99" fontSize="11" fontFamily="monospace">New task</text>
              <line x1="58" x2="762" y1={y(ALARM_THRESHOLD)} y2={y(ALARM_THRESHOLD)} stroke="#fb923c" strokeOpacity="0.22" strokeDasharray="3 5" />
              <g clipPath={`url(#${id}-clip)`}>{SERIES.map((series) => <path key={series.key} d={points.map((point, index) => `${index ? "L" : "M"}${x(point.step).toFixed(2)},${y(point[series.key]).toFixed(2)}`).join(" ")} fill="none" stroke={series.color} strokeWidth="2.5" strokeDasharray={series.key === "baseline" ? "5 4" : undefined} />)}</g>
              {alarms.map((point) => <circle key={point.step} cx={x(point.step)} cy={y(point.triggered)} r="4" fill="#0d1415" stroke="#fb923c" strokeWidth="2" />)}
              <line x1={x(step)} x2={x(step)} y1="36" y2="280" stroke="white" strokeOpacity="0.3" />
              {SERIES.map((series) => <circle key={series.key} cx={x(step)} cy={y(current[series.key])} r="3.5" fill={series.color} />)}
            </svg>
            <label className="flex flex-col gap-3 font-mono text-[10px] text-white/55">Scrub through training<input type="range" min="0" max={STEPS} value={step} onChange={(event) => { setRunning(false); setStep(Number(event.target.value)); }} className="w-full accent-orange-400" aria-label="Training step" /></label>
            <div className="flex flex-wrap items-center gap-3"><button type="button" className={`${buttonClass} bg-orange-400/10 text-orange-300`} onClick={() => {
              if (running) { setRunning(false); return; }
              if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setStep(STEPS); return; }
              if (step === STEPS) setStep(0);
              setRunning(true);
            }}>{running ? "Pause" : "Run simulation"}</button><button type="button" className={buttonClass} onClick={() => { setRunning(false); setStep(0); }}>Reset timeline</button><span className="text-xs text-white/45">Orange rings mark triggered replay.</span></div>
          </div>

          <div className="flex flex-col gap-7 border border-white/15 p-6">
            <h3 className="font-mono text-[10px] uppercase tracking-wider text-orange-400">Experiment controls</h3>
            <fieldset className="flex flex-col gap-4"><legend className="pb-4 text-sm text-white/80">Interference pattern</legend><div className="grid grid-cols-2 gap-2">{(["smooth", "bursty"] as const).map((value) => <button key={value} type="button" aria-pressed={scenario === value} onClick={() => { stopPlayback(); setScenario(value); }} className={`${buttonClass} ${scenario === value ? "border-orange-400 bg-orange-400/10 text-orange-300" : "text-white/55"}`}>{value}</button>)}</div><p className="text-xs leading-6 text-white/45">{scenario === "smooth" ? "A steady stream of interference across the new task." : "The same total interference concentrated into three bursts."}</p></fieldset>
            <label className="flex flex-col gap-4"><span className="flex justify-between gap-4 text-sm"><span>Interference strength</span><span className="font-mono text-orange-300">{intensity}%</span></span><input type="range" min="0" max="100" step="5" value={intensity} onChange={(event) => { stopPlayback(); setIntensity(Number(event.target.value)); }} className="w-full accent-orange-400" /></label>
            <label className="flex flex-col gap-4"><span className="flex justify-between gap-4 text-sm"><span>Replay budget cap</span><span className="font-mono text-orange-300">{budget}</span></span><input type="range" min="0" max="48" step="4" value={budget} onChange={(event) => { stopPlayback(); setBudget(Number(event.target.value)); }} className="w-full accent-orange-400" /><span className="text-xs leading-6 text-white/45">Same maximum budget for both policies. Each replay event costs 4 units; actual spending is shown below.</span></label>
            <div className="flex flex-col gap-4 border-t border-white/15 pt-6"><span className="font-mono text-[9px] uppercase tracking-wider text-white/45">Trigger rule in this model</span><p className="text-sm leading-6 text-white/65">Replay when retention falls below 84%, subject to an 8-step cooldown and remaining budget.</p></div>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3" aria-live={running ? "off" : "polite"}>
          {SERIES.map((series) => <div key={series.key} className="flex flex-col gap-5 border-t-2 bg-white/[0.025] p-6" style={{ borderColor: series.color }}><h3 className="text-sm" style={{ color: series.color }}>{series.label}</h3><div className="text-4xl tracking-tight">{percent(current[series.key])}</div><p className="font-mono text-[10px] leading-5 text-white/50">{series.key === "baseline" ? "0 replay units" : `${series.key === "periodic" ? current.periodicSpent : current.triggeredSpent} / ${budget} replay units used`}</p><p className="text-xs leading-6 text-white/45">{series.key === "baseline" ? `${((START_ACCURACY - current.baseline) * 100).toFixed(1)} percentage points lost from the original task.` : series.key === "periodic" ? "Rehearsal spread evenly across the new task." : `${alarms.length} replay events triggered by the retention threshold.`}</p></div>)}
        </div>

        <div className="grid gap-8 border-t border-white/15 pt-10 md:grid-cols-2 md:gap-16"><div className="flex flex-col gap-4"><h3 className="text-xl tracking-tight">What to look for</h3><p className="text-sm leading-7 text-white/55">Try zero replay, then add budget. Switch between smooth and bursty interference: the total damage is held constant, while its timing changes. Notice both retention and the budget each policy actually spends.</p></div><div className="flex flex-col gap-4"><h3 className="text-xl tracking-tight">What the research establishes</h3><p className="text-sm leading-7 text-white/55">On the paper&apos;s permuted-digits benchmark, e-detector-triggered replay did not significantly outperform periodic replay at comparable budget. An advantage under bursty interference is a hypothesis to test, rather than a demonstrated result.</p><a href="/Forgetting%20Is%20a%20Changepoint.pdf" download className="w-fit font-mono text-[10px] uppercase tracking-wider text-orange-400 underline underline-offset-4">Read the research PDF &darr;</a></div></div>
      </div>
    </section>
  );
}
