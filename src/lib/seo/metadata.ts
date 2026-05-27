import type { Metadata } from "next";
import { getSiteIdentity } from "@/lib/data/site";

interface BuildMetadataInput {
  title: string;
  description: string;
  path?: string;
}

export function buildMetadata({
  title,
  description,
  path,
}: BuildMetadataInput): Metadata {
  const site = getSiteIdentity();
  const fullTitle = title.includes(site.brandName)
    ? title
    : `${title} | ${site.brandName}`;
  return {
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      siteName: site.brandName,
      type: "website",
      url: path,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}
