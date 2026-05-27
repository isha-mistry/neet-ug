import { FiMapPin } from "react-icons/fi";
import { CollegeTypeBadge } from "@/components/features/colleges/shared/CollegeTypeBadge";

interface CollegeDetailHeaderProps {
  name: string;
  city: string;
  stateName: string;
  collegeType: "government" | "private" | "deemed" | "aiims";
}

export function CollegeDetailHeader({
  name,
  city,
  stateName,
  collegeType,
}: CollegeDetailHeaderProps) {
  return (
    <header className="flex flex-col gap-3 rounded-[var(--radius-xl)] border border-border bg-surface-elevated p-6 ms-gradient-wash md:p-8">
      <CollegeTypeBadge type={collegeType} />
      <h1 className="text-3xl font-bold tracking-tight text-text md:text-4xl">
        {name}
      </h1>
      <p className="inline-flex items-center gap-2 text-sm tracking-wide text-text-secondary md:text-base">
        <FiMapPin aria-hidden="true" />
        <span>
          {city}, {stateName}
        </span>
      </p>
    </header>
  );
}
