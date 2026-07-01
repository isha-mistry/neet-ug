import type { PortableTextBlock } from "next-sanity";
import type { SanityImageSource } from "@sanity/image-url";

export interface SanityAuthor {
  name: string;
  slug?: string;
  image?: SanityImageSource;
  bio?: PortableTextBlock[];
}

export interface SanityCategory {
  title: string;
  slug?: string;
}

export interface SanityBlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  readMinutes?: number;
  tags?: string[];
  featured?: boolean;
  publishedAt?: string;
  _createdAt: string;
  mainImage?: {
    asset?: {
      _id: string;
      url: string;
    };
    alt?: string;
  } & SanityImageSource;
  author?: SanityAuthor;
  categories?: SanityCategory[];
  body?: PortableTextBlock[];
}
