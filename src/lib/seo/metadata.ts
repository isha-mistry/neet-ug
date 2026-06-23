import type { Metadata } from "next";
import { SITE_URL } from "./site-config";

interface BuildMetadataInput {
  title: string;
  metaTitle?: string;
  description: string;
  path?: string;
}

export function buildMetadata(input: BuildMetadataInput): Metadata {
  const title = input.title;
  const metaTitle = input.metaTitle || input.title;
  const description = input.description;
  const url = input.path ? `${SITE_URL}${input.path}` : undefined;

  return {
    title,
    description,
    openGraph: {
      title: metaTitle,
      description,
      url,
    },
    twitter: {
      title: metaTitle,
      description,
    },
  };
}

