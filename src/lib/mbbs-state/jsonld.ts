import type { FaqItem } from "@/types/content";

export function buildMbbsStateFaqJsonLd(items: FaqItem[], stateName: string) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    name: `MBBS in ${stateName} FAQ`,
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
