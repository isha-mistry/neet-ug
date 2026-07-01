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
  image?: string;
}

export function buildMetadata(input: BuildMetadataInput): Metadata {
  const title = input.title;
  const metaTitle = input.metaTitle;
  const description = input.description;
  const url = input.path ? `${SITE_URL}${input.path}` : undefined;
  const imageUrl = input.image
    ? (input.image.startsWith("http") ? input.image : `${SITE_URL}${input.image}`)
    : `${SITE_URL}${OG_IMAGE_PATH}`;

  return {
    metadataBase: new URL(SITE_URL),
    alternates: input.path
      ? {
          canonical: input.path === "/" ? "/" : input.path,
        }
      : undefined,
    title,
    description,
    openGraph: {
      title: metaTitle || title,
      description,
      url,
      images: [
        {
          url: imageUrl,
          width: OG_IMAGE_WIDTH,
          height: OG_IMAGE_HEIGHT,
          alt: input.image ? title : OG_IMAGE_ALT,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle || title,
      description,
      images: [imageUrl],
    },
  };
}
