import Image from "next/image";

import { projects, type Project } from "@/content/projects";
import DemoVideo from "./DemoVideo";

export default function SelectedWork() {
  return (
    <section
      id="selected-work"
      className="relative bg-[#111111] text-[#f1f0eb]"
    >
      <div className="page-shell">
        {/* Section intro */}
        <div className="grid grid-cols-1 items-end gap-8 border-b border-white/20 pb-12 pt-16 md:min-h-[55vh] md:grid-cols-12 md:gap-0 md:pt-28">
          <div className="md:col-span-3">
            <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-orange-500">
              01 / Selected work
            </div>
          </div>

          <div className="mt-16 md:col-span-9 md:mt-0">
            <h2 className="max-w-[1050px] text-[clamp(3rem,12vw,5rem)] font-medium leading-[0.9] tracking-[-0.07em] md:text-[clamp(4rem,8vw,9rem)] md:leading-[0.82]">
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
                <div className="flex flex-col gap-6 md:col-span-6">
                  <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-orange-500">
                    {project.eyebrow}
                  </div>

                  <h3 className={`${project.research ? "text-[clamp(1.8rem,7vw,2.8rem)] leading-[1.08] md:text-[clamp(2.4rem,4vw,4.8rem)] md:leading-[1]" : "text-[clamp(1.8rem,7vw,3rem)] leading-[1.05] md:text-[clamp(2.8rem,5vw,6rem)] md:leading-[0.88]"} font-medium tracking-[-0.06em] transition-transform duration-500 motion-safe:md:group-hover:translate-x-2`}>
                    {project.title}
                  </h3>

                  <p className="max-w-[600px] text-[clamp(1.4rem,2vw,2.2rem)] leading-[1.15] tracking-[-0.04em] text-white/85">
                    {project.tagline}
                  </p>

                  <p className="max-w-[540px] font-mono text-[11px] leading-6 text-white/50">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-x-4 gap-y-2">
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
                  {project.research ? <ResearchPreview project={project} /> : project.video ? <ProjectVideo project={project} /> : <div
                    className="relative block aspect-[4/3] overflow-hidden border border-white/20 bg-white/[0.035]"
                  >
                    {project.image ? (
                      <div className="absolute inset-x-3 bottom-16 top-12 sm:inset-x-5">
                        <Image
                          src={project.image.src}
                          alt={project.image.alt}
                          fill
                          sizes="(max-width: 767px) calc(100vw - 72px), (max-width: 1600px) 42vw, 640px"
                          className="object-contain transition-transform duration-500 motion-safe:group-hover:scale-[1.02]"
                        />
                      </div>
                    ) : (
                      <>
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

                        {/* Temporary central visual */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-[clamp(3rem,7vw,7rem)] font-medium tracking-[-0.08em] text-white/[0.06]">
                            {project.number}
                          </span>
                        </div>
                      </>
                    )}

                    <div className="absolute left-5 top-5 font-mono text-[9px] uppercase tracking-[0.12em] text-white/35">
                      Project / {project.number}{project.image?.concept ? " / Concept UI" : ""}
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

                    </div>

                  </div>}
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

function ProjectVideo({ project }: { project: Project }) {
  return (
    <div className="relative aspect-[4/3] overflow-hidden border border-white/20 bg-white/[0.035]">
      <div className="absolute left-5 right-5 top-5 flex justify-between gap-3 font-mono text-[9px] uppercase tracking-wider text-white/50"><span>Project / {project.number}</span><span>{project.year}</span></div>
      <div className="absolute inset-x-3 bottom-20 top-12 sm:inset-x-5">
        <DemoVideo src={project.video!} poster={project.videoPoster} title={project.title} />
      </div>
      <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
        <span className="font-mono text-[9px] uppercase text-white/50">{project.location}</span>
        <a href={project.video} target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] uppercase tracking-wider text-white/80 hover:text-orange-400">Open video &nearr;</a>
      </div>
    </div>
  );
}

function ResearchPreview({ project }: { project: Project }) {
  const research = project.research!;
  return (
    <div className="flex min-h-[360px] flex-col gap-7 border border-white/20 bg-[#f1f0eb] p-7 text-[#111111] sm:p-9">
      <div className="flex flex-wrap justify-between gap-3 font-mono text-[9px] uppercase tracking-[0.1em] text-black/55"><span className="text-orange-700">Research note / {project.number}</span>{research.date && <span>{research.date}</span>}</div>
      <div className="flex flex-col gap-4">
        <h4 className="text-[clamp(1.8rem,2.5vw,2.8rem)] font-medium leading-[1.08] tracking-[-0.045em]">{research.title}</h4>
        <p className="text-sm leading-6 text-black/65">{research.subtitle}</p>
        {research.authors && <p className="font-mono text-[10px] leading-5 text-black/55">{research.authors}</p>}
      </div>
      <div className="grid grid-cols-1 gap-5 border-y border-black/15 py-6 sm:grid-cols-2">
        {research.metrics.map((metric) => <div key={metric.label} className="flex flex-col gap-3"><span className="font-mono text-[9px] uppercase tracking-wider text-black/55">{metric.label}</span><span className="text-xl leading-snug tracking-tight text-orange-700">{metric.value}</span></div>)}
        <p className="font-mono text-[9px] leading-5 text-black/55 sm:col-span-2">{research.context}</p>
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-xs leading-6 text-black/65">{research.note}</p>
        {research.pdf ? <a href={research.pdf} download className="w-fit border border-black/30 px-4 py-3 font-mono text-[10px] uppercase tracking-wider hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-600">Download research PDF &darr;</a> : <span className="font-mono text-[9px] uppercase tracking-wider text-black/45">PDF coming soon</span>}
      </div>
    </div>
  );
}
