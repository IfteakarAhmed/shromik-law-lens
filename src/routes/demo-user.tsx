import { Navigate, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/demo-user")({
  head: () => ({
    meta: [
      { title: "শ্রমিক ডেমো · ShromikAI" },
      { name: "description", content: "শ্রমিক হিসেবে ShromikAI-র নমুনা পর্যালোচনা খুলুন।" },
      { property: "og:title", content: "শ্রমিক ডেমো · ShromikAI" },
      { property: "og:description", content: "শ্রমিকAI-র নমুনা চুক্তি পর্যালোচনা।" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <Navigate to="/app" search={{ role: "worker" }} />,
});
