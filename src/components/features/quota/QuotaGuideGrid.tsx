import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { Card } from "@/components/ui/Card";
import type { QuotaGuide } from "@/types/content";

interface QuotaGuideGridProps {
  guides: QuotaGuide[];
}

export function QuotaGuideGrid({ guides }: QuotaGuideGridProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {guides.map((guide) => (
        <Link key={guide.slug} href={`/quota/${guide.slug}`} className="group flex">
          <Card
            padded
            bordered
            elevated
            as="article"
            className="flex h-full w-full flex-col gap-4 transition-shadow group-hover:shadow-[var(--shadow-md)]"
          >
            <span className="inline-flex w-fit rounded-[var(--radius-pill)] bg-brand-50 px-2.5 py-1 text-xs font-semibold uppercase tracking-widest text-brand-800">
              Quota Guide
            </span>
            <h2 className="text-lg font-semibold tracking-snug text-text">
              {guide.title}
            </h2>
            <p className="line-clamp-3 text-sm leading-relaxed text-text-secondary">
              {guide.summary}
            </p>
            <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold tracking-wide text-brand-700">
              Open Guide
              <FiArrowRight aria-hidden="true" />
            </span>
          </Card>
        </Link>
      ))}
    </div>
  );
}
