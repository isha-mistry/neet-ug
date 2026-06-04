import { cn } from "@/lib/utils";

interface DetailSectionHeaderProps {
  title: string;
  description: string;
  theme?: "brand" | "indigo" | "emerald";
  className?: string;
}

const themeClasses = {
  brand: "border-primary",
  indigo: "border-indigo-500",
  emerald: "border-emerald-500",
};

export function DetailSectionHeader({
  title,
  description,
  theme = "brand",
  className,
}: DetailSectionHeaderProps) {
  return (
    <div className={cn("flex items-center border-l-4 pl-4 py-0.5", themeClasses[theme], className)}>
      <div className="flex flex-col gap-0.5">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-text leading-relaxed">
          {title}
        </h2>
        <p className="text-xs text-text-muted">
          {description}
        </p>
      </div>
    </div>
  );
}
