import { MaterialSymbol } from "@/components/common/MaterialSymbol";
import { cn } from "@/lib/utils";

interface DetailSectionHeaderProps {
  title: string;
  description: string;
  eyebrow?: string;
  icon?: string;
  className?: string;
  id?: string;
  /** @deprecated Appearance is unified; kept for call-site compatibility */
  theme?: "brand" | "secondary" | "indigo" | "emerald";
}

export function DetailSectionHeader({
  title,
  description,
  eyebrow,
  icon,
  className,
  id,
}: DetailSectionHeaderProps) {
  return (
    <header className={cn("flex flex-col gap-3", className)}>
      {eyebrow ? <span className="rp-eyebrow">{eyebrow}</span> : null}
      <div className="flex items-start gap-3.5">
        {icon ? (
          <span className="rp-fhead-ic mt-0.5" aria-hidden>
            <MaterialSymbol name={icon} className="text-[22px]" />
          </span>
        ) : null}
        <div className="min-w-0 flex flex-col gap-1.5">
          <h2
            id={id}
            className="text-xl font-extrabold tracking-tight text-on-surface md:text-2xl"
          >
            {title}
          </h2>
          <p className="max-w-2xl text-sm leading-relaxed text-on-surface-variant">
            {description}
          </p>
        </div>
      </div>
    </header>
  );
}
