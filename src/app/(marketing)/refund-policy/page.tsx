import type { Metadata } from "next";
import { LegalDocumentView } from "@/components/features/legal/LegalDocumentView";
import { REFUND_POLICY } from "@/lib/legal/documents";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: REFUND_POLICY.title,
  description: REFUND_POLICY.description,
  path: REFUND_POLICY.path,
});

export default function RefundPolicyPage() {
  return <LegalDocumentView document={REFUND_POLICY} />;
}
