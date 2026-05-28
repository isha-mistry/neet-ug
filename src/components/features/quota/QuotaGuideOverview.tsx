import { Card } from "@/components/ui/Card";
import type { QuotaGuide } from "@/types/content";

interface QuotaGuideOverviewProps {
  guide: QuotaGuide;
}

export function QuotaGuideOverview({ guide }: QuotaGuideOverviewProps) {
  return (
    <Card padded bordered className="ms-gradient-soft">
      <p className="text-sm leading-relaxed text-text-secondary">{guide.overview}</p>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {guide.keyPoints.map((point) => (
          <span
            key={point}
            className="rounded-[var(--radius-md)] bg-background px-3 py-2 text-xs font-semibold uppercase tracking-wide text-brand-800"
          >
            {point}
          </span>
        ))}
      </div>
    </Card>
  );
}
