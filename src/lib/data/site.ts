import { dravioData } from "./source";
import type { HomeContent, PageMetaContent, SiteIdentity } from "@/types/site";

export function getSiteIdentity(): SiteIdentity {
  return dravioData.site;
}

export function getHomeContent(): HomeContent {
  return dravioData.home;
}

export function getPageMeta(key: keyof typeof dravioData.pages): PageMetaContent {
  return dravioData.pages[key];
}
