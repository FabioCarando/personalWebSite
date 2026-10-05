export type JournalPost = {
  number: string;
  slug: string;
  date: string;
  category: string;
  title: string;
  excerpt: string;
};

export const journalPosts: JournalPost[] = [
  {
    number: "01",
    slug: "building-trace-in-one-day",
    date: "04 OCT 2026",
    category: "BUILDING",
    title: "Building Trace in one day.",
    excerpt:
      "What we learned building a financial intelligence system during the iFX Hackathon in Hong Kong.",
  },
  {
    number: "02",
    slug: "ai-product-intelligence",
    date: "28 SEP 2026",
    category: "DATA / AI",
    title: "Can AI improve product sourcing?",
    excerpt:
      "An experiment in turning fragmented online product information into structured market intelligence.",
  },
  {
    number: "03",
    slug: "finding-work-worth-automating",
    date: "15 SEP 2026",
    category: "AUTOMATION",
    title: "Finding the work worth automating.",
    excerpt:
      "Why identifying repetitive work should come before deciding how to automate it.",
  },
];