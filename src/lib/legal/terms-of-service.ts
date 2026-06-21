import { LEGAL_CONTACT, LEGAL_LAST_UPDATED } from "./contact";
import type { LegalDocument } from "./types";

const { brandName, email } = LEGAL_CONTACT;

export const TERMS_OF_SERVICE: LegalDocument = {
  slug: "terms",
  path: "/terms",
  title: "Terms of Service",
  description:
    "Rules and disclaimers for using Dravio’s website, college data, predictors, and counselling services.",
  lastUpdated: LEGAL_LAST_UPDATED,
  sections: [
    {
      heading: "Agreement",
      paragraphs: [
        `These Terms of Service (“Terms”) govern your access to and use of ${brandName}’s website, tools, and counselling offerings (collectively, the “Services”). By using the Services, you agree to these Terms and our Privacy Policy.`,
        "If you do not agree, please do not use the Services.",
      ],
    },
    {
      heading: "About Dravio",
      paragraphs: [
        `${brandName} is an independent information and counselling platform for MBBS admissions in India. We compile college, fee, cutoff, and counselling information from official and public sources and offer guidance to help you make informed decisions.`,
        "We are not affiliated with, endorsed by, or acting on behalf of the National Medical Commission (NMC), Medical Counselling Committee (MCC), National Testing Agency (NTA), or any state counselling authority.",
      ],
    },
    {
      heading: "Not a guarantee of admission",
      paragraphs: [
        "Cutoff ranks, seat counts, fees, and counselling rules change every year. Predictors and analysers produce estimates based on historical data and the inputs you provide—they are not promises of a seat or rank.",
        "We do not guarantee admission to any college, branch, or quota. Final allotment is determined solely by counselling authorities and applicable law.",
      ],
    },
    {
      heading: "Eligibility to use the Services",
      paragraphs: [
        "You must be able to form a binding contract under applicable law to use paid counselling services. For free tools and content, use the site responsibly and, if you are under 18, with involvement of a parent or guardian.",
        "You agree that information you submit is accurate to the best of your knowledge. Misrepresentation may affect the quality of guidance we can provide.",
      ],
    },
    {
      heading: "Information accuracy",
      paragraphs: [
        "We work to verify data against official publications, but errors, delays, and omissions can occur. Always confirm critical details—cutoffs, fees, bond terms, eligibility, and dates—on the relevant official portal before making decisions.",
        "The Services are provided for general guidance only and are not legal, medical, or financial advice.",
      ],
    },
    {
      heading: "Predictors, tools, and accounts",
      paragraphs: [
        "Some tools require a verified phone number or session storage on your device. You agree not to circumvent limits, scrape the site at scale, reverse engineer our systems, or use automated means to access the Services without permission.",
        "We may modify, suspend, or discontinue any tool or feature without notice.",
      ],
    },
    {
      heading: "Counselling and paid services",
      paragraphs: [
        "If you purchase a counselling plan or session, additional details (scope, deliverables, scheduling, and fees) will be communicated at the time of booking or in a separate agreement.",
        "You agree to attend sessions on time, provide relevant documents when asked, and behave respectfully toward our team. We may refuse or terminate service for abusive conduct or misuse.",
        "Refund terms for paid services are described in our Refund Policy.",
      ],
    },
    {
      heading: "User content and communications",
      paragraphs: [
        "Messages, forms, and feedback you send may be stored to respond to you and improve our services. Do not submit unlawful, harassing, or confidential third-party information without permission.",
      ],
    },
    {
      heading: "Intellectual property",
      paragraphs: [
        `The ${brandName} name, branding, site design, original copy, and curated datasets (except where attributed to official sources) are protected by intellectual property laws. You may view and share links to our pages for personal, non-commercial use.`,
        "You may not copy, republish, or resell our content or data feeds without written consent.",
      ],
    },
    {
      heading: "Third-party services and links",
      paragraphs: [
        "The site links to external websites and messaging platforms. We do not control and are not responsible for third-party content, availability, or policies.",
      ],
    },
    {
      heading: "Disclaimer of warranties",
      paragraphs: [
        'The Services are provided on an "as is" and "as available" basis. To the fullest extent permitted by law, we disclaim warranties of merchantability, fitness for a particular purpose, and non-infringement.',
      ],
    },
    {
      heading: "Limitation of liability",
      paragraphs: [
        "To the fullest extent permitted by law, Dravio and its team will not be liable for indirect, incidental, special, consequential, or punitive damages, or for loss of profits, data, or opportunities arising from your use of the Services or reliance on information on the site.",
        "Our total liability for any claim relating to the Services will not exceed the amount you paid us for counselling services in the twelve months before the claim, or INR 5,000, whichever is greater.",
      ],
    },
    {
      heading: "Indemnity",
      paragraphs: [
        "You agree to indemnify and hold harmless Dravio from claims arising out of your misuse of the Services, violation of these Terms, or infringement of others’ rights.",
      ],
    },
    {
      heading: "Governing law and disputes",
      paragraphs: [
        "These Terms are governed by the laws of India. Courts at Ahmedabad, Gujarat shall have exclusive jurisdiction, subject to applicable consumer protection laws that may provide you other forums.",
        "We encourage you to contact us first to resolve concerns informally.",
      ],
    },
    {
      heading: "Changes",
      paragraphs: [
        "We may update these Terms from time to time. Material changes will be reflected by updating the “Last updated” date. Your continued use after changes constitutes acceptance.",
      ],
    },
    {
      heading: "Contact",
      paragraphs: [
        `Questions about these Terms: ${email}, or ${LEGAL_CONTACT.contactPageHref}.`,
      ],
    },
  ],
};
