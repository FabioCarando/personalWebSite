import Link from "next/link";

import { journalPosts } from "@/content/journal";

export default function Latest() {
  return (
    <section className="bg-[#f1f0eb] text-[#111111]">
      <div className="page-shell">

        {/* HEADER */}

        <div className="grid min-h-[50vh] grid-cols-1 items-end border-b border-black/20 pb-12 pt-24 md:grid-cols-12">

          <div className="md:col-span-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-orange-600">
              02 / Journal
            </span>
          </div>

          <div className="mt-12 md:col-span-9 md:mt-0">
            <h2 className="max-w-[1000px] text-[clamp(4rem,8vw,9rem)] font-medium leading-[0.82] tracking-[-0.07em]">
              NOTES,
              <br />
              IDEAS &
              <br />
              EXPERIMENTS.
            </h2>
          </div>

        </div>

        {/* ARTICLES */}

        <div>
          {journalPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/journal/${post.slug}`}
              className="group grid grid-cols-1 border-b border-black/20 py-10 md:grid-cols-12 md:py-12"
            >

              {/* NUMBER */}

              <div className="font-mono text-[9px] text-black/35 md:col-span-1">
                {post.number}
              </div>

              {/* DATE */}

              <div className="mt-5 font-mono text-[9px] uppercase text-black/45 md:col-span-2 md:mt-0">
                {post.date}
              </div>

              {/* CATEGORY */}

              <div className="mt-2 font-mono text-[9px] uppercase tracking-[0.12em] text-orange-600 md:col-span-2 md:mt-0">
                {post.category}
              </div>

              {/* CONTENT */}

              <div className="mt-7 md:col-span-6 md:mt-0">

                <h3 className="max-w-[650px] text-[clamp(1.8rem,3vw,3.4rem)] leading-[0.95] tracking-[-0.05em]">
                  {post.title}
                </h3>

                <p className="mt-5 max-w-[520px] font-mono text-[10px] leading-5 text-black/50">
                  {post.excerpt}
                </p>

              </div>

              {/* ARROW */}

              <div className="mt-7 flex justify-end text-2xl md:col-span-1 md:mt-0">
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  ↗
                </span>
              </div>

            </Link>
          ))}
        </div>

        {/* ALL ARTICLES */}

        <div className="flex min-h-[25vh] items-center justify-end">

          <Link
            href="/journal"
            className="text-link font-mono text-[10px] uppercase tracking-[0.1em]"
          >
            All notes ↗
          </Link>

        </div>

      </div>
    </section>
  );
}