export interface CounselingEvent {
  id: string;
  roundName: string;
  dateRange: string;
  action: string;
  status: "upcoming" | "live" | "closed" | "done";
  stateTag?: string;
  details?: string;
}

/** Academic session shown in the cutoff analyser counseling section. */
export const COUNSELING_SESSION_YEAR = 2026;

/**
 * MCC has not published NEET-UG 2026 AIQ dates yet (checked mcc.nic.in, Jun 2026).
 * AIQ / stray dates below follow the official MCC NEET-UG 2025 schedule
 * (notice dated 23 Oct 2025), shifted by one calendar year.
 */
export const COUNSELING_TIMELINE_DISCLAIMER =
  "NEET (UG)-2026 is scheduled on 21 June 2026 (NTA). MCC has not published a 2026 UG counselling schedule yet; AIQ Round 1 and stray dates below use the official MCC 2025 timetable spacing applied after an indicative August 2026 result. State Round 1 windows follow the same 2025-cycle pattern—always confirm on MCC and your state admission portal.";

const MCC_2025_SCHEDULE_PDF =
  "https://cdnbbsr.s3waas.gov.in/s3e0f7a4d0ef9b84b83b693bbf3feb8e6e/uploads/2025/10/20251028122896423.pdf";

type TimelineSeed = {
  id: string;
  roundName: string;
  action: string;
  stateTag?: string;
  details?: string;
  /** Inclusive start (local date). */
  start: string;
  /** Inclusive end; omit for single-day events. */
  end?: string;
};

function parseLocalDate(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d, 0, 0, 0, 0);
}

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function formatDateRange(start: string, end?: string): string {
  const startDate = parseLocalDate(start);
  const fmt = new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  if (!end || end === start) {
    return fmt.format(startDate);
  }
  const endDate = parseLocalDate(end);
  const sameYear = startDate.getFullYear() === endDate.getFullYear();
  const sameMonth = sameYear && startDate.getMonth() === endDate.getMonth();
  const startFmt = new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    ...(sameYear ? {} : { year: "numeric" }),
  });
  const endFmt = new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  if (sameMonth) {
    return `${startDate.getDate()}–${endFmt.format(endDate)}`;
  }
  return `${startFmt.format(startDate)} – ${endFmt.format(endDate)}`;
}

function resolveStatus(
  start: string,
  end: string | undefined,
  asOf: Date
): CounselingEvent["status"] {
  const today = startOfDay(asOf);
  const startDate = startOfDay(parseLocalDate(start));
  const endDate = startOfDay(parseLocalDate(end ?? start));

  if (today < startDate) return "upcoming";
  if (today > endDate) return "done";
  return "live";
}

function toEvent(seed: TimelineSeed, asOf: Date): CounselingEvent {
  const { start, end, ...rest } = seed;
  return {
    ...rest,
    dateRange: formatDateRange(start, end),
    status: resolveStatus(start, end, asOf),
  };
}

/** Static seeds — dates in ISO (YYYY-MM-DD), Asia/Kolkata-oriented copy. */
const TIMELINE_SEEDS: TimelineSeed[] = [
  {
    id: "neet-exam",
    roundName: "NEET (UG)-2026 examination",
    start: "2026-06-21",
    action: "Appear for NEET (UG)-2026 as per NTA admit card",
    details: "Official exam date from NTA (neet.nta.nic.in).",
  },
  {
    id: "neet-result",
    roundName: "NEET (UG)-2026 result & scorecard",
    start: "2026-08-03",
    action: "Download scorecard and AIR from NTA when declared",
    details:
      "Indicative: NTA declared NEET (UG)-2025 results on 16 Jun 2025 (~43 days after the 4 May 2025 exam). Same lag applied after 21 Jun 2026 until NTA publishes 2026 dates.",
  },
  {
    id: "mcc-r1-reg",
    roundName: "MCC AIQ Round 1 — registration & choice filling",
    start: "2026-09-07",
    end: "2026-09-22",
    action: "Register on mcc.nic.in, pay fee, fill and lock choices (check lock window in notice)",
    stateTag: "AIQ",
    details: `Indicative spacing from 2025: registration opened 35 days after the 2025 result (21 Jul 2025). 2025 official window: 21 Jul–6 Aug 2025. ${MCC_2025_SCHEDULE_PDF}`,
  },
  {
    id: "gj-r1",
    roundName: "Gujarat state quota — Round 1",
    start: "2026-09-07",
    end: "2026-09-20",
    action: "Register on the Gujarat medical admission portal; fill state choices",
    stateTag: "GJ",
    details:
      "Indicative from 2025 cycle timing (usually opens in the same band as MCC Round 1). Confirm on the official Gujarat admission portal.",
  },
  {
    id: "rj-r1",
    roundName: "Rajasthan state quota — Round 1",
    start: "2026-09-10",
    end: "2026-09-22",
    action: "Register and fill choices on the Rajasthan NEET UG state portal",
    stateTag: "RJ",
    details:
      "Indicative from 2025 cycle timing. Confirm on the official Rajasthan medical admission portal.",
  },
  {
    id: "mp-r1",
    roundName: "Madhya Pradesh state quota — Round 1",
    start: "2026-09-15",
    end: "2026-09-25",
    action: "Choice filling on MP DME / MPOnline counselling portal",
    stateTag: "MP",
    details:
      "Indicative from 2025 cycle timing. Confirm on dme.mponline.gov.in.",
  },
  {
    id: "mh-r1",
    roundName: "Maharashtra state quota — Round 1",
    start: "2026-09-18",
    end: "2026-09-28",
    action: "Register on State CET Cell admission portal and fill preferences",
    stateTag: "MH",
    details:
      "Indicative from 2025 cycle timing. Confirm on cetcell.mahacet.org.",
  },
  {
    id: "mcc-r1-result",
    roundName: "MCC AIQ Round 1 — seat allotment result",
    start: "2026-10-05",
    action: "Review allotment; decide on reporting or upgradation in Round 2",
    stateTag: "AIQ",
    details:
      "Indicative spacing from 2025: allotment result 13 Aug 2025 (~23 days after registration opened). Official 2025 date in MCC schedule PDF.",
  },
  {
    id: "doc-verify",
    roundName: "Document verification (state & institute reporting)",
    start: "2026-10-01",
    end: "2026-10-12",
    action: "Carry originals and copies to the verification centre or allotted college",
    details:
      "Typical window after first allotments; exact dates vary by state and round.",
  },
  {
    id: "mcc-r1-reporting",
    roundName: "MCC AIQ Round 1 — reporting, fee deposit & seat acceptance",
    start: "2026-10-06",
    end: "2026-10-14",
    action: "Report to allotted institute, pay fees, and accept the seat before the deadline",
    stateTag: "AIQ",
    details:
      "Indicative spacing from 2025: reporting 14–22 Aug 2025 (MCC schedule PDF).",
  },
  {
    id: "mcc-stray",
    roundName: "MCC AIQ stray vacancy round",
    start: "2026-11-04",
    end: "2026-11-20",
    action: "Fresh registration on MCC if eligible seats remain",
    stateTag: "AIQ",
    details:
      "2025 reference: online stray vacancy round approx. 4–20 Nov 2025 (MCC schedule PDF), shown for the 2026 admission year.",
  },
];

export function getCounselingTimeline(asOf: Date = new Date()): CounselingEvent[] {
  return TIMELINE_SEEDS.map((seed) => toEvent(seed, asOf));
}

/** @deprecated Use getCounselingTimeline() for date-accurate status. */
export const COUNSELING_TIMELINE: CounselingEvent[] = getCounselingTimeline();

export const COUNSELING_STATUS_LABEL: Record<CounselingEvent["status"], string> = {
  upcoming: "Upcoming",
  live: "Open now",
  closed: "Closed",
  done: "Completed",
};
