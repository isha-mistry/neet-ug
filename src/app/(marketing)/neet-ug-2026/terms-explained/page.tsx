import { TermsExplainedView } from "@/components/features/neet-ug/TermsExplainedView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms Explained — NEET MBBS Counseling Glossary | MedSeat",
  description:
    "Complete NEET UG counselling glossary: AIQ, state quota, MCC rounds, reservation categories, documents, bonds, and state-specific terms for Gujarat, Rajasthan, MP and Maharashtra.",
};

export default function TermsExplainedPage() {
  return <TermsExplainedView />;
}
