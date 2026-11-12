import { createFileRoute } from "@tanstack/react-router";

import { ComparePage } from "@/components/ComparePage";

export const Route = createFileRoute("/app_/compare")({
  head: () => ({
    meta: [
      { title: "উদ্ধৃতি যাচাইয়ের তুলনা · ShromikAI" },
      { name: "description", content: "একই নমুনা কর্মচুক্তিতে সাধারণ AI-র দাবির যাচাই এবং শ্রমিকAI-র সরকারি সূত্রসমর্থিত ফল তুলনা করুন।" },
      { property: "og:title", content: "উদ্ধৃতি যাচাইয়ের তুলনা · ShromikAI" },
      { property: "og:description", content: "নমুনা চুক্তির দাবিগুলোকে সরকারি আইনের সঙ্গে যাচাই করে পাশাপাশি দেখুন।" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ComparePage,
});