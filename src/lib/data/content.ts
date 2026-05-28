import { medseatData } from "./source";
import type { BlogArticle, InfoPage, QuotaGuide } from "@/types/content";

export function getQuotaGuides(): QuotaGuide[] {
  return medseatData.quotaGuides;
}

export function getQuotaGuideBySlug(slug: string): QuotaGuide | undefined {
  return medseatData.quotaGuides.find((guide) => guide.slug === slug);
}

export function getBlogContent() {
  return medseatData.blog;
}

export function getBlogArticles(): BlogArticle[] {
  return medseatData.blog.articles;
}

export function getBlogArticleBySlug(slug: string): BlogArticle | undefined {
  return medseatData.blog.articles.find((article) => article.slug === slug);
}

export function getInfoPages(): InfoPage[] {
  return medseatData.infoPages;
}

export function getInfoPageBySlug(slug: string): InfoPage | undefined {
  return medseatData.infoPages.find((page) => page.slug === slug);
}

export function getFaqContent() {
  return medseatData.faq;
}
