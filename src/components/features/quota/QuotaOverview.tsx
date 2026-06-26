import Link from "next/link";
import {
  QuotaOverviewShell,
  QuotaInfoGrid,
  QuotaProcessList,
  QuotaTheoryPanel,
  QuotaSectionHeading,
} from "./QuotaShared";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge, type BadgeTone } from "@/components/ui/Badge";
import { quotaTheoryContent, quotaTypesOverviewData as quotaTypes } from "./content";

const keyGuidelines = [
  {
    icon: "app_registration",
    title: "Register only online",
    body: "Qualified candidates must register on www.mcc.nic.in for MCC counselling. MCC does not allot seats manually or by nomination.",
  },
  {
    icon: "fact_check",
    title: "Read every scheme question",
    body: "All counselling scheme questions are mandatory and should be understood before submitting the registration form.",
  },
  {
    icon: "verified",
    title: "Submission means acceptance",
    body: "Completing online registration confirms acceptance of the counselling scheme, terms and conditions.",
  },
  {
    icon: "language",
    title: "Use official portals",
    body: "Applications are accepted only through the notified online portals. Offline or unofficial modes are not valid.",
  },
];

const quotaComparisonRows = [
  {
    collegeType: "Government Colleges",
    aiq: "15% seats, no domicile",
    state: "85% seats, strict domicile",
    management: "Not applicable",
    nri: "Usually not applicable, except state-specific pools such as Rajasthan govt NRI seats",
  },
  {
    collegeType: "Private Medical Colleges",
    aiq: "Not applicable",
    state: "Varies by state and local-resident rules",
    management: "~35-50% depending on open or closed state rules",
    nri: "Up to 15% with sponsor and embassy-verified documents",
  },
  {
    collegeType: "Deemed Universities",
    aiq: "100% MCC counselling, no state domicile",
    state: "Not applicable",
    management: "Open management seats through MCC",
    nri: "NRI seats through MCC, usually open to eligible candidates nationally",
  },
];

const planningSignals = [
  { label: "Authority", value: "MCC vs State DME", icon: "account_balance" },
  { label: "Proof", value: "Domicile, category, NRI", icon: "badge" },
  { label: "Budget", value: "Govt, private, deemed", icon: "payments" },
  { label: "Timing", value: "Parallel registrations", icon: "schedule" },
];

const getBadgeTone = (slug: string): BadgeTone => {
  switch (slug) {
    case "all-india":
      return "brand";
    case "state":
      return "brand";
    case "management":
      return "warn";
    case "nri":
      return "safe";
    case "deemed":
      return "neutral";
    case "special":
      return "brand";
    default:
      return "neutral";
  }
};

const getCardIcon = (slug: string) => {
  switch (slug) {
    case "all-india": return "public";
    case "state": return "location_on";
    case "management": return "payments";
    case "nri": return "language";
    case "deemed": return "account_balance";
    case "special": return "award_star";
    default: return "school";
  }
};

const QUOTA_OVERVIEW_JUMP_SECTIONS = [
  { id: "decision-signals", label: "Decision Signals" },
  { id: "primer", label: "Theory Primer" },
  { id: "seat-sharing", label: "Seat Sharing" },
  { id: "quota-types", label: "Quota Directory" },
  { id: "rules", label: "Key Rules" },
  { id: "framework", label: "Choice Framework" },
];

export function QuotaOverview() {
  const header = (
    <section id="overview">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
        <div>
          <Badge tone="brand" icon={<span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>} className="mb-4">
            Medical admission guide
          </Badge>
          <h1 className="rp-hero-title max-w-3xl">
            Medical Admission <em>Quotas in India</em>
          </h1>
          <p className="rp-hero-lede max-w-3xl">
            Quotas decide the counselling authority, the seat pool you can access, document proof,
            fee category and round strategy. Use this page as the starting map before opening MCC,
            state, management, NRI or deemed university counselling choices.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              as="link"
              href="#quota-types"
              variant="primary"
              trailingIcon={<span className="material-symbols-outlined text-lg">arrow_downward</span>}
            >
              Compare quota types
            </Button>
            <Button
              as="link"
              href="/college-predictor"
              variant="secondary"
              trailingIcon={<span className="material-symbols-outlined text-lg">analytics</span>}
            >
              Check college fit
            </Button>
          </div>
        </div>
        <Card>
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-on-primary">
              <span className="material-symbols-outlined text-[28px]">hub</span>
            </span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary">Start here</p>
              <p className="text-sm font-bold leading-snug text-on-surface">
                Rank + domicile + category + budget = quota strategy
              </p>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            {[
              { value: "15%", label: "AIQ govt seats" },
              { value: "85%", label: "State govt seats" },
              { value: "MCC", label: "Central pools" },
              { value: "DME", label: "State pools" },
            ].map((stat) => (
              <Card key={stat.label} padded={false} className="p-3 shadow-sm border-outline-variant/40">
                <p className="text-2xl font-bold text-on-surface">{stat.value}</p>
                <p className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
                  {stat.label}
                </p>
              </Card>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );

  return (
    <QuotaOverviewShell
      header={header}
      sidebar={undefined}
      jumpSections={QUOTA_OVERVIEW_JUMP_SECTIONS}
    >
      <section id="decision-signals" className="space-y-6">
        <QuotaSectionHeading
          eyebrow="Decision signals"
          title="What changes when the "
          emphasis="quota changes?"
          description="The quota is not just a label. It changes the authority, proof documents, cutoff behaviour, fee category and the number of parallel forms you must track."
          className="mb-6"
        />
        <QuotaInfoGrid
          items={[
            {
              icon: "account_tree",
              title: "Quotas decide the authority",
              body: "AIQ and deemed seats run through MCC, while most state, management, and private seats run through state counselling bodies.",
            },
            {
              icon: "person_pin_circle",
              title: "Eligibility decides access",
              body: "Domicile, schooling, category, sponsor status, minority status, and institutional rules can expand or restrict the list of colleges you can actually choose.",
            },
            {
              icon: "query_stats",
              title: "Cutoff logic changes by pool",
              body: "A rank that is weak for AIQ can still be competitive in state, management, NRI, or special quota pools depending on eligibility and fee appetite.",
            },
          ]}
        />

        {/* Planning Checklist */}
        <Card>
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
            Planning checklist
          </span>
          <h2 className="mt-2 font-headline-md text-lg font-bold text-on-surface">
            Build your quota shortlist in this order
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {planningSignals.map((signal, idx) => (
              <div key={signal.label} className="flex gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-fixed text-primary font-bold text-sm">
                  {idx + 1}
                </span>
                <div>
                  <h3 className="text-sm font-bold text-on-surface">{signal.label}</h3>
                  <p className="mt-0.5 text-xs leading-relaxed text-on-surface-variant">{signal.value}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <div id="primer">
        <QuotaTheoryPanel className="h-full" {...quotaTheoryContent.quotaTheoryContent} />
      </div>

      <section id="seat-sharing">
        <div className="mb-6 grid gap-4 md:grid-cols-[minmax(0,1fr)_280px] md:items-end">
          <QuotaSectionHeading
            eyebrow="Seat matrix view"
            title="Seat-sharing ratio and "
            emphasis="eligibility summary"
            description="A quick comparison of how government, private and deemed colleges expose their seats across AIQ, state, management and NRI routes."
          />
        </div>
        <div className="rounded-xl border border-outline-variant/40 bg-primary-fixed px-4 py-3 mb-3 shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary">Read this first</p>
          <p className="mt-1 text-sm font-semibold leading-relaxed text-primary">
            Treat every percentage as a planning guide. Final seat matrix and eligibility are
            controlled by the latest MCC or state bulletin.
          </p>
        </div>
        <div className="quota-table-wrap">
          <table className="quota-table">
            <thead>
              <tr>
                <th className="pl-6">College type</th>
                <th>AIQ</th>
                <th>State quota</th>
                <th>Management</th>
                <th className="pr-6">NRI</th>
              </tr>
            </thead>
            <tbody>
              {quotaComparisonRows.map((row) => (
                <tr key={row.collegeType} className="hover:bg-surface-container-low/20 transition-colors duration-200">
                  <td className="pl-6 font-bold text-on-surface">
                    {row.collegeType}
                  </td>
                  <td>{row.aiq}</td>
                  <td>{row.state}</td>
                  <td>{row.management}</td>
                  <td className="pr-6 text-on-surface-variant">{row.nri}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="quota-types" className="scroll-mt-28">
        <div className="mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <QuotaSectionHeading
            eyebrow="Quota directory"
            title="Primary "
            emphasis="quota types"
            description="Scan seat share, counselling body, domicile rules and fee category before opening the detailed guide."
          />
          <Button
            as="link"
            href="/reneet-rank-predictor-2026"
            variant="secondary"
            size="sm"
            trailingIcon={<span className="material-symbols-outlined text-base">query_stats</span>}
          >
            Estimate rank fit
          </Button>
        </div>
        <Card padded={false} className="overflow-hidden">
          {/* Table Header for Desktop */}
          <div className="hidden md:grid md:grid-cols-[200px_100px_130px_110px_1fr_40px] md:gap-4 md:items-center md:px-5 md:py-3 border-b border-outline-variant/40 bg-surface-container-high/40 text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
            <div>Quota / Category</div>
            <div>Seats</div>
            <div>Counselling</div>
            <div>Domicile</div>
            <div>Fee Range</div>
            <div></div>
          </div>
          {quotaTypes.map((quota) => (
            <Link
              key={quota.slug}
              href={`/quota/${quota.slug}`}
              className="group grid grid-cols-2 gap-y-4 gap-x-2 border-b border-outline-variant/40 p-5 transition hover:bg-surface-container-low/45 last:border-b-0 md:grid-cols-[200px_100px_130px_110px_1fr_40px] md:items-center md:gap-4"
            >
              {/* Quota details (Name / Icon / Abbr) - Spans 2 cols on mobile, 1 col on desktop */}
              <div className="col-span-2 flex items-center gap-3 md:col-span-1">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-fixed text-primary transition group-hover:bg-primary group-hover:text-on-primary">
                  <span className="material-symbols-outlined text-[22px]">{getCardIcon(quota.slug)}</span>
                </span>
                <div>
                  <Badge tone={getBadgeTone(quota.slug)} className="mb-1">
                    {quota.abbreviation}
                  </Badge>
                  <h3 className="text-sm font-bold text-on-surface">{quota.name}</h3>
                </div>
              </div>

              {/* Seats */}
              <div className="col-span-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant md:hidden">Seats</span>
                <p className="mt-0.5 font-bold text-on-surface md:mt-0 text-sm md:text-body-sm">{quota.seats}</p>
              </div>

              {/* Counselling */}
              <div className="col-span-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant md:hidden">Counselling</span>
                <p className="mt-0.5 font-semibold text-on-surface-variant md:mt-0 text-sm md:text-body-sm">{quota.counseling}</p>
              </div>

              {/* Domicile */}
              <div className="col-span-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant md:hidden">Domicile</span>
                <p className="mt-0.5 font-semibold text-on-surface-variant md:mt-0 text-sm md:text-body-sm">
                  {quota.domicileStatus === "DOMICILE YES" ? "Required" : quota.domicileStatus === "NO DOMICILE" ? "Not required" : "Specific proof"}
                </p>
              </div>

              {/* Fee Range */}
              <div className="col-span-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant md:hidden">Fee range</span>
                <p className="mt-0.5 font-bold text-primary md:mt-0 text-sm md:text-body-sm">{quota.feeRange}</p>
              </div>

              {/* Arrow Icon */}
              <div className="col-span-2 flex justify-end md:col-span-1 md:block">
                <span className="hidden h-10 w-10 items-center justify-center rounded-full bg-surface-container-low text-primary transition group-hover:bg-primary group-hover:text-on-primary md:flex justify-self-end">
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </span>
                <span className="flex items-center gap-1 text-xs font-bold text-primary md:hidden">
                  View details <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </span>
              </div>
            </Link>
          ))}
        </Card>
      </section>

      <section id="rules" className="bg-linear-to-br from-primary to-primary-pressed rp-brand-elevated relative overflow-hidden rounded-[1.75rem] px-6 py-8 text-on-primary ring-1 ring-on-primary/15 md:px-10 md:py-10">
        <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
          <div>
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-on-primary/20">
              <span className="material-symbols-outlined text-2xl text-on-primary">assignment_turned_in</span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-on-primary/70">
              Rules before registration
            </span>
            <h2 className="mt-2 font-headline-md text-2xl font-bold tracking-tight md:text-3xl">
              Key rules and eligibility checks
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-on-primary/90 md:text-base">
              Before paying fees or filling choices, confirm the official registration mode,
              document proof, scheme acceptance and authority-specific instructions.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                as="link"
                href="/neet-ug-2026/counselling-guide"
                variant="inverse"
                leadingIcon={<span className="material-symbols-outlined text-lg">download</span>}
              >
                Full MCC guide
              </Button>
              <Button
                as="link"
                href="https://mcc.nic.in"
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                className="border-on-primary/40 text-on-primary hover:bg-on-primary/10 hover:border-on-primary/80 active:bg-on-primary/20"
                leadingIcon={<span className="material-symbols-outlined text-lg">language</span>}
              >
                Official MCC portal
              </Button>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {keyGuidelines.map((guideline) => (
              <div key={guideline.title} className="rounded-2xl bg-on-primary/10 p-4 backdrop-blur">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-on-primary/15">
                  <span className="material-symbols-outlined text-xl">{guideline.icon}</span>
                </span>
                <h3 className="mt-3 text-sm font-bold">{guideline.title}</h3>
                <p className="mt-1 text-sm leading-relaxed opacity-85">{guideline.body}</p>
              </div>
            ))}
          </div>
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-32 h-64 w-64 rounded-full bg-on-primary/5 blur-3xl"
        />
      </section>

      <div id="framework">
        <QuotaProcessList
          title="How to Choose Your Quota Path"
          subtitle="A quick framework before opening any counselling form."
          steps={[
            { title: "Start with mandatory eligibility", body: "List your domicile, category, PwD, minority, NRI sponsor, and schooling claims with proof documents." },
            { title: "Map counselling bodies", body: "Separate MCC choices from each state portal so you do not miss parallel registrations." },
            { title: "Build budget bands", body: "Mark government, state private, management, NRI, and deemed options by total payable cost." },
            { title: "Compare round behavior", body: "Study previous R1, R2, mop-up, and stray vacancy cutoffs because each quota behaves differently late in counselling." },
          ]}
        />
      </div>
    </QuotaOverviewShell>
  );
}
