import Link from "next/link";

import { projects } from "@/content/projects";

export default function SelectedWork() {
  return (
    <section
      id="selected-work"
      className="relative bg-[#111111] text-[#f1f0eb]"
    >
      <div className="page-shell">
        {/* Section intro */}
        <div className="grid min-h-[55vh] grid-cols-1 items-end border-b border-white/20 pb-12 pt-28 md:grid-cols-12">
          <div className="md:col-span-3">
            <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-orange-500">
              01 / Selected work
            </div>
          </div>

          <div className="mt-16 md:col-span-9 md:mt-0">
            <h2 className="max-w-[1050px] text-[clamp(4rem,8vw,9rem)] font-medium leading-[0.82] tracking-[-0.07em]">
              THINGS
              <br />
              I&apos;VE BUILT.
            </h2>
          </div>
        </div>

        {/* Projects */}
        <div>
          {projects.map((project) => (
            <article
              key={project.slug}
              className="group border-b border-white/20 py-14 md:py-20"
            >
              <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
                {/* Number */}
                <div className="md:col-span-1">
                  <span className="font-mono text-[10px] text-white/40">
                    {project.number}
                  </span>
                </div>

                {/* Main project info */}
                <div className="md:col-span-6">
                  <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-orange-500">
                    {project.eyebrow}
                  </div>

                  <h3 className="mt-4 text-[clamp(2.8rem,5vw,6rem)] font-medium leading-[0.88] tracking-[-0.06em] transition-transform duration-500 group-hover:translate-x-2">
                    {project.title}
                  </h3>

                  <p className="mt-6 max-w-[600px] text-[clamp(1.4rem,2vw,2.2rem)] leading-[1.05] tracking-[-0.04em] text-white/85">
                    {project.tagline}
                  </p>

                  <p className="mt-8 max-w-[540px] font-mono text-[11px] leading-5 text-white/50">
                    {project.description}
                  </p>

                  <div className="mt-8 flex flex-wrap gap-x-4 gap-y-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-[9px] uppercase text-white/40"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Visual placeholder */}
                <div className="md:col-span-5">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="relative block aspect-[4/3] overflow-hidden border border-white/20 bg-white/[0.035]"
                  >
                    {/* Technical grid */}
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage: `
                          linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)
                        `,
                        backgroundSize: "32px 32px",
                      }}
                    />

                    <div className="absolute left-5 top-5 font-mono text-[9px] uppercase tracking-[0.12em] text-white/35">
                      Project / {project.number}
                    </div>

                    <div className="absolute right-5 top-5 font-mono text-[9px] text-white/35">
                      {project.year}
                    </div>

                    <div className="absolute bottom-5 left-5">
                      {project.location && (
                        <div className="mb-2 font-mono text-[9px] uppercase text-white/30">
                          {project.location}
                        </div>
                      )}

                      <div className="font-mono text-[10px] uppercase">
                        View case study
                      </div>
                    </div>

                    <div className="absolute bottom-5 right-5 text-2xl transition-transform duration-500 group-hover:translate-x-1">
                      ↗
                    </div>

                    {/* Temporary central visual */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[clamp(3rem,7vw,7rem)] font-medium tracking-[-0.08em] text-white/[0.06]">
                        {project.number}
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Projects footer */}
        <div className="grid min-h-[35vh] items-center py-20 md:grid-cols-12">
          <div className="md:col-span-7 md:col-start-4">
            <p className="max-w-xl text-2xl leading-tight tracking-[-0.04em] text-white/60 md:text-4xl">
              Different problems.
              <br />
              Different tools.
              <br />
              Same obsession with making things work better.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}