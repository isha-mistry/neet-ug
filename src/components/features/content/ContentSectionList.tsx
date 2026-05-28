import { Card } from "@/components/ui/Card";
import type { ContentSection } from "@/types/content";

interface ContentSectionListProps {
  sections: ContentSection[];
}

export function ContentSectionList({ sections }: ContentSectionListProps) {
  return (
    <div className="flex flex-col gap-6">
      {sections.map((section) => (
        <Card 
          key={section.heading} 
          padded 
          bordered
          className="group transition-all duration-300 hover:shadow-[0_12px_24px_rgba(13,39,80,0.06)] bg-white/70 backdrop-blur-sm"
        >
          <h2 className="text-2xl font-bold tracking-tight text-text group-hover:text-brand-900 transition-colors">
            {section.heading}
          </h2>
          {section.body ? (
            <p className="mt-3 text-base leading-relaxed text-text-secondary">
              {section.body}
            </p>
          ) : null}
          {section.points?.length ? (
            <ul className="mt-4 space-y-3">
              {section.points.map((point) => (
                <li
                  key={point}
                  className="rounded-[var(--radius-lg)] bg-surface-muted/50 px-4 py-3 text-base leading-relaxed text-text-secondary border border-border/50 shadow-sm transition-colors hover:bg-surface-muted"
                >
                  {point}
                </li>
              ))}
            </ul>
          ) : null}
        </Card>
      ))}
    </div>
  );
}
