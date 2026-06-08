import { FiMapPin, FiExternalLink, FiDownload } from "react-icons/fi";
import { CollegeTypeBadge } from "@/components/features/colleges/shared/CollegeTypeBadge";
import { RuralBondBadge } from "@/components/features/colleges/shared/RuralBondBadge";
import { Button } from "@/components/ui/Button";
import type { CollegeBond, CollegeSeatMatrix } from "@/types/college";
import { formatNumber } from "@/lib/utils";
import Image from "next/image";

interface CollegeDetailHeaderProps {
  name: string;
  city: string;
  stateName: string;
  collegeType: "government" | "private" | "deemed" | "aiims";
  quotaInfo: string;
  seatMatrix?: CollegeSeatMatrix;
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
  seatMatrix,
  officialWebsite,
  counsellingBrochureUrl,
  bond,
  seatCount,
}: CollegeDetailHeaderProps) {
  return (
    <header className="flex flex-col md:flex-row rounded-3xl border border-border bg-surface-container-lowest overflow-hidden shadow-level-1">
      {/* 1. Left Column: Campuses building image */}
      <div className="relative w-full md:w-[260px] lg:w-[320px] shrink-0 aspect-video md:aspect-auto">
        <Image
          src="/brand/college_building.png"
          alt={`${name} Campus`}
          fill
          sizes="(max-width: 768px) 100vw, 320px"
          priority
          className="object-cover hover:scale-102 transition-transform duration-700"
        />
      </div>

      {/* 2. Right Column: Content Area */}
      <div className="flex-grow flex flex-col justify-between p-6 md:p-8">
        {/* Top Content Row: Type, Title, Location, Quota/Bond Meta */}
        <div className="flex flex-col gap-3">
          <div>
            <CollegeTypeBadge type={collegeType} />
          </div>
          
          <h1 className="font-extrabold text-2xl md:text-3xl text-text leading-tight tracking-tight">
            {name}
          </h1>
          
          <div className="flex items-center gap-1.5 text-sm md:text-base text-text-secondary font-semibold">
            <FiMapPin className="text-primary flex-shrink-0" />
            <span>{city}, {stateName}</span>
          </div>

          <div className="flex items-center gap-5 flex-wrap text-xs md:text-sm font-semibold text-text-muted mt-1">
            <p className="flex items-center gap-1.5">
              <span className="text-text-muted font-semibold">Quota Seats:</span>
              <span className="text-brand-700 font-extrabold">
                {seatMatrix
                  ? [
                      seatMatrix.aiq > 0 ? `AIQ: ${seatMatrix.aiq}` : "",
                      seatMatrix.stateQuota > 0 ? `State: ${seatMatrix.stateQuota}` : "",
                    ]
                      .filter(Boolean)
                      .join(" / ") || quotaInfo
                  : quotaInfo}
              </span>
            </p>
            {bond && (
              <div className="flex items-center gap-2.5 border-l border-border pl-5">
                <span className="text-text-muted font-semibold">Rural Bond:</span>
                <RuralBondBadge bond={bond} />
              </div>
            )}
          </div>
        </div>

        {/* Divider matching Image 1 */}
        <hr className="border-t border-border/80 my-5" />

        {/* Bottom Content Row: Total Intake on left, action buttons on right */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5">
          {/* Total Intake Counter */}
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-black uppercase tracking-wider text-text-muted">TOTAL INTAKE</span>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black text-text tracking-tight">
                {formatNumber(seatCount)}
              </span>
              <span className="text-sm font-bold text-text-secondary">Seats</span>
            </div>
          </div>

          {/* Action Buttons styled as rounded pill buttons */}
          <div className="flex items-center gap-3 flex-wrap">
            <Button
              as="link"
              href={officialWebsite || ""}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              className="h-10 px-5 text-xs font-bold rounded-full flex items-center justify-center gap-1.5"
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
              className="h-10 px-5 text-xs font-bold rounded-full flex items-center justify-center gap-1.5 bg-zinc-950 text-white hover:bg-zinc-800 border-none transition-all"
              leadingIcon={<FiDownload />}
            >
              Counselling Brochure
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
