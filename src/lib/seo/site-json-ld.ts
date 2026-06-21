import {
  FAVICON,
  ORGANIZATION_PHONE,
  ORGANIZATION_SAME_AS,
  SITE_URL,
} from "@/lib/seo/site-config";

const organizationId = `${SITE_URL}/#organization`;
const websiteId = `${SITE_URL}/#website`;

export function getSiteJsonLdGraph() {
  const logoUrl = new URL(FAVICON.android512, SITE_URL).href;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: "Dravio",
        alternateName: "Dravio MBBS Counseling",
        url: `${SITE_URL}/`,
        logo: {
          "@type": "ImageObject",
          url: logoUrl,
          width: 512,
          height: 512,
        },
        description:
          "MBBS counseling platform helping NEET students secure admissions in Gujarat, Rajasthan, Madhya Pradesh, Maharashtra and through MCC All India Quota.",
        sameAs: [...ORGANIZATION_SAME_AS],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: ORGANIZATION_PHONE,
          contactType: "customer service",
          areaServed: "IN",
          availableLanguage: ["English", "Hindi", "Gujarati"],
        },
        address: {
          "@type": "PostalAddress",
          addressCountry: "IN",
        },
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: `${SITE_URL}/`,
        name: "Dravio",
        description: "MBBS counseling for NEET 2026",
        publisher: { "@id": organizationId },
        inLanguage: "en-IN",
        potentialAction: {
          "@type": "SearchAction",
          target: `${SITE_URL}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Service",
        name: "MBBS Counseling",
        provider: { "@id": organizationId },
        areaServed: [
          { "@type": "State", name: "Gujarat" },
          { "@type": "State", name: "Rajasthan" },
          { "@type": "State", name: "Madhya Pradesh" },
          { "@type": "State", name: "Maharashtra" },
        ],
        serviceType: "Medical college admission counseling",
        audience: {
          "@type": "EducationalAudience",
          educationalRole: "student",
        },
      },
    ],
  };
}
