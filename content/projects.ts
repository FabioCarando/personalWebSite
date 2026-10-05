export type Project = {
  number: string;
  slug: string;
  title: string;
  eyebrow: string;
  tagline: string;
  description: string;
  year: string;
  location?: string;
  tech: string[];
};

export const projects: Project[] = [
  {
    number: "01",
    slug: "trace",
    title: "TRACE",
    eyebrow: "FINTECH / AI",
    tagline: "Financial intelligence with memory.",
    description:
      "A financial intelligence system that transforms documents into controlled, auditable data while preserving the provenance behind every number.",
    year: "2026",
    location: "Hong Kong",
    tech: ["Python", "LLMs", "Streamlit", "AWS"],
  },
  {
    number: "02",
    slug: "worklens",
    title: "WORKLENS",
    eyebrow: "AUTOMATION / DATA",
    tagline: "Find the work worth automating.",
    description:
      "A tool for discovering repetitive work inside organizations, quantifying the time being lost and identifying the best opportunities for automation.",
    year: "2026",
    tech: ["Python", "Streamlit", "Analytics"],
  },
  {
    number: "03",
    slug: "market-product-intelligence",
    title: "MARKET PRODUCT INTELLIGENCE",
    eyebrow: "DATA ENGINEERING / INTELLIGENCE",
    tagline: "Turn the market into structured intelligence.",
    description:
      "A multi-source product intelligence pipeline for automated collection, validation, historical tracking and analysis of e-commerce data.",
    year: "2026",
    tech: ["Python", "Playwright", "PostgreSQL", "SQLAlchemy"],
  },
  {
    number: "04",
    slug: "monteromola",
    title: "TENUTA MONTEROMOLA",
    eyebrow: "PRODUCT / FULL STACK",
    tagline: "Small business. Better systems.",
    description:
      "A mobile-first sales, inventory and reporting platform built for an Italian wine and honey producer.",
    year: "2026",
    location: "Italy",
    tech: ["Next.js", "TypeScript", "Supabase", "Vercel"],
  },
];