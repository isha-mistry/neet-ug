import { medseatData } from "./source";
import type { HomeContent, PageMetaContent, SiteIdentity } from "@/types/site";

export function getSiteIdentity(): SiteIdentity {
  return medseatData.site;
}

export function getHomeContent(): HomeContent {
  return medseatData.home;
}

export function getPageMeta(key: keyof typeof medseatData.pages): PageMetaContent {
  return medseatData.pages[key];
}
