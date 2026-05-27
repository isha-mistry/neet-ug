import type { CollegeDetailViewModel } from "@/types/detail";

export function buildCollegeJsonLd(college: CollegeDetailViewModel) {
  return {
    "@context": "https://schema.org",
    "@type": "CollegeOrUniversity",
    name: college.name,
    address: {
      "@type": "PostalAddress",
      addressLocality: college.city,
      addressRegion: college.stateName,
      addressCountry: "IN",
    },
    description: `${college.name} in ${college.city}, ${college.stateName}.`,
  };
}
