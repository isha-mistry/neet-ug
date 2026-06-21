import { PRIVACY_POLICY } from "./privacy-policy";
import { REFUND_POLICY } from "./refund-policy";
import { TERMS_OF_SERVICE } from "./terms-of-service";
import type { LegalDocument } from "./types";

export const LEGAL_DOCUMENTS: readonly LegalDocument[] = [
  PRIVACY_POLICY,
  TERMS_OF_SERVICE,
  REFUND_POLICY,
] as const;

export function getLegalDocumentByPath(path: LegalDocument["path"]): LegalDocument | undefined {
  return LEGAL_DOCUMENTS.find((doc) => doc.path === path);
}

export { PRIVACY_POLICY, TERMS_OF_SERVICE, REFUND_POLICY };
