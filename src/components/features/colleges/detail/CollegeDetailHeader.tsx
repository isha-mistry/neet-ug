import { FiMapPin, FiExternalLink, FiDownload } from "react-icons/fi";
import { CollegeTypeBadge } from "@/components/features/colleges/shared/CollegeTypeBadge";
import { RuralBondBadge } from "@/components/features/colleges/shared/RuralBondBadge";
import { Button } from "@/components/ui/Button";
import type { CollegeBond } from "@/types/college";
import { formatNumber } from "@/lib/utils";
import Image from "next/image";

interface CollegeDetailHeaderProps {
  name: string;
  city: string;
  stateName: string;
  collegeType: "government" | "private" | "deemed" | "aiims";
  quotaInfo: string;
  officialWebsite?: string;
  counsellingBrochureUrl?: string;
  bond: CollegeBond;
  seatCount: number;
}

export function CollegeDetailHeader({
  name,
  city,
  stateName,
  collegeType,
  quotaInfo,
  officialWebsite,
  counsellingBrochureUrl,
  bond,
  seatCount,
}: CollegeDetailHeaderProps) {
  return (
    <header className="flex flex-col md:flex-row md:items-stretch justify-between rounded-3xl border border-border bg-surface-container-lowest overflow-hidden shadow-xs min-h-[160px]">
      {/* 1. Left-most Column: Flush Image (No padding, occupies full height on desktop) */}
      <div className="relative w-full md:w-60 lg:w-80 shrink-0 overflow-hidden">
        <Image
          src="/brand/college_building.png"
          alt={`${name} Campus`}
          fill
          sizes="(max-width: 768px) 100vw, 288px"
          priority
          className="object-cover hover:scale-105 transition-transform duration-700"
        />
      </div>

      {/* 2. Middle Column: College Details (Spaced beautifully with refined typography) */}
      <div className="flex-1 flex flex-col justify-center gap-2 p-6 md:px-8">
        <div>
          <CollegeTypeBadge type={collegeType} />
        </div>
        
        {/* Lighter, extremely premium gray and bold font weight */}
        <div className="font-semibold text-2xl md:text-3xl lg:text-4xl text-text leading-tight tracking-tight">
          {name}
        </div>
        
        <div className="flex flex-col gap-1.5 mt-1 text-sm md:text-base text-text-secondary font-medium">
          <p className="inline-flex items-center gap-1.5">
            <FiMapPin className="text-primary" aria-hidden="true" />
            <span>{city}, {stateName}</span>
          </p>
          <div className="flex items-center gap-4 flex-wrap text-xs text-text-muted">
            <p>
              Quota Seats: <span className="font-bold text-brand-700">{quotaInfo}</span>
            </p>
            {bond && (
              <div className="flex items-center gap-2 border-l border-border pl-4">
                <span>Rural Bond:</span>
                <RuralBondBadge bond={bond} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. Seats Column: College seats data shown on the left side of the right-hand area */}
      <div className="flex flex-row md:flex-col justify-between md:justify-center items-center md:items-start p-6 border-t md:border-t-0 md:border-l border-border bg-surface-container-low/10 min-w-[140px] gap-2">
        <span className="text-[10px] font-black uppercase tracking-wider text-text-muted">Total Intake</span>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-black text-brand-600 leading-none">
            {formatNumber(seatCount)}
          </span>
          <span className="text-xs font-bold text-text-secondary">Seats</span>
        </div>
      </div>

      {/* 4. Right-most Column: Action Buttons */}
      <div className="flex flex-row md:flex-col gap-3 p-6 border-t md:border-t-0 md:border-l border-border bg-surface-container-low min-w-[210px] justify-center">
        <Button
          as="link"
          href={officialWebsite || ""}
          target="_blank"
          rel="noopener noreferrer"
          variant="outline"
          className="h-10 px-4 text-xs font-semibold flex-1 md:flex-none justify-center"
          leadingIcon={<FiExternalLink />}
        >
          Official Website
        </Button>
        <Button
          as="link"
          href={counsellingBrochureUrl || ""}
          target="_blank"
          rel="noopener noreferrer"
          variant="primary"
          className="h-10 px-4 text-xs font-semibold flex-1 md:flex-none justify-center"
          leadingIcon={<FiDownload />}
        >
          Counselling Brochure
        </Button>
      </div>
    </header>
  );
}
