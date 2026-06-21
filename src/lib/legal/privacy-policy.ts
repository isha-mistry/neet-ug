import { LEGAL_CONTACT, LEGAL_LAST_UPDATED } from "./contact";
import type { LegalDocument } from "./types";

const { brandName, email } = LEGAL_CONTACT;

export const PRIVACY_POLICY: LegalDocument = {
  slug: "privacy",
  path: "/privacy",
  title: "Privacy Policy",
  description:
    "How Dravio collects, uses, stores, and protects personal information when you use our website, predictors, and counselling services.",
  lastUpdated: LEGAL_LAST_UPDATED,
  sections: [
    {
      heading: "Overview",
      paragraphs: [
        `${brandName} (“we”, “us”, “our”) operates dravio.in and related services that help NEET-UG aspirants and parents explore MBBS colleges, cutoffs, quotas, and counselling options in India.`,
        "This Privacy Policy explains what personal data we collect, why we collect it, how we use it, and the choices you have. By using our website or submitting a form, you acknowledge this policy. Where we ask for explicit consent (for example on lead forms), we process your data on that basis as well.",
      ],
    },
    {
      heading: "Who is responsible for your data",
      paragraphs: [
        "The data controller for personal information collected through this website is the business entity operating Dravio. For privacy-related requests, contact us using the details in the Contact section below.",
      ],
    },
    {
      heading: "Information we collect",
      paragraphs: [
        "We collect information you provide directly, information generated when you use our tools, and limited technical data needed to run the site securely.",
      ],
      bullets: [
        "Identity and contact details: name, phone number (with country code), email address, city or state, and messages you send through contact or callback forms.",
        "Admission context: NEET score or rank, category, domicile or target states, preferred counselling topics, and similar fields you choose to share when requesting guidance or using predictors.",
        "Consent records: whether you accepted this policy (and when), tied to form submissions stored in our systems.",
        "Phone verification: one-time passwords (OTPs) sent to your mobile number for certain predictors or flows; we store verification status for a limited period to prevent abuse, not the OTP itself after validation.",
        "Usage and device data: pages visited, referrer, approximate location derived from IP, browser type, and cookies or similar technologies described below.",
      ],
    },
    {
      heading: "How we use your information",
      paragraphs: ["We use personal data for the following purposes:"],
      bullets: [
        "Respond to enquiries, callback requests, and counselling bookings.",
        "Provide predictors, cutoff analysis, and other tools you request.",
        "Send service-related SMS or WhatsApp messages (for example OTPs or appointment reminders) when you have shared your number and consented.",
        "Improve content accuracy, fix errors, and understand which features are useful.",
        "Protect against fraud, spam, and misuse of our forms and OTP flows.",
        "Comply with applicable law and respond to lawful requests.",
      ],
    },
    {
      heading: "What we do not do",
      paragraphs: [
        "We do not sell your phone number or contact details to coaching institutes, third-party marketers, or data brokers.",
        "We do not use your counselling enquiry details for unrelated promotional campaigns without your consent.",
      ],
    },
    {
      heading: "Legal basis (India)",
      paragraphs: [
        "We process personal data in line with applicable Indian law, including the Digital Personal Data Protection Act, 2023 (DPDP Act), as and when it applies to our processing activities.",
        "Depending on the activity, we rely on your consent (for example marketing or counselling follow-up where required), performance of a request you make (answering a form or running a predictor), and our legitimate interests in operating a secure, useful information service—balanced against your rights.",
      ],
    },
    {
      heading: "Sharing with service providers",
      paragraphs: [
        "We use trusted vendors to host the website, operate databases, deliver SMS (such as OTP providers), and analyse aggregated traffic. These providers process data only on our instructions and for the purposes described in this policy.",
        "We may disclose information if required by law, court order, or government authority, or to protect the rights, safety, and security of users and our business.",
      ],
    },
    {
      heading: "Data retention",
      paragraphs: [
        "We keep lead and enquiry records for as long as needed to provide counselling support, maintain business records, and resolve disputes—typically up to three years from your last meaningful interaction unless a longer period is required by law.",
        "Server logs and security records may be kept for shorter fixed periods. Aggregated or anonymised analytics may be retained longer.",
      ],
    },
    {
      heading: "Cookies and similar technologies",
      paragraphs: [
        "We use essential cookies and local storage to keep predictor sessions working, remember phone verification state, and maintain basic site functionality.",
        "We may use analytics cookies to understand traffic patterns in aggregate. You can control non-essential cookies through your browser settings; disabling essential cookies may limit predictors or forms.",
      ],
    },
    {
      heading: "Security",
      paragraphs: [
        "We use industry-standard measures such as HTTPS, access controls, and monitored hosting environments. No online service can guarantee absolute security; please use strong devices and avoid sharing OTPs with anyone.",
      ],
    },
    {
      heading: "Your rights and choices",
      paragraphs: [
        "Subject to applicable law, you may request access to, correction of, or deletion of personal data we hold about you. You may withdraw consent for future marketing contact where processing is consent-based.",
        `To exercise these rights, email ${email} with the phone number or email you used on our forms so we can verify your request. We may ask for reasonable information to confirm your identity.`,
      ],
    },
    {
      heading: "Children and students",
      paragraphs: [
        "Our services are aimed at NEET aspirants and their parents or guardians. If you are under 18, use the site with a parent or guardian and do not submit personal data without their involvement where required.",
      ],
    },
    {
      heading: "Third-party links",
      paragraphs: [
        "Our pages link to official counselling portals, college websites, and messaging apps (such as WhatsApp). Those services have their own privacy practices; we are not responsible for how they handle your data.",
      ],
    },
    {
      heading: "Changes to this policy",
      paragraphs: [
        "We may update this Privacy Policy from time to time. The “Last updated” date at the top of the page will change when we do. Continued use of the site after changes means you accept the updated policy.",
      ],
    },
    {
      heading: "Contact",
      paragraphs: [
        `Privacy questions or data requests: ${email}. You can also reach us through our contact page at ${LEGAL_CONTACT.contactPageHref}.`,
      ],
    },
  ],
};
