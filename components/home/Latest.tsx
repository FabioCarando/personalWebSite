import Link from "next/link";
import { journalPosts } from "@/content/journal";

const METHOD = [
  { number: "01", title: "Frame the problem", text: "Define the decision, the constraints and what a useful outcome would look like." },
  { number: "02", title: "Make it inspectable", text: "Keep assumptions, data sources and failure cases visible throughout the system." },
  { number: "03", title: "Test the tradeoffs", text: "Evaluate quality, complexity and operational effort before adding another layer." },
];

export default function Latest() {
  return (
    <section id="journal" aria-labelledby="journal-title" className="bg-[#f1f0eb] text-[#111111]">
      <div className="page-shell">
        <header className="flex flex-col items-center gap-12 border-b border-black/20 pb-16 pt-20 text-center md:gap-16 md:pb-24 md:pt-28">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-orange-600">04 / Engineering journal</span>
          <h2 id="journal-title" className="w-full text-[clamp(2.25rem,7.3vw,7.5rem)] font-medium leading-[0.98] tracking-[-0.06em]">NOTES,<br />IDEAS &<br />EXPERIMENTS.</h2>
          <div className="grid w-full max-w-[1000px] gap-6 text-left md:grid-cols-2 md:gap-12 lg:gap-16">
            <p className="text-[clamp(1.2rem,1.8vw,1.6rem)] leading-relaxed tracking-[-0.025em]">The reasoning behind the build: how I frame problems, structure data and evaluate the decisions that make a system useful.</p>
            <div className="flex flex-col gap-5">
              <p className="text-sm leading-7 text-black/60">Working notes around my projects, connecting implementation choices with real constraints. Each brief sets out a technical question, an approach and the checks needed to assess it.</p>
              <p className="font-mono text-[9px] uppercase leading-5 tracking-[0.1em] text-orange-600">Applied AI / Data systems / Operational intelligence</p>
            </div>
          </div>
        </header>

        <div className="flex flex-col gap-10 border-b border-black/20 py-14 md:gap-14 md:py-20">
          <div className="flex flex-col items-center gap-4 text-center">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.14em] text-orange-600">How I approach a system</h3>
            <p className="max-w-lg text-sm leading-7 text-black/60">Start with the problem. Make the evidence visible. Keep the evaluation practical.</p>
          </div>
          <div className="grid gap-10 md:grid-cols-3 md:gap-12">
            {METHOD.map((item) => <div key={item.number} className="flex flex-col gap-5 border-t border-black/15 pt-6"><span className="font-mono text-[10px] text-black/40">{item.number}</span><h4 className="text-xl font-medium tracking-tight">{item.title}</h4><p className="max-w-sm text-sm leading-7 text-black/60">{item.text}</p></div>)}
          </div>
        </div>

        <div>
          {journalPosts.map((post) => (
            <article key={post.slug} aria-labelledby={`note-${post.slug}`} className="flex flex-col gap-9 border-b border-black/20 py-14 md:gap-12 md:py-20">
              <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] uppercase leading-5 tracking-[0.1em]">
                <div className="flex items-center gap-5"><span className="text-orange-600">/{post.number}</span><span className="text-black/50">{post.date}</span></div>
                <p className="text-orange-600">{post.category}</p>
              </div>
              <div className="grid items-start gap-10 md:grid-cols-2 md:gap-12 lg:gap-20">
                <div className="flex min-w-0 flex-col gap-7">
                  <h3 id={`note-${post.slug}`} className="text-[clamp(1.9rem,3vw,3.2rem)] leading-[1.1] tracking-[-0.045em]">{post.title}</h3>
                  <p className="text-sm leading-7 text-black/65">{post.excerpt}</p>
                  <ul aria-label="Technical focus" className="flex list-none flex-wrap gap-2 p-0">{post.focus.map((topic) => <li key={topic} className="border border-black/15 px-3 py-2 font-mono text-[9px] leading-4 text-black/60">{topic}</li>)}</ul>
                </div>
                <div className="flex min-w-0 flex-col gap-8">
                  <div className="flex flex-col gap-5 border-l-2 border-orange-600 py-1 pl-6"><p className="font-mono text-[9px] uppercase tracking-[0.12em] text-black/50">Engineering principle</p><p className="text-[clamp(1.2rem,1.8vw,1.6rem)] leading-relaxed tracking-tight">{post.principle}</p></div>
                  <div className="flex flex-col gap-3"><p className="font-mono text-[9px] uppercase tracking-[0.12em] text-orange-600">The question</p><p className="text-sm leading-7 text-black/65">{post.question}</p></div>
                </div>
              </div>
              <details className="group border-t border-black/15">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-6 font-mono text-[10px] uppercase tracking-[0.1em] text-black/70 transition-colors hover:text-orange-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-600 [&::-webkit-details-marker]:hidden"><span>Read the technical brief</span><span aria-hidden="true" className="text-xl font-normal group-open:rotate-45 motion-safe:transition-transform">+</span></summary>
                <div className="grid gap-8 pb-6 pt-4 md:grid-cols-2 md:gap-12 lg:gap-20">
                  <div className="flex flex-col gap-5"><h4 className="font-mono text-[9px] uppercase tracking-[0.12em] text-orange-600">Technical approach</h4><p className="text-sm leading-7 text-black/65">{post.approach}</p></div>
                  <div className="flex flex-col gap-5"><h4 className="font-mono text-[9px] uppercase tracking-[0.12em] text-orange-600">What to verify</h4><p className="text-sm leading-7 text-black/65">{post.validation}</p></div>
                </div>
              </details>
            </article>
          ))}
        </div>
        <div className="flex flex-col items-center justify-center gap-8 py-14 text-center md:py-20">
          <p className="max-w-xl text-sm leading-7 text-black/55">Explore the projects behind these questions, from financial data provenance to market intelligence and workflow automation.</p>
          <Link href="#selected-work" className="text-link font-mono text-[10px] uppercase tracking-[0.1em] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-600">Explore related projects <span aria-hidden="true">&nearr;</span></Link>
        </div>
      </div>
    </section>
  );
}
