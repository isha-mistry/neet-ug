import type { Metadata } from "next";
import {
  SITE_URL,
  OG_IMAGE_PATH,
  OG_IMAGE_ALT,
  OG_IMAGE_WIDTH,
  OG_IMAGE_HEIGHT,
} from "./site-config";

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
  const imageUrl = `${SITE_URL}${OG_IMAGE_PATH}`;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    openGraph: {
      title: metaTitle,
      description,
      url,
      images: [
        {
          url: imageUrl,
          width: OG_IMAGE_WIDTH,
          height: OG_IMAGE_HEIGHT,
          alt: OG_IMAGE_ALT,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description,
      images: [imageUrl],
    },
  };
}


