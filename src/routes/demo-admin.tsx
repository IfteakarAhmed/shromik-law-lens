import { Navigate, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/demo-admin")({
  head: () => ({
    meta: [
      { title: "অ্যাডমিন ডেমো · ShromikAI" },
      { name: "description", content: "ShromikAI-র নমুনা পরিচালনা কেন্দ্র খুলুন।" },
      { property: "og:title", content: "অ্যাডমিন ডেমো · ShromikAI" },
      { property: "og:description", content: "স্থির নমুনা তথ্যসহ ShromikAI পরিচালনা কেন্দ্র।" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <Navigate to="/admin" search={{ section: "queue" }} />,
});
