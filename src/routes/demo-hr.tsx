import { Navigate, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/demo-hr")({
  head: () => ({
    meta: [
      { title: "HR ডেমো · ShromikAI" },
      { name: "description", content: "HR হিসেবে ShromikAI-র নমুনা পর্যালোচনা খুলুন।" },
      { property: "og:title", content: "HR ডেমো · ShromikAI" },
      { property: "og:description", content: "HR ভূমিকার জন্য নমুনা চুক্তি পর্যালোচনা।" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <Navigate to="/app" search={{ role: "hr" }} />,
});
