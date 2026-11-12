import { createFileRoute } from "@tanstack/react-router";

import { AdminDashboard } from "@/components/AdminDashboard";

export type AdminSection = "queue" | "playbooks" | "keys" | "usage" | "trace";

export const Route = createFileRoute("/admin")({
  validateSearch: (search: Record<string, unknown>): { section: AdminSection } => ({
    section:
      search["section"] === "playbooks" ||
      search["section"] === "keys" ||
      search["section"] === "usage" ||
      search["section"] === "trace"
        ? search["section"]
        : "queue",
  }),
  head: () => ({
    meta: [
      { title: "পরিচালনা কেন্দ্র · ShromikAI" },
      { name: "description", content: "শ্রমিকAI-র মানব পর্যালোচনা, নীতিমালা, নমুনা ব্যবহার ও বিশ্লেষণ ধাপের নমুনা পরিচালনা কেন্দ্র।" },
      { property: "og:title", content: "পরিচালনা কেন্দ্র · ShromikAI" },
      { property: "og:description", content: "স্থির নমুনা তথ্য দিয়ে পর্যালোচনা ও বিশ্লেষণ ধাপ দেখুন।" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AdminDashboard,
});