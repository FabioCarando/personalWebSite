"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { label: "Projects", href: "/#selected-work" },
  { label: "Lab", href: "/#retention-lab" },
  { label: "Graphs", href: "/#neural-system" },
  { label: "Journal", href: "/#journal" },
  { label: "Experience", href: "/#now" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="relative z-50 bg-[#f1f0eb]" onKeyDown={(event) => {
      if (event.key === "Escape") setMenuOpen(false);
    }}>
      <nav aria-label="Main navigation" className="page-shell flex h-20 items-center justify-between border-b border-black/20">
        <Link href="/" onClick={() => setMenuOpen(false)} className="text-[13px] font-semibold tracking-[-0.03em] transition-opacity hover:opacity-50">FABIO CARANDO</Link>
        <div className="hidden items-center gap-7 md:flex">
          {links.map((link, index) => <Link key={link.href} href={link.href} className="group flex items-baseline gap-1.5"><span className="font-mono text-[8px] text-black/30">0{index + 1}</span><span className="text-[11px] transition-opacity group-hover:opacity-40">{link.label}</span></Link>)}
        </div>
        <button type="button" aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen((open) => !open)} className="px-3 py-3 font-mono text-[10px] uppercase tracking-wider md:hidden">{menuOpen ? "Close" : "Menu"}</button>
      </nav>
      <nav id="mobile-navigation" aria-label="Mobile navigation" hidden={!menuOpen} className="absolute inset-x-0 top-20 border-b border-black/20 bg-[#f1f0eb] shadow-lg md:hidden">
        <div className="page-shell flex flex-col py-4">
          {links.map((link, index) => <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="flex items-center gap-4 border-b border-black/10 py-4 last:border-0"><span className="font-mono text-[9px] text-black/40">0{index + 1}</span><span className="text-sm">{link.label}</span></Link>)}
        </div>
      </nav>
    </header>
  );
}
