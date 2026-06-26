import type { LinkItem } from "@/types/core";
import { RANK_PREDICTOR_PAGE_PATH } from "@/lib/rank-predictor/constants";

export const PREDICTOR_NAV_LINKS: LinkItem[] = [
  { label: "ReNEET Rank Predictor 2026", href: RANK_PREDICTOR_PAGE_PATH },
  { label: "Cutoff analyser", href: "/cutoff-analyser" },
  { label: "College predictor", href: "/college-predictor" },
];
