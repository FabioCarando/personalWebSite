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
  videoPoster?: string;
  image?: { src: string; alt: string; concept?: boolean };
  research?: {
    title: string;
    subtitle: string;
    date?: string;
    authors?: string;
    pdf?: string;
    metrics: { label: string; value: string }[];
    context: string;
    note: string;
  };
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
      title: "Forgetting Is a Changepoint",
      subtitle: "Anytime-Valid Retention Monitoring and E-Detector-Triggered Replay in Continual Learning",
      date: "30 September 2026",
      pdf: "/Forgetting%20Is%20a%20Changepoint.pdf",
      metrics: [
        { label: "Detection rate", value: "31.5% → 94.5%" },
        { label: "Median delay", value: "257 → 35" },
      ],
      context: "Fixed-null e-process → restart e-detector. Permuted-digits benchmark, 200 seeds; delay in SGD steps. Different false-alarm guarantees: horizon-uniform control versus average run length.",
      note: "Preliminary experiments. At comparable replay budget, triggered replay shows no significant accuracy advantage over periodic replay.",
    },
  },
  {
    number: "02",
    slug: "approximate-bayesian-computation",
    title: "APPROXIMATE BAYESIAN COMPUTATION",
    eyebrow: "RESEARCH / BAYESIAN INFERENCE",
    tagline: "Inference through simulation when likelihoods are intractable.",
    description:
      "A co-authored study of Approximate Bayesian Computation, covering rejection sampling, MCMC-ABC and sequential Monte Carlo. Includes R experiments for Gaussian parameter estimation, with discussion of summary statistics, tolerance calibration, regression adjustment and model selection.",
    year: "",
    tech: ["R", "Bayesian inference", "Monte Carlo", "Simulation"],
    research: {
      title: "Approximate Bayesian Computation (ABC)",
      subtitle: "Likelihood-free inference, algorithm calibration and sequential improvements",
      authors: "Fabio Carando, Simone Dal Ben, Martina Dotti",
      pdf: "/ABC%20-%20Approximate%20Bayesian%20Computational%20Method.pdf",
      metrics: [
        { label: "Methods discussed", value: "Rejection / MCMC / SMC" },
        { label: "Numerical example", value: "Gaussian parameters" },
      ],
      context: "R implementations compare basic ABC with a sequential approach for estimating a normal distribution's mean and variance, alongside posterior summaries and runtime measurements.",
      note: "The study discusses the tradeoff between computational effort and approximation quality, including the role of summary statistics, distance measures and tolerance thresholds.",
    },
  },
  {
    number: "03",
    slug: "trace",
    title: "TRACE",
    eyebrow: "FINTECH / AI",
    tagline: "Financial intelligence with memory.",
    description:
      "A financial intelligence system that transforms documents into controlled, auditable data while preserving the provenance behind every number.",
    year: "2026",
    location: "Hong Kong",
    tech: ["Python", "LLMs", "Streamlit", "AWS"],
    video: "/trace-demo.mp4",
    videoPoster: "/trace-demo-poster.jpg",
  },
  {
    number: "04",
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
    number: "05",
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
    number: "06",
    slug: "monteromola",
    title: "SAS for farms and wineries",
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
