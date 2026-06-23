import type { Metadata } from "next";
import { ApplicationFormView } from "@/components/features/neet-ug/ApplicationFormView";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "NEET UG Registration Guide",
  metaTitle: "NEET UG 2026 Registration Guide | Application Process & Eligibility",
  description:
    "Learn how to register for NEET UG 2026, understand eligibility requirements, and avoid common application mistakes.",
  path: "/neet-ug-2026/application-form",
});

export default function NeetApplicationFormPage() {
  return <ApplicationFormView />;
}
