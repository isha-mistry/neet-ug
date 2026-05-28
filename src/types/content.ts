import type { Slug } from "./core";

export interface ContentSection {
  heading: string;
  body?: string;
  points?: string[];
}

export interface QuotaGuide {
  slug: Slug;
  title: string;
  summary: string;
  overview: string;
  sections: ContentSection[];
  keyPoints: string[];
}

export interface BlogArticleSection {
  heading: string;
  paragraphs: string[];
}

export interface BlogArticle {
  slug: Slug;
  title: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  readMinutes: number;
  tags: string[];
  sections: BlogArticleSection[];
}

export interface BlogContent {
  title: string;
  description: string;
  featuredSlug?: Slug;
  articles: BlogArticle[];
}

export interface InfoPage {
  slug: Slug;
  title: string;
  description: string;
  sections: ContentSection[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqContent {
  title: string;
  description: string;
  items: FaqItem[];
}
