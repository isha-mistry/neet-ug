import Link from "next/link";
import { QuotaOverviewShell, QuotaInfoGrid, QuotaProcessList, QuotaTheoryPanel } from "./QuotaShared";
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

const getBadgeClasses = (slug: string) => {
  switch (slug) {
  case "all-india":
    return "bg-blue-100 text-blue-700";
  case "state":
    return "bg-primary-container text-on-primary-container";
  case "management":
    return "bg-secondary-container text-on-secondary-container";
  case "nri":
    return "bg-tertiary-fixed text-on-tertiary-fixed";
  case "deemed":
    return "bg-outline text-surface-container-lowest";
  case "special":
    return "bg-primary-fixed-dim text-on-primary-fixed-variant";
  default:
    return "bg-surface-container-high text-on-surface";
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

export function QuotaOverview() {
  return (
    <QuotaOverviewShell>
      <section className="mb-12">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-primary-fixed px-3 py-1 text-primary">
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
              <span className="font-label-md font-bold uppercase tracking-wider">Medical admission guide</span>
            </div>
            <h1 className="mt-4 max-w-2xl text-2xl font-black leading-tight tracking-tight text-on-surface md:text-5xl">
              Understand every <span className="text-primary">medical seat quota</span> before you register
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-on-surface-variant md:text-lg">
              Quotas decide the counselling authority, the seat pool you can access, document proof,
              fee category and round strategy. Use this page as the starting map before opening MCC,
              state, management, NRI or deemed university counselling choices.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#quota-types" className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-on-primary shadow-sm transition hover:bg-primary-hover">
                Compare quota types
                <span className="material-symbols-outlined text-lg">arrow_downward</span>
              </a>
              <Link href="/college-predictor" className="inline-flex items-center justify-center gap-2 rounded-xl border border-outline-variant bg-surface-container-lowest px-5 py-3 text-sm font-bold text-on-surface-variant transition hover:border-primary hover:text-primary">
                Check college fit
                <span className="material-symbols-outlined text-lg">analytics</span>
              </Link>
            </div>
          </div>
          <div className="rounded-4xl bg-linear-to-br from-primary-fixed via-surface-container-lowest to-surface-container-low p-5 shadow-clinical-soft">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-on-primary">
                <span className="material-symbols-outlined text-[28px]">hub</span>
              </span>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-primary">Start here</p>
                <p className="text-sm font-extrabold text-on-surface">Rank + domicile + category + budget = quota strategy</p>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl bg-surface-container-lowest p-3">
                <p className="text-2xl font-black text-on-surface">15%</p>
                <p className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">AIQ govt seats</p>
              </div>
              <div className="rounded-xl bg-surface-container-lowest p-3">
                <p className="text-2xl font-black text-on-surface">85%</p>
                <p className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">State govt seats</p>
              </div>
              <div className="rounded-xl bg-surface-container-lowest p-3">
                <p className="text-2xl font-black text-on-surface">MCC</p>
                <p className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">Central pools</p>
              </div>
              <div className="rounded-xl bg-surface-container-lowest p-3">
                <p className="text-2xl font-black text-on-surface">DME</p>
                <p className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">State pools</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <div className="mb-6 flex flex-col gap-2">
          <span className="text-[10px] font-black uppercase tracking-[0.16em] text-primary">
            Decision signals
          </span>
          <h2 className="text-2xl font-black tracking-tight text-on-surface md:text-3xl">
            What changes when the quota changes?
          </h2>
          <p className="max-w-3xl text-sm leading-relaxed text-on-surface-variant">
            The quota is not just a label. It changes the authority, proof documents, cutoff
            behaviour, fee category and the number of parallel forms you must track.
          </p>
        </div>
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
      </section>

      <section className="mb-12 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <QuotaTheoryPanel className="h-full" {...quotaTheoryContent.overview} />
        <aside className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 shadow-clinical-soft h-fit">
          <span className="text-[10px] font-black uppercase tracking-[0.16em] text-primary">
            Planning checklist
          </span>
          <h2 className="mt-2 text-xl font-black tracking-tight text-on-surface">
            Build your quota shortlist in this order
          </h2>
          <div className="mt-5 space-y-4">
            {planningSignals.map((signal) => (
              <div key={signal.label} className="flex gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-fixed text-primary">
                  <span className="material-symbols-outlined text-[22px]">{signal.icon}</span>
                </span>
                <div>
                  <h3 className="text-sm font-black text-on-surface">{signal.label}</h3>
                  <p className="mt-0.5 text-sm leading-relaxed text-on-surface-variant">{signal.value}</p>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </section>

      {/* Seat Distribution Comparison Table */}
      <section className="mb-12">
        <div className="mb-6 grid gap-4 md:grid-cols-[minmax(0,1fr)_280px] md:items-end">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.16em] text-primary">
              Seat matrix view
            </span>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-on-surface md:text-3xl">
              Seat-sharing ratio and eligibility summary
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-on-surface-variant">
              A quick comparison of how government, private and deemed colleges expose their
              seats across AIQ, state, management and NRI routes.
            </p>
          </div>
          <div className="rounded-2xl bg-primary-fixed/55 p-4">
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-primary">
              Read this first
            </p>
            <p className="mt-1 text-sm font-semibold leading-relaxed text-on-primary-fixed">
              Treat every percentage as a planning guide. Final seat matrix and eligibility are
              controlled by the latest MCC or state bulletin.
            </p>
          </div>
        </div>
        <div className="overflow-hidden rounded-2xl border border-outline-variant bg-surface-container-lowest shadow-clinical-soft">
          <div className="hidden grid-cols-[180px_repeat(4,minmax(0,1fr))] border-b border-outline-variant bg-[#123766] text-[10px] font-black uppercase tracking-widest text-white lg:grid">
            <div className="px-5 py-4">College type</div>
            <div className="px-5 py-4">AIQ</div>
            <div className="px-5 py-4">State quota</div>
            <div className="px-5 py-4">Management</div>
            <div className="px-5 py-4">NRI</div>
          </div>
          {quotaComparisonRows.map((row) => (
            <div
              key={row.collegeType}
              className="grid gap-3 border-b border-outline-variant/70 p-5 last:border-b-0 lg:grid-cols-[180px_repeat(4,minmax(0,1fr))] lg:gap-0 lg:p-0"
            >
              <div className="text-base font-black text-on-surface lg:bg-surface-container-low lg:px-5 lg:py-5 lg:text-sm">
                {row.collegeType}
              </div>
              {[
                ["AIQ", row.aiq],
                ["State quota", row.state],
                ["Management", row.management],
                ["NRI", row.nri],
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl bg-surface-container-low/55 p-4 lg:rounded-none lg:bg-transparent lg:px-5 lg:py-5">
                  <span className="text-[10px] font-black uppercase tracking-wider text-primary lg:hidden">
                    {label}
                  </span>
                  <p className="mt-1 text-sm font-semibold leading-relaxed text-on-surface-variant lg:mt-0">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section id="quota-types" className="mb-12 scroll-mt-28">
        <div className="mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.16em] text-primary">Quota directory</span>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-on-surface md:text-3xl">
              Primary quota types
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-on-surface-variant">
              Scan seat share, counselling body, domicile rules and fee category before opening the detailed guide.
            </p>
          </div>
          <Link href="/rank-predictor" className="inline-flex w-fit items-center gap-2 rounded-xl bg-primary-fixed px-4 py-2 text-sm font-bold text-primary transition hover:bg-primary hover:text-on-primary">
            Estimate rank fit
            <span className="material-symbols-outlined text-base">query_stats</span>
          </Link>
        </div>
        <div className="overflow-hidden rounded-2xl border border-outline-variant bg-surface-container-lowest shadow-clinical-soft">
          {quotaTypes.map((quota) => (
            <Link
              key={quota.slug}
              href={`/quota/${quota.slug}`}
              className="group grid gap-4 border-b border-outline-variant/70 p-5 transition hover:bg-surface-container-low/45 last:border-b-0 md:grid-cols-[180px_minmax(0,1fr)_180px_170px_42px] md:items-center"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-fixed text-primary transition group-hover:bg-primary group-hover:text-on-primary">
                  <span className="material-symbols-outlined text-[22px]">{getCardIcon(quota.slug)}</span>
                </span>
                <div>
                  <span className={`font-label-sm rounded px-2 py-0.5 text-[10px] font-bold ${getBadgeClasses(quota.slug)}`}>
                    {quota.abbreviation}
                  </span>
                  <h3 className="mt-1 text-sm font-black text-on-surface">{quota.name}</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-on-surface-variant">Seats</span>
                  <p className="mt-1 font-extrabold text-on-surface">{quota.seats}</p>
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-on-surface-variant">Counselling</span>
                  <p className="mt-1 font-semibold text-on-surface-variant">{quota.counseling}</p>
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-on-surface-variant">Domicile</span>
                  <p className="mt-1 font-semibold text-on-surface-variant">
                    {quota.domicileStatus === "DOMICILE YES" ? "Required" : quota.domicileStatus === "NO DOMICILE" ? "Not required" : "Specific proof"}
                  </p>
                </div>
              </div>
              <div className="text-sm">
                <span className="text-[10px] font-black uppercase tracking-wider text-on-surface-variant">Fee range</span>
                <p className="mt-1 font-extrabold text-primary">{quota.feeRange}</p>
              </div>
              <span className="text-sm font-bold text-primary">View details</span>
              <span className="hidden h-10 w-10 items-center justify-center rounded-full bg-surface-container-low text-primary transition group-hover:bg-primary group-hover:text-on-primary md:flex">
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Key Rules & Eligibility */}
      <section className="relative mb-12 overflow-hidden rounded-4xl bg-primary-container p-6 text-on-primary-container md:p-10">
        <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
          <div>
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-on-primary-container/20">
              <span className="material-symbols-outlined text-2xl text-on-primary-container">assignment_turned_in</span>
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.16em] opacity-70">
              Rules before registration
            </span>
            <h2 className="mt-2 text-2xl font-black tracking-tight md:text-4xl">
              Key rules and eligibility checks
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed opacity-90 md:text-base">
              Before paying fees or filling choices, confirm the official registration mode,
              document proof, scheme acceptance and authority-specific instructions.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/neet-ug-2026/counselling-guide"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-surface-container-lowest px-5 py-3 text-sm font-bold text-primary shadow-sm transition hover:scale-[1.02]"
              >
                <span className="material-symbols-outlined text-lg">download</span>
                Full MCC guide
              </Link>
              <a
                href="https://mcc.nic.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-on-primary-container/40 px-5 py-3 text-sm font-bold text-on-primary-container transition hover:bg-on-primary-container/10"
              >
                <span className="material-symbols-outlined text-lg">language</span>
                Official MCC portal
              </a>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {keyGuidelines.map((guideline) => (
              <div key={guideline.title} className="rounded-2xl bg-on-primary-container/10 p-4 backdrop-blur">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-on-primary-container/15">
                  <span className="material-symbols-outlined text-xl">{guideline.icon}</span>
                </span>
                <h3 className="mt-3 text-sm font-black">{guideline.title}</h3>
                <p className="mt-1 text-sm leading-relaxed opacity-85">{guideline.body}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-container/30 rounded-full -ml-24 -mb-24 blur-2xl pointer-events-none"></div>
      </section>

      <QuotaProcessList
        className="mb-12"
        title="How to Choose Your Quota Path"
        subtitle="A quick framework before opening any counselling form."
        steps={[
          { title: "Start with mandatory eligibility", body: "List your domicile, category, PwD, minority, NRI sponsor, and schooling claims with proof documents." },
          { title: "Map counselling bodies", body: "Separate MCC choices from each state portal so you do not miss parallel registrations." },
          { title: "Build budget bands", body: "Mark government, state private, management, NRI, and deemed options by total payable cost." },
          { title: "Compare round behavior", body: "Study previous R1, R2, mop-up, and stray vacancy cutoffs because each quota behaves differently late in counselling." },
        ]}
      />

    </QuotaOverviewShell>
  );
}
