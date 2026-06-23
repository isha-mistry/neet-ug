import type { Metadata } from "next";
import { StateQuotaView } from "@/components/features/quota/StateQuotaView";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "State Quota Admissions",
  metaTitle: "State Quota MBBS Admission 2026 | State Counselling Guide",
  description:
    "Understand domicile eligibility, state counselling processes, and admission opportunities under state quotas.",
  path: "/quota/state",
});

export default function StateQuotaPage() {
  return <StateQuotaView />;
}
