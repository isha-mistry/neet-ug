"use client";

import { FreeCounsellingLeadForm } from "@/components/features/leads/FreeCounsellingLeadForm";
import { AdmissionInfo } from "@/components/features/colleges/detail/AdmissionInfo";
import { SeatMatrixInfo } from "@/components/features/colleges/detail/SeatMatrixInfo";
import { FeesAndBondInfo } from "@/components/features/colleges/detail/FeesAndBondInfo";
import { CollegeClinicalInfo } from "@/components/features/colleges/detail/CollegeClinicalInfo";
import { CollegeCounsellingPath } from "@/components/features/colleges/detail/CollegeCounsellingPath";
import { CollegeDecisionSnapshot } from "@/components/features/colleges/detail/CollegeDecisionSnapshot";
import { CollegeDetailComparePanel } from "@/components/features/colleges/detail/CollegeDetailComparePanel";
import { CollegeDetailCtaBand } from "@/components/features/colleges/detail/CollegeDetailCtaBand";
import { CollegeDetailRelated } from "@/components/features/colleges/detail/CollegeDetailRelated";
import { CollegeDetailQuickLinks } from "@/components/features/colleges/detail/CollegeDetailQuickLinks";
import { CollegeDetailSectionNav } from "@/components/features/colleges/detail/CollegeDetailSectionNav";
import { CounsellingScopeBar } from "@/components/features/colleges/detail/CounsellingScopeBar";
import { CounsellingScopeProvider } from "@/components/features/colleges/detail/CounsellingScopeContext";
import type { CollegeDetailViewModel } from "@/types/detail";
import type { CollegeRecord } from "@/types/college";

export function CollegeDetailFacts({
  college,
  related,
  showSeats,
  counsellingPageLabel,
  counsellingFormClass,
}: {
  college: CollegeDetailViewModel;
  related: CollegeRecord[];
  showSeats: boolean;
  counsellingPageLabel: string;
  counsellingFormClass: string;
}) {
  return (
    <CounsellingScopeProvider
      cutoffs={college.cutoffs}
      fees={college.fees}
      seatMatrix={college.seatMatrix}
      mccSeatMatrix={college.mccSeatMatrix}
      stateSlug={college.stateSlug}
    >
      <div className="flex flex-col gap-4 xl:hidden">
        <FreeCounsellingLeadForm
          pageLabel={counsellingPageLabel}
          title="Book free counselling"
          submitLabel="Book counselling"
          fields="name-phone-only"
          className={counsellingFormClass}
        />
        <CollegeDetailComparePanel
          slug={college.slug}
          collegeName={college.name}
        />
      </div>

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_320px] xl:items-start xl:gap-10">
        <div className="flex min-w-0 flex-col gap-10">
          <CollegeDecisionSnapshot college={college} />

          <CounsellingScopeBar />

          <div id="admission" className="scroll-mt-28 flex flex-col gap-10">
            <AdmissionInfo
              seatCount={college.seatCount}
              cutoffs={college.cutoffs}
              stateSlug={college.stateSlug}
            />
          </div>

          {(college.seatMatrix ?? college.mccSeatMatrix) ? (
            <div id="seats" className="scroll-mt-28">
              <SeatMatrixInfo
                seatMatrix={college.seatMatrix ?? college.mccSeatMatrix!}
                mccSeatMatrix={college.mccSeatMatrix}
                stateSlug={college.stateSlug}
              />
            </div>
          ) : null}

          <div id="fees" className="scroll-mt-28">
            <FeesAndBondInfo
              fees={college.fees}
              bond={college.bond}
              stateSlug={college.stateSlug}
            />
          </div>

          <CollegeClinicalInfo
            infrastructure={college.infrastructure}
            collegeName={college.name}
          />

          <CollegeCounsellingPath
            collegeName={college.name}
            stateName={college.stateName}
            stateSlug={college.stateSlug}
            seatMatrix={college.seatMatrix}
          />

          <CollegeDetailCtaBand collegeName={college.name} />
        </div>

        <aside className="hidden flex-col gap-4 xl:sticky xl:top-24 xl:flex">
          <FreeCounsellingLeadForm
            pageLabel={counsellingPageLabel}
            title="Book free counselling"
            submitLabel="Book counselling"
            fields="name-phone-only"
            className={counsellingFormClass}
          />
          <CollegeDetailComparePanel
            slug={college.slug}
            collegeName={college.name}
          />
          <CollegeDetailSectionNav showSeats={showSeats} variant="sidebar" />
          <CollegeDetailRelated peers={related} />
          <CollegeDetailQuickLinks
            stateName={college.stateName}
            stateSlug={college.stateSlug}
          />
        </aside>
      </div>

      <div className="flex flex-col gap-4 xl:hidden">
        <CollegeDetailRelated peers={related} />
        <CollegeDetailQuickLinks
          stateName={college.stateName}
          stateSlug={college.stateSlug}
        />
      </div>
    </CounsellingScopeProvider>
  );
}
