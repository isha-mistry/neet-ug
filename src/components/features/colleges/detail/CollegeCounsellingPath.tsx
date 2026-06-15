import Link from "next/link";
import { MaterialSymbol } from "@/components/common/MaterialSymbol";
import { DetailSectionHeader } from "@/components/features/colleges/shared/DetailSectionHeader";
import { DetailPanel } from "@/components/features/colleges/shared/DetailPanel";
import type { CollegeSeatMatrix } from "@/types/college";

interface CollegeCounsellingPathProps {
  collegeName: string;
  stateName: string;
  stateSlug: string;
  seatMatrix?: CollegeSeatMatrix;
}

export function CollegeCounsellingPath({
  collegeName,
  stateName,
  stateSlug,
  seatMatrix,
}: CollegeCounsellingPathProps) {
  const hasAiq = (seatMatrix?.aiq ?? 0) > 0;
  const hasState = (seatMatrix?.stateQuota ?? 0) > 0;
  const hasMq = (seatMatrix?.management ?? 0) > 0 || (seatMatrix?.nri ?? 0) > 0;

  return (
    <section
      id="counselling"
      className="scroll-mt-28 flex flex-col gap-6"
    >
      <DetailSectionHeader
        eyebrow="Next steps"
        title="Counselling pathway"
        description={`How to target ${collegeName} through AIQ and ${stateName} state rounds`}
        icon="route"
      />
      <div className="grid gap-3 md:grid-cols-3">
        {hasAiq ? (
          <PathCard
            icon="public"
            title="MCC AIQ"
            body="All India Quota seats are allotted through MCC UG counselling. Register, pay fees, and fill choices with this college on your list."
            href="/neet-ug-2026/counselling-guide"
            linkLabel="MCC guide"
          />
        ) : null}
        {hasState ? (
          <PathCard
            icon="map"
            title={`${stateName} state quota`}
            body="State domicile or eligibility rules apply. Use your state merit rank alongside AIR when comparing cutoffs."
            href={`/mbbs-in-india/${stateSlug}`}
            linkLabel={`MBBS in ${stateName}`}
          />
        ) : null}
        {hasMq ? (
          <PathCard
            icon="business_center"
            title="Management / NRI"
            body="Private or deemed management seats have separate fee structures — confirm GQ vs MQ tuition in the fees section above."
            href={`/colleges/state/${stateSlug}`}
            linkLabel="More in this state"
          />
        ) : null}
      </div>
      {!hasAiq && !hasState && !hasMq ? (
        <DetailPanel className="text-sm text-on-surface-variant">
          Seat quota breakdown is limited for this college. Browse{" "}
          <Link href={`/colleges/state/${stateSlug}`} className="font-semibold text-primary">
            colleges in {stateName}
          </Link>{" "}
          or read the{" "}
          <Link href="/neet-ug-2026/counselling-guide" className="font-semibold text-primary">
            MCC counselling guide
          </Link>
          .
        </DetailPanel>
      ) : null}
    </section>
  );
}

function PathCard({
  icon,
  title,
  body,
  href,
  linkLabel,
}: {
  icon: string;
  title: string;
  body: string;
  href: string;
  linkLabel: string;
}) {
  return (
    <DetailPanel
      bodyClassName="flex h-full flex-col gap-3 transition-shadow hover:shadow-md"
    >
      <MaterialSymbol name={icon} className="text-2xl text-primary" />
      <h3 className="font-bold text-on-surface">{title}</h3>
      <p className="flex-1 text-sm leading-relaxed text-on-surface-variant">{body}</p>
      <Link
        href={href}
        className="inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline"
      >
        {linkLabel}
        <MaterialSymbol name="arrow_forward" className="text-base" />
      </Link>
    </DetailPanel>
  );
}
