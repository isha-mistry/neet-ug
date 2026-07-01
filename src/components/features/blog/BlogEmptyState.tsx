import Link from "next/link";
import { FiBookOpen, FiCompass, FiAward } from "react-icons/fi";
import { Card } from "@/components/ui/Card";

export function BlogEmptyState() {
  return (
    <Card
      padded
      bordered
      className="col-span-full my-8 flex flex-col items-center justify-center py-16 text-center"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-fixed text-primary">
        <FiBookOpen className="h-8 w-8" />
      </div>

      <h3 className="mt-6 text-2xl font-bold tracking-tight text-on-surface">
        NEET UG Counseling Insights Coming Soon
      </h3>

      <p className="mt-3 max-w-lg text-base leading-relaxed text-on-surface-variant">
        Our editorial team is currently publishing detailed NEET UG 2026 cutoff analysis, AIQ state counseling guides, and ROI comparison articles directly from Sanity Studio.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          href="/rank-predictor"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-bold text-on-primary shadow-brand-action transition-transform hover:-translate-y-[1px]"
        >
          <FiAward className="text-base" />
          Try Rank Predictor
        </Link>
        <Link
          href="/college-predictor"
          className="inline-flex items-center gap-2 rounded-lg border-[1.5px] border-outline-variant bg-surface-container-lowest px-6 py-3 text-sm font-bold text-primary transition-colors hover:border-primary hover:bg-surface-container-low"
        >
          <FiCompass className="text-base" />
          Explore College Predictor
        </Link>
      </div>
    </Card>
  );
}
