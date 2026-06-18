import { CollegeCoverPhoto } from "@/components/features/colleges/shared/CollegeCoverPhoto";
import { AiGeneratedCoverBadge } from "@/components/features/colleges/shared/AiGeneratedCoverBadge";
import { getCollegeCoverImageUrl, hasUploadedCollegePhoto } from "@/lib/colleges/cover-images";
import { CollegeTypeBadge } from "@/components/features/colleges/shared/CollegeTypeBadge";
import { RuralBondBadge } from "@/components/features/colleges/shared/RuralBondBadge";
import { Button } from "@/components/ui/Button";
import type { CollegeBond, CollegeSeatMatrix, CollegeType } from "@/types/college";
import { cn, formatNumber } from "@/lib/utils";
import { MaterialSymbol } from "@/components/common/MaterialSymbol";

interface CollegeDetailHeaderProps {
  slug: string;
  name: string;
  city: string;
  stateName: string;
  collegeType: CollegeType;
  quotaInfo: string;
  seatMatrix?: CollegeSeatMatrix;
  officialWebsite?: string;
  counsellingBrochureUrl?: string;
  bond: CollegeBond;
  seatCount: number;
  universityName?: string;
  nirfMedicalRank?: number;
  nirfRankingYear?: number;
}

function accentClass(type: CollegeType): string {
  switch (type) {
  case "government":
  case "aiims":
    return "bg-college-accent-government";
  case "deemed":
    return "bg-college-accent-deemed";
  case "private":
    return "bg-college-accent-private";
  default:
    return "bg-college-accent-deemed";
  }
}

function isValidExternalUrl(url: string | undefined): url is string {
  if (!url?.trim()) return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}

export function CollegeDetailHeader({
  slug,
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
  universityName,
  nirfMedicalRank,
  nirfRankingYear,
}: CollegeDetailHeaderProps) {
  const showWebsite = isValidExternalUrl(officialWebsite);
  const showBrochure = isValidExternalUrl(counsellingBrochureUrl);
  const coverSrc = getCollegeCoverImageUrl(slug, "detail");
  const isUploadedPhoto = hasUploadedCollegePhoto(slug);

  const quotaLine = seatMatrix
    ? [
      seatMatrix.aiq > 0 ? `AIQ ${seatMatrix.aiq}` : "",
      seatMatrix.stateQuota > 0 ? `State ${seatMatrix.stateQuota}` : "",
      seatMatrix.esic > 0 ? `ESIC ${seatMatrix.esic}` : "",
      seatMatrix.management > 0 ? `MQ ${seatMatrix.management}` : "",
      seatMatrix.nri > 0 ? `NRI ${seatMatrix.nri}` : "",
    ]
      .filter(Boolean)
      .join(" · ") || quotaInfo
    : quotaInfo;

  return (
    <header className="relative flex flex-col overflow-hidden rounded-2xl border border-outline-variant bg-surface-container-lowest shadow-[0_12px_40px_-16px_color-mix(in_srgb,var(--color-primary)_18%,transparent)] md:flex-row">
      <span
        className={cn("absolute left-0 top-0 z-10 h-full w-1.5", accentClass(collegeType))}
        aria-hidden
      />
      <div className="relative w-full shrink-0 md:w-[260px] lg:w-[300px]">
        <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[220px] md:h-full">
          <CollegeCoverPhoto
            src={coverSrc}
            alt={isUploadedPhoto ? `${name} campus` : `Illustration for ${name}`}
            sizes="(max-width: 768px) 100vw, 300px"
            priority
            className="absolute inset-0"
            imageClassName="transition-transform duration-500 hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/10" />
          {!isUploadedPhoto ? <AiGeneratedCoverBadge /> : null}
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between gap-6 p-6 md:p-8">
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-fixed px-3 py-1 text-label-sm font-semibold text-on-primary-fixed">
              <MaterialSymbol name="school" className="text-sm" />
              {stateName}
            </span>
            <CollegeTypeBadge type={collegeType} />
            {nirfMedicalRank != null ? (
              <span className="inline-flex items-center gap-1 rounded-full border border-outline-variant bg-surface-container-low px-2.5 py-0.5 text-xs font-bold text-on-surface">
                <MaterialSymbol name="military_tech" className="text-sm text-primary" />
                NIRF #{nirfMedicalRank}
                {nirfRankingYear ? ` · ${nirfRankingYear}` : ""}
              </span>
            ) : null}
          </div>

          <h1 className="text-2xl font-extrabold leading-tight tracking-tight text-on-surface md:text-3xl">
            {name}
          </h1>

          {universityName ? (
            <p className="text-sm font-medium text-on-surface-variant">{universityName}</p>
          ) : null}

          <p className="inline-flex items-center gap-1.5 text-sm font-semibold text-on-surface-variant md:text-base">
            <MaterialSymbol name="location_on" className="text-lg text-primary" />
            {city}, {stateName}
          </p>

          <p className="text-xs font-semibold text-on-surface-variant md:text-sm">
            <span className="text-on-surface-variant/80">Quota seats · </span>
            <span className="text-primary">{quotaLine}</span>
            {bond.years > 0 ? (
              <span className="mt-2 flex items-center gap-2 border-t border-outline-variant/60 pt-2 md:mt-0 md:inline md:border-0 md:pt-0 md:pl-4">
                <span className="text-on-surface-variant/80">Bond · </span>
                <RuralBondBadge bond={bond} />
              </span>
            ) : null}
          </p>
        </div>

        <div className="flex flex-col gap-5 border-t border-outline-variant/80 pt-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
              Total intake
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-4xl font-black tracking-tight text-on-surface">
                {formatNumber(seatCount)}
              </span>
              <span className="text-sm font-bold text-on-surface-variant">seats</span>
            </div>
          </div>

          {(showWebsite || showBrochure) && (
            <div className="flex flex-wrap gap-2">
              {showWebsite ? (
                <Button
                  as="link"
                  href={officialWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                  leadingIcon={<MaterialSymbol name="open_in_new" className="text-lg" />}
                >
                  Official site
                </Button>
              ) : null}
              {showBrochure ? (
                <Button
                  as="link"
                  href={counsellingBrochureUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  size="sm"
                  className="rounded-full"
                  leadingIcon={<MaterialSymbol name="download" className="text-lg" />}
                >
                  Brochure
                </Button>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
