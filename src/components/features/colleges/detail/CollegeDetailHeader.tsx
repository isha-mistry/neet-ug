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
    <header className="ms-detail-header">
      {/* 1. Left-most Column: Flush Image (No padding, occupies full height on desktop) */}
      <div className="ms-detail-header-img-wrapper">
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
      <div className="ms-detail-header-info">
        <div>
          <CollegeTypeBadge type={collegeType} />
        </div>
        
        {/* Lighter, extremely premium gray and bold font weight */}
        <h1 className="ms-detail-header-title">
          {name}
        </h1>
        
        <div className="ms-detail-header-meta">
          <p className="inline-flex items-center gap-1.5">
            <FiMapPin style={{ color: "var(--color-primary)" }} aria-hidden="true" />
            <span>{city}, {stateName}</span>
          </p>
          <div className="ms-detail-header-meta-row">
            <p>
              Quota Seats: <span className="font-bold" style={{ color: "var(--color-brand-700)" }}>{quotaInfo}</span>
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
      <div className="ms-detail-header-seats-col">
        <span className="ms-detail-header-seats-title">Total Intake</span>
        <div className="ms-detail-header-seats-value-container">
          <span className="ms-detail-header-seats-val">
            {formatNumber(seatCount)}
          </span>
          <span className="ms-detail-header-seats-lbl">Seats</span>
        </div>
      </div>

      {/* 4. Right-most Column: Action Buttons */}
      <div className="ms-detail-header-actions-col">
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
