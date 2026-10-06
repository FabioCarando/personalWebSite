export type JournalPost = {
  number: string;
  slug: string;
  date: string;
  category: string;
  title: string;
  excerpt: string;
  focus: string[];
  question: string;
  approach: string;
  validation: string;
  principle: string;
};

export const journalPosts: JournalPost[] = [
  {
    number: "01",
    slug: "building-trace-in-one-day",
    date: "04 OCT 2026",
    category: "HKU HACKATHON / APPLIED AI",
    title: "Building Trace in one day: the HKU hackathon.",
    excerpt: "Trace was built in one day during a hackathon held at the Department of Data Science at the University of Hong Kong (HKU). The financial intelligence prototype explored how to turn document extraction into structured data while preserving the evidence behind each number.",
    focus: ["HKU Data Science", "One-day hackathon", "Document extraction", "Data provenance"],
    question: "How can a financial document become useful structured data without losing the context needed to review it?",
    approach: "Within the hackathon's one-day timeframe, focus the prototype on a clear document-to-data workflow: separate extraction from validation, define the expected fields, preserve source references and make uncertain or incomplete outputs explicit before downstream analysis.",
    validation: "Check extracted values against their source, test missing fields and conflicting figures, and assess whether a reviewer can trace a result back to the original evidence. A convincing demo is only the starting point for evaluating reliability.",
    principle: "A number becomes useful when someone can inspect where it came from.",
  },
  {
    number: "02",
    slug: "ai-product-intelligence",
    date: "28 SEP 2026",
    category: "DATA ENGINEERING / AI",
    title: "Can AI improve product sourcing?",
    excerpt: "Exploring how collection pipelines, normalized product records and historical data can turn fragmented listings into a foundation for market comparison.",
    focus: ["Multi-source ingestion", "Entity matching", "Historical tracking"],
    question: "What has to be consistent across product listings before a market comparison can be trusted?",
    approach: "Treat collection, normalization and interpretation as separate stages. Preserve source identifiers and collection timestamps, reconcile product attributes, and retain historical observations rather than overwriting every record with the latest value.",
    validation: "Look for duplicate products, inconsistent units, missing attributes and stale observations. Compare like-for-like records before drawing conclusions, and inspect uncertain matches instead of silently merging them.",
    principle: "Useful intelligence starts with comparable, traceable observations.",
  },
  {
    number: "03",
    slug: "finding-work-worth-automating",
    date: "15 SEP 2026",
    category: "AUTOMATION / OPERATIONS",
    title: "Finding the work worth automating.",
    excerpt: "A framework for assessing repetitive workflows through frequency, effort, exception handling and the operational cost of maintaining an automation.",
    focus: ["Workflow analysis", "Opportunity scoring", "Human review"],
    question: "Which repetitive tasks justify automation once exceptions and maintenance are included?",
    approach: "Map the workflow before choosing a tool. Identify inputs, decisions, handoffs and exceptions; then compare task frequency and effort with implementation complexity and the consequences of an incorrect outcome.",
    validation: "Start with a manual baseline. Evaluate time saved alongside correction effort, failed runs and maintenance needs. Keep a clear review or fallback path for cases that require judgment.",
    principle: "Automate a well-understood process, and measure the whole cost of running it.",
  },
];
