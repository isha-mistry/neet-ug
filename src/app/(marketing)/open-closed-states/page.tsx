import type { Metadata } from "next";
import { OpenClosedStatesView } from "@/components/features/quota/OpenClosedStatesView";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Open & Closed States for MBBS",
  metaTitle: "Open & Closed States for MBBS Admission 2026 | Private College Eligibility",
  description:
    "State-wise list of open and closed states for private MBBS admission — where outside-state students can take management, institutional, or NRI seats, and where domicile rules apply.",
  path: "/open-closed-states",
});

export default function OpenClosedStatesPage() {
  return <OpenClosedStatesView />;
}
