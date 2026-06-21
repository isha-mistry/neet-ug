import { ABOUT_CONTACT } from "@/lib/about/content";

/** Contact details referenced across legal policies. */
export const LEGAL_CONTACT = {
  brandName: "Dravio",
  email: ABOUT_CONTACT.channels.email,
  emailHref: `mailto:${ABOUT_CONTACT.channels.email}`,
  contactPageHref: "/contact" as const,
} as const;

export const LEGAL_LAST_UPDATED = "22 June 2026";
