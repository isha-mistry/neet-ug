import { getSiteJsonLdGraph } from "@/lib/seo/site-json-ld";

export function SiteJsonLd() {
  const graph = getSiteJsonLdGraph();
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
