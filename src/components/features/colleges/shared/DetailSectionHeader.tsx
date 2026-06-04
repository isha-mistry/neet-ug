import { cn } from "@/lib/utils";

interface DetailSectionHeaderProps {
  title: string;
  description: string;
  theme?: "brand" | "indigo" | "emerald";
  className?: string;
}

const themeClasses = {
  brand: "ms-section-header-brand",
  indigo: "ms-section-header-indigo",
  emerald: "ms-section-header-emerald",
};

export function DetailSectionHeader({
  title,
  description,
  theme = "brand",
  className,
}: DetailSectionHeaderProps) {
  return (
    <div className={cn("ms-section-header", themeClasses[theme], className)}>
      <div className="flex flex-col gap-0.5">
        <h2 className="ms-section-header-title">
          {title}
        </h2>
        <p className="ms-section-header-description">
          {description}
        </p>
      </div>
    </div>
  );
}
