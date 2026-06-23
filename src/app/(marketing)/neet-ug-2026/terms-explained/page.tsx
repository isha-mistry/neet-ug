import type { Metadata } from "next";
import { TermsExplainedView } from "@/components/features/neet-ug/TermsExplainedView";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "NEET Counselling Terms Explained",
  metaTitle: "NEET Counselling Terms Explained | AIQ, State Quota & More",
  description:
    "Understand important NEET counselling terms, quotas, seat types, and admission concepts.",
  path: "/neet-ug-2026/terms-explained",
});

export default function TermsExplainedPage() {
  return <TermsExplainedView />;
}
