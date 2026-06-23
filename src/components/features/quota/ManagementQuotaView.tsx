import { QuotaHeader, QuotaCta, PremiumSectionHeader, QuotaPageShell, QuotaInfoGrid, QuotaProcessList, QuotaTheoryPanel, LiveDecisionTools } from "./QuotaShared";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import {
  mqStatesData as mqStates,
  openClosedStatesData,
  quotaTheoryContent,
} from "./content";

const MANAGEMENT_QUOTA_JUMP_SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "state-mq", label: "State MQ Cutoffs" },
  { id: "open-vs-closed", label: "Open vs Closed" },
  { id: "decision-flow", label: "Decision Flow" },
];

export function ManagementQuotaView() {
  const header = (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      <div className="lg:col-span-8 space-y-6">
        <QuotaHeader
          eyebrow="Admission Guide 2026"
          title="Management Quota"
          highlightedText="MBBS Admissions"
          description="A strategic pathway for medical aspirants seeking admission into private institutions across India, offering flexibility without domicile restrictions. We break down the complexities of MQ seats for the 2026 session."
          eyebrowIcon="verified"
          watermarkIcon="payments"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card padded={false} className="flex items-start gap-4 p-4">
            <span className="material-symbols-outlined text-primary bg-primary-fixed p-2 rounded-lg">person_check</span>
            <div>
              <h3 className="font-title-lg text-title-lg text-on-surface font-bold">Eligibility</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">NEET Qualified Candidates Only</p>
            </div>
          </Card>
          <Card padded={false} className="flex items-start gap-4 p-4">
            <span className="material-symbols-outlined text-primary bg-primary-fixed p-2 rounded-lg">public</span>
            <div>
              <h3 className="font-title-lg text-title-lg text-on-surface font-bold">Domicile Rules</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Open to all candidates across India</p>
            </div>
          </Card>
        </div>
      </div>

      {/* Open State Advantage: Glassmorphism / Vibrant CTA */}
      <Card padded={false} bordered={false} className="group relative flex flex-col justify-between overflow-hidden bg-linear-to-br from-primary to-primary-pressed p-6 text-on-primary shadow-[0_18px_42px_-22px_color-mix(in_srgb,var(--color-primary)_55%,transparent)] lg:col-span-4 h-fit">
        <div className="absolute -right-12 -top-12 opacity-10 pointer-events-none select-none">
          <span className="material-symbols-outlined text-[180px]">public</span>
        </div>
        <div className="relative z-10">
          <span className="material-symbols-outlined text-[36px] mb-4 text-white">language</span>
          <h2 className="font-headline-md text-headline-md mb-4 font-bold text-white">Open State Advantage</h2>
          <p className="font-body-sm text-body-sm mb-6 opacity-90 text-white/90 leading-relaxed">
            Open states allow candidates from any state to apply for their private college management quota seats, presenting excellent options for students with moderate NEET scores.
          </p>
        </div>
        {/* <Button
          as="link"
          href="#open-states"
          variant="inverse"
          fullWidth
        >
          View Open States List
        </Button> */}
      </Card>
    </div>
  );

  const sidebar = (
    <aside className="space-y-6">
      {/* Live Decision Tools Component */}
      <LiveDecisionTools highlightId="predictor" />

      {/* Confused about MQ? Card */}
      <Card as="section" className="flex flex-col items-center text-center">
        <span className="material-symbols-outlined text-primary mb-3 text-[32px]">help_center</span>
        <h4 className="font-title-lg text-title-lg mb-2 font-bold text-on-surface">Need help with private seats?</h4>
        <p className="font-body-sm text-body-sm text-on-surface-variant mb-4 leading-relaxed">Compare fees, bond, and cutoffs with similar colleges.</p>
        <div className="flex flex-col gap-2 w-full">
          <Button
            as="link"
            href="/compare"
            variant="secondary"
            size="sm"
            fullWidth
          >
            Compare colleges
          </Button>
          <Button
            as="link"
            href="#counselling-lead-section"
            variant="primary"
            size="sm"
            fullWidth
          >
            Free counselling
          </Button>
        </div>
      </Card>
    </aside>
  );

  return (
    <QuotaPageShell
      current="Management Quota"
      header={header}
      sidebar={sidebar}
      jumpSections={MANAGEMENT_QUOTA_JUMP_SECTIONS}
    >
      {/* Overview Grid */}
      <div id="overview" className="space-y-10">
        <section className="pt-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-headline-md text-headline-md flex items-center gap-2 text-on-surface font-bold">
              <span className="material-symbols-outlined text-primary text-[28px]">analytics</span>
              Overview
            </h2>
            <span className="text-label-md text-secondary italic tracking-wider">For private college admissions</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card hover={true}>
              <p className="text-label-md text-on-surface-variant mb-1 uppercase tracking-wider font-bold">Scope</p>
              <p className="text-title-lg font-title-lg mb-2 text-on-surface font-bold">~35-50% seats</p>
              <p className="text-body-sm text-on-surface-variant">In private medical colleges</p>
            </Card>
            <Card hover={true}>
              <p className="text-label-md text-on-surface-variant mb-1 uppercase tracking-wider font-bold">Counselling</p>
              <p className="text-title-lg font-title-lg mb-2 text-on-surface font-bold">State Authorities</p>
              <p className="text-body-sm text-on-surface-variant">Conducted by respective state DME</p>
            </Card>
            <Card hover={true}>
              <p className="text-label-md text-on-surface-variant mb-1 uppercase tracking-wider font-bold">Annual Fees</p>
              <p className="text-title-lg font-title-lg mb-2 text-on-surface font-bold">8 Lakhs – 25 Lakhs</p>
              <p className="text-body-sm text-on-surface-variant">Varies widely by state and college</p>
            </Card>
            <Card hover={true}>
              <p className="text-label-md text-on-surface-variant mb-1 uppercase tracking-wider font-bold">Domicile Rule</p>
              <p className="text-title-lg font-title-lg mb-2 text-primary font-bold">Open To All States</p>
              <p className="text-body-sm text-on-surface-variant">No residency restriction for MQ</p>
            </Card>
          </div>
          <Card padded={false} className="mt-6 bg-surface-container-high/50 p-4 flex items-start gap-4 rounded-xl">
            <span className="material-symbols-outlined text-primary text-[24px] shrink-0 mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>info</span>
            <p className="text-body-sm text-on-surface leading-relaxed">
              <strong className="tracking-wider">Process Note:</strong> Management quota registrations and fee submission details vary for each state authority. Candidates must register on the state DME portals during the scheduled windows.
            </p>
          </Card>
        </section>

        <QuotaInfoGrid
          items={[
            {
              icon: "receipt_long",
              title: "Budget beyond tuition",
              body: "Add hostel, mess, university, examination, insurance, caution deposit, and one-time admission charges before comparing colleges.",
            },
            {
              icon: "policy",
              title: "State rules still matter",
              body: "Management quota is not a direct admission shortcut. Applications, merit lists, seat allotment, and fee payments are governed by state counselling authorities.",
            },
            {
              icon: "trending_up",
              title: "Cutoffs can move sharply",
              body: "Open-state demand changes with fee revisions, new colleges, bond terms, and stray-round vacancy, so shortlist a wide rank and fee band.",
            },
          ]}
        />

        <QuotaTheoryPanel className="" {...quotaTheoryContent.management} />
      </div>

      {/* State-wise Management Quota Directory */}
      <section id="state-mq" className="scroll-mt-24">
        <h2 className="font-headline-md text-headline-md mb-2 text-on-surface font-bold">State-wise Management Quotas</h2>
        <p className="text-body-md text-on-surface-variant mb-8 leading-relaxed">Highlights of key medical hubs and their estimated MQ cutoffs.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
          {mqStates.map((item, idx) => {
            return (
              <Card key={idx} padded={false} hover={true} className="group overflow-hidden">
                <div className="p-6 border-b border-outline-variant/40 flex justify-between items-center bg-surface-bright group-hover:bg-primary/5 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">location_on</span>
                    <h3 className="font-title-lg text-title-lg text-on-surface font-bold">{item.state}</h3>
                  </div>
                  <Badge tone="warn" icon={<span className="material-symbols-outlined text-xs">trending_down</span>}>
                    Cutoff
                  </Badge>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <Card padded={false} className="bg-surface-container p-4 border border-outline-variant/40 shadow-none">
                      <p className="text-label-sm text-on-surface-variant mb-1 font-bold tracking-wider">SEATS AVAILABLE</p>
                      <p className="font-bold text-lg text-on-surface">{item.seats}</p>
                    </Card>
                    <Card padded={false} className="bg-surface-container p-4 border border-outline-variant/40 shadow-none">
                      <p className="text-label-sm text-on-surface-variant mb-1 font-bold tracking-wider">EXPECTED RANK</p>
                      <p className="font-bold text-lg text-primary">{item.rankRange}</p>
                    </Card>
                  </div>
                  <p className="text-body-sm text-on-surface-variant mb-6 leading-relaxed min-h-[40px]">{item.notes}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-outline-variant/40">
                    <span className="text-label-md text-secondary font-bold tracking-wider">ESTIMATED CUTOFF</span>
                    <Button
                      as="link"
                      variant="text"
                      href={item.link}
                      trailingIcon={<span className="material-symbols-outlined text-[16px]">arrow_forward</span>}
                    >
                      Counselling Details
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Open vs Closed States Comparison */}
      <section id="open-vs-closed">
        <PremiumSectionHeader icon="swap_horiz" title="Open States vs. Closed States Policies" subtitle="Understanding residency eligibility for Private Management seats" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Open States */}
          <Card>
            <h3 className="text-title-lg font-bold text-primary mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined">lock_open</span> Open States (Allows Non-Domicile Candidates)
            </h3>
            <div className="space-y-4">
              {openClosedStatesData.open.map((item) => (
                <div key={item.state} className="p-3 bg-surface-container-low/40 rounded-xl border border-outline-variant/40 flex justify-between items-center">
                  <div>
                    <div className="font-bold text-on-surface text-sm">{item.state}</div>
                    <div className="text-[11px] text-on-surface-variant mt-0.5">{item.seats} • {item.avgFee}</div>
                  </div>
                  <Badge tone="brand">
                    {item.remark}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>

          {/* Closed States */}
          <Card>
            <h3 className="text-title-lg font-bold text-error mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined">lock</span> Closed/Restricted States (Domicile Mandatory)
            </h3>
            <div className="space-y-4">
              {openClosedStatesData.closed.map((item) => (
                <div key={item.state} className="p-3 bg-surface-container-low/40 rounded-xl border border-outline-variant/40">
                  <div className="font-bold text-on-surface text-sm">{item.state}</div>
                  <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">{item.rule}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <div id="decision-flow">
        <QuotaProcessList
          title="Management Quota Decision Flow"
          subtitle="A cleaner way to compare private college options before locking choices."
          steps={[
            { title: "Confirm open or restricted status", body: "Check whether the state allows non-domicile candidates for private management seats in the current bulletin." },
            { title: "Map total payable cost", body: "Compare annual tuition, hostel, refundable deposits, bond penalty, and payment schedule across the full course duration." },
            { title: "Check college risk factors", body: "Review NMC recognition, permitted intake, hospital load, bond service terms, and recent fee fixation orders." },
            { title: "Rank choices by fit", body: "Order colleges by academics, affordability, location, and cutoff realism instead of placing the lowest fee option blindly first." },
          ]}
        />
      </div>

      {/* Compare Fees Section */}
      <QuotaCta
        title="Compare Private College Fee Structures"
        description="Don't get overwhelmed by complex fee structures. Access our database of management quota seat matrices and year-wise fees for all open states."
        actions={[
          {
            label: "Compare Colleges",
            href: "#",
            variant: "primary",
          },
          {
            label: "Download Brochure",
            href: "#",
            variant: "secondary",
          }
        ]}
      />
    </QuotaPageShell>
  );
}
