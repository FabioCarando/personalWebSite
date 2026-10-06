"use client";

import { useEffect, useRef } from "react";

export default function DemoVideo({ src, poster, title }: { src: string; poster?: string; title: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    let visible = false;
    const desktop = window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)");
    const update = () => {
      if (!visible || document.hidden) { video.pause(); return; }
      if (desktop.matches) void video.play().catch(() => { /* Native controls remain available. */ });
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); }, { threshold: 0.2 });
    observer.observe(video);
    document.addEventListener("visibilitychange", update);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", update); video.pause(); };
  }, []);
  return <video ref={ref} aria-label={`${title} demo`} poster={poster} className="h-full w-full object-contain" controls muted loop playsInline preload="none"><source src={src} type="video/mp4" />Your browser cannot play this video. Use the link below to open the demo.</video>;
}
