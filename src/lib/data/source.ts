import rawData from "@/data/medseat-data.json";
import type {
  CategoryRecord,
  CollegeRecord,
  StateRecord,
} from "@/types/college";
import type { FilterOptionGroups } from "@/types/filters";
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
  states: StateRecord[];
  categories: CategoryRecord[];
  filterOptions: Pick<
    FilterOptionGroups,
    "collegeTypes" | "feeRanges" | "cutoffRanges"
  >;
  sortOptions: { value: string; label: string }[];
  comparisonMetrics: ComparisonMetric[];
  colleges: CollegeRecord[];
}

const data = rawData as unknown as MedseatRawData;

export const medseatData: MedseatRawData = data;
