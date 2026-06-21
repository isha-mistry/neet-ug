import type { Metadata } from "next";
import { LegalDocumentView } from "@/components/features/legal/LegalDocumentView";
import { PRIVACY_POLICY } from "@/lib/legal/documents";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: PRIVACY_POLICY.title,
  description: PRIVACY_POLICY.description,
  path: PRIVACY_POLICY.path,
});

export default function PrivacyPolicyPage() {
  return <LegalDocumentView document={PRIVACY_POLICY} />;
}
