import type { Metadata } from "next";
import { StateQuotaView } from "@/components/features/quota/StateQuotaView";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "State Quota (SQ) Guide - NEET UG",
  description:
    "The State Quota is the most critical pathway for medical aspirants, reserving the vast majority of seats for local residents.",
  path: "/quota/state",
});

export default function StateQuotaPage() {
  return <StateQuotaView />;
}
