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
  video?: string;
  image?: { src: string; alt: string; concept?: boolean };
  research?: { subtitle: string; date: string; pdf?: string };
};

export const projects: Project[] = [
  {
    number: "01",
    slug: "forgetting-is-a-changepoint",
    title: "FORGETTING IS A CHANGEPOINT",
    eyebrow: "RESEARCH / CONTINUAL LEARNING",
    tagline: "Detecting when a model starts to forget.",
    description:
      "A preliminary study of online retention monitoring in continual learning, comparing anytime-valid e-processes with restart-based e-detectors for changepoint detection and replay scheduling. On a permuted-digits benchmark, restarts improve detection and reduce latency; triggered replay matches periodic replay at comparable budget, without a significant accuracy gain.",
    year: "2026",
    tech: ["Python", "NumPy", "Sequential testing", "Changepoint detection"],
    research: {
      subtitle: "Anytime-Valid Retention Monitoring and E-Detector-Triggered Replay in Continual Learning",
      date: "30 September 2026",
      pdf: "/Forgetting%20Is%20a%20Changepoint.pdf",
    },
  },
  {
    number: "02",
    slug: "trace",
    title: "TRACE",
    eyebrow: "FINTECH / AI",
    tagline: "Financial intelligence with memory.",
    description:
      "A financial intelligence system that transforms documents into controlled, auditable data while preserving the provenance behind every number.",
    year: "2026",
    location: "Hong Kong",
    tech: ["Python", "LLMs", "Streamlit", "AWS"],
    video: "/2026-10-05 15-44-30.mkv",
  },
  {
    number: "03",
    slug: "worklens",
    title: "WORKLENS",
    eyebrow: "AUTOMATION / DATA",
    tagline: "Find the work worth automating.",
    description:
      "A tool for discovering repetitive work inside organizations, quantifying the time being lost and identifying the best opportunities for automation.",
    year: "2026",
    tech: ["Python", "Streamlit", "Analytics"],
    image: {
      src: "/worklens-dashboard.png",
      alt: "WorkLens automation analysis dashboard with an opportunity matrix and prioritized tasks.",
    },
  },
  {
    number: "04",
    slug: "market-product-intelligence",
    title: "MARKET PRODUCT INTELLIGENCE",
    eyebrow: "DATA ENGINEERING / INTELLIGENCE",
    tagline: "Turn the market into structured intelligence.",
    description:
      "A multi-source product intelligence pipeline for automated collection, validation, historical tracking and analysis of e-commerce data.",
    year: "2026",
    tech: ["Python", "Playwright", "PostgreSQL", "SQLAlchemy"],
    image: {
      src: "/market-product-intelligence-dashboard.png",
      alt: "Concept dashboard for Market Product Intelligence showing product comparisons, price history and source quality.",
      concept: true,
    },
  },
  {
    number: "05",
    slug: "monteromola",
    title: "SAS per aziende agricole e cantine",
    eyebrow: "AGRITECH / FULL STACK",
    tagline: "Sales, inventory and reporting in one place.",
    description:
      "A mobile-first management platform for agricultural businesses and wineries, bringing sales, inventory and reporting into one workspace.",
    year: "2026",
    location: "Italy",
    tech: ["Next.js", "TypeScript", "Supabase", "Vercel"],
    image: {
      src: "/sas-agricoltura-cantine-dashboard.png",
      alt: "Concept dashboard for SAS, a management tool for farms and wineries, showing sales, inventory and recent orders.",
      concept: true,
    },
  },
];
