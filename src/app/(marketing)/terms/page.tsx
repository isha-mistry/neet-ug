import type { Metadata } from "next";
import { LegalDocumentView } from "@/components/features/legal/LegalDocumentView";
import { TERMS_OF_SERVICE } from "@/lib/legal/documents";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: TERMS_OF_SERVICE.title,
  description: TERMS_OF_SERVICE.description,
  path: TERMS_OF_SERVICE.path,
});

export default function TermsOfServicePage() {
  return <LegalDocumentView document={TERMS_OF_SERVICE} />;
}
