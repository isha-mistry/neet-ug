import type { FaqItem } from "@/types/content";
import { MBBS_INDIA_PAGE_PATH } from "./constants";
import { mbbsIndiaPageTitle } from "@/lib/mbbs/constants";

export function buildMbbsIndiaFaqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildMbbsIndiaArticleJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: mbbsIndiaPageTitle(),
    description:
      "National guide to MBBS colleges, seats, cutoffs, fees, counseling, and career paths in India.",
    url: MBBS_INDIA_PAGE_PATH,
    author: {
      "@type": "Organization",
      name: "Dravio",
    },
  };
}
