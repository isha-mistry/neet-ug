import rawData from "@/data/medseat-data.json";
import rankPredictorSeed from "@/data/rank-predictor-seed.json";
import type { RankPredictorConfig } from "@/types/rank-predictor";
import type {
  HomeContent,
  PageMetaContent,
  SiteIdentity,
} from "@/types/site";
import type { ComparisonMetric } from "@/types/comparison";
import type {
  BlogContent,
  FaqContent,
  InfoPage,
  QuotaGuide,
} from "@/types/content";
import type { CategoryRecord } from "@/types/college";
import { CATALOG_SOURCE_LABEL } from "./catalog-loader";

interface MedseatRawData {
  site: SiteIdentity;
  home: HomeContent;
  pages: {
    allColleges: PageMetaContent;
    comparison: PageMetaContent;
    blog: PageMetaContent;
    quota: PageMetaContent;
    about: PageMetaContent;
    faq: PageMetaContent;
    contact: PageMetaContent;
    howItWorks: PageMetaContent;
  };
  quotaGuides: QuotaGuide[];
  blog: BlogContent;
  infoPages: InfoPage[];
  faq: FaqContent;
  categories: CategoryRecord[];
  filterOptions: {
    collegeTypes: { value: string; label: string }[];
    feeRanges: { value: string; label: string }[];
    cutoffRanges: { value: string; label: string }[];
  };
  sortOptions: { value: string; label: string }[];
  comparisonMetrics: ComparisonMetric[];
  rankPredictor: RankPredictorConfig;
}

const base = rawData as unknown as MedseatRawData;

/** Site copy, blog, categories metadata (colleges/states via catalog-loader). */
export const medseatData: MedseatRawData = {
  ...base,
  rankPredictor: rankPredictorSeed.rankPredictor as RankPredictorConfig,
};

export const dataSourceLabel = CATALOG_SOURCE_LABEL;
