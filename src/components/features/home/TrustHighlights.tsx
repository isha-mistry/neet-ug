import { Card } from "@/components/ui/Card";
import { resolveIcon } from "./iconMap";
import type { HomeContent } from "@/types/site";

interface TrustHighlightsProps {
  content: HomeContent["trustHighlights"];
}

export function TrustHighlights({ content }: TrustHighlightsProps) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex max-w-2xl flex-col gap-3">
        <span className="text-xs font-semibold uppercase tracking-widest text-brand-700">
          Trust &amp; Clarity
        </span>
        <h2 className="text-2xl font-bold tracking-tight text-text md:text-3xl">
          {content.title}
        </h2>
        <p className="text-base leading-relaxed text-text-secondary">
          {content.description}
        </p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {content.items.map((item) => {
          const Icon = resolveIcon(item.icon);
          return (
            <Card
              key={item.id}
              padded
              bordered
              className="flex flex-col gap-4"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] ms-gradient-strong text-text-on-brand">
                <Icon aria-hidden="true" className="h-5 w-5" />
              </span>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold uppercase tracking-widest text-text-muted">
                  {item.label}
                </span>
                <span className="text-2xl font-bold tracking-tight text-text">
                  {item.value}
                </span>
                <span className="text-sm tracking-wide text-text-muted">
                  {item.caption}
                </span>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
