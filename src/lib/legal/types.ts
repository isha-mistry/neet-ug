export type LegalDocumentSection = {
  heading: string;
  paragraphs: readonly string[];
  bullets?: readonly string[];
};

export type LegalDocument = {
  slug: "privacy" | "terms" | "refund-policy";
  path: `/privacy` | `/terms` | `/refund-policy`;
  title: string;
  description: string;
  lastUpdated: string;
  sections: readonly LegalDocumentSection[];
};

export type LegalPolicyLink = {
  label: string;
  href: LegalDocument["path"];
};
