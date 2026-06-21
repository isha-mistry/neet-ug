import { dravioData } from "./source";
import type { BlogArticle, InfoPage, QuotaGuide } from "@/types/content";

export function getQuotaGuides(): QuotaGuide[] {
  return dravioData.quotaGuides;
}

export function getQuotaGuideBySlug(slug: string): QuotaGuide | undefined {
  return dravioData.quotaGuides.find((guide) => guide.slug === slug);
}

export function getBlogContent() {
  return dravioData.blog;
}

export function getBlogArticles(): BlogArticle[] {
  return dravioData.blog.articles;
}

export function getBlogArticleBySlug(slug: string): BlogArticle | undefined {
  return dravioData.blog.articles.find((article) => article.slug === slug);
}

export function getInfoPages(): InfoPage[] {
  return dravioData.infoPages;
}

export function getInfoPageBySlug(slug: string): InfoPage | undefined {
  return dravioData.infoPages.find((page) => page.slug === slug);
}

export function getFaqContent() {
  return dravioData.faq;
}
