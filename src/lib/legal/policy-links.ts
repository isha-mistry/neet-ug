import type { LegalPolicyLink } from "./types";

export const LEGAL_POLICY_LINKS: readonly LegalPolicyLink[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Refund Policy", href: "/refund-policy" },
] as const;
