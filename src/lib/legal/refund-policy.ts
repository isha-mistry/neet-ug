import { LEGAL_CONTACT, LEGAL_LAST_UPDATED } from "./contact";
import type { LegalDocument } from "./types";

const { brandName, email } = LEGAL_CONTACT;

export const REFUND_POLICY: LegalDocument = {
  slug: "refund-policy",
  path: "/refund-policy",
  title: "Refund Policy",
  description:
    "How refunds work for paid Dravio counselling plans and related services.",
  lastUpdated: LEGAL_LAST_UPDATED,
  sections: [
    {
      heading: "Scope",
      paragraphs: [
        `This Refund Policy applies to paid counselling packages, add-on sessions, and other fee-based services sold by ${brandName} (“paid services”). Free tools, content on the website, and introductory discovery calls advertised as free are not covered unless stated otherwise at the time of booking.`,
      ],
    },
    {
      heading: "Before you pay",
      paragraphs: [
        "We will confirm the plan name, inclusions (number of sessions, states covered, document review, and similar deliverables), price, and validity period before you complete payment.",
        "Please read these details carefully. If anything is unclear, ask us on WhatsApp or email before paying.",
      ],
    },
    {
      heading: "Eligible refunds",
      paragraphs: ["You may request a refund in the following situations:"],
      bullets: [
        "You cancel in writing at least 48 hours before your first scheduled paid counselling session and no deliverable work (such as personalised college shortlists or document review) has started.",
        "We cancel a session or plan and cannot offer a reasonable reschedule within 7 days.",
        "You were charged twice for the same order due to a technical error— we will refund the duplicate charge.",
        "A plan was purchased by mistake on the same day as payment, before any session or custom deliverable work has started, provided you notify us within 24 hours of payment.",
      ],
    },
    {
      heading: "Non-refundable situations",
      paragraphs: ["Refunds are generally not available when:"],
      bullets: [
        "One or more paid sessions have already been completed, or personalised deliverables agreed in your plan have been shared with you.",
        "You miss a scheduled session without rescheduling at least 24 hours in advance (no-show).",
        "You change your mind after receiving plan deliverables that match what was sold.",
        "Admission outcomes differ from your expectations— our services guide decisions; they do not guarantee seats.",
      ],
    },
    {
      heading: "Partial refunds",
      paragraphs: [
        "If you used part of a multi-session plan and need to stop for genuine reasons (for example medical emergency), we may offer a partial refund or credit toward a future plan at our discretion, minus the value of sessions or work already delivered.",
      ],
    },
    {
      heading: "How to request a refund",
      paragraphs: [
        `Email ${email} from the address or phone number on your booking with your name, payment date, amount, and reason. We will respond within 3 business days.`,
        "Approved refunds are processed to the original payment method where possible. Bank or UPI processing may take 5–10 business days after approval.",
      ],
    },
    {
      heading: "Chargebacks",
      paragraphs: [
        "If you dispute a charge with your bank without contacting us first, we may pause counselling support until the matter is resolved. We will provide transaction and service records to payment partners as allowed by law.",
      ],
    },
    {
      heading: "Changes",
      paragraphs: [
        "We may update this Refund Policy from time to time. The version on this page applies to purchases made after the updated date unless otherwise required by law.",
      ],
    },
    {
      heading: "Contact",
      paragraphs: [
        `Refund requests and billing questions: ${email}, or ${LEGAL_CONTACT.contactPageHref}.`,
      ],
    },
  ],
};
