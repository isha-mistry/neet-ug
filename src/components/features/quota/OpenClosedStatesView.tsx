"use client";

import Link from "next/link";
import { Badge, type BadgeTone } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { QuotaBookCounsellingCard } from "@/components/features/quota/QuotaBookCounsellingCard";
import {
  LiveDecisionTools,
  PremiumSectionHeader,
  QuotaCta,
  QuotaHeader,
  QuotaInfoGrid,
  QuotaPageShell,
} from "@/components/features/quota/QuotaShared";
import {
  OPEN_CLOSED_DEFINITIONS,
  OPEN_CLOSED_FAQ,
  OPEN_CLOSED_FOOTNOTE,
  OPEN_CLOSED_HIGHLIGHTS,
  OPEN_CLOSED_RELATED_LINKS,
  OPEN_CLOSED_STATE_ROWS,
  OPEN_CLOSED_STATES_HERO,
  OPEN_CLOSED_STATES_JUMP,
  OPEN_CLOSED_WHY_IT_MATTERS,
  type OpenClosedStatusKind,
} from "@/lib/pages/open-closed-states-content";

const STATUS_BADGE_TONE: Record<OpenClosedStatusKind, BadgeTone> = {
  open: "safe",
  closed: "risk",
  conditional: "warn",
  none: "neutral",
};

function statusTone(kind: OpenClosedStatusKind): BadgeTone {
  return STATUS_BADGE_TONE[kind];
}

export function OpenClosedStatesView() {
  const header = (
    <QuotaHeader
      eyebrow={OPEN_CLOSED_STATES_HERO.eyebrow}
      title={OPEN_CLOSED_STATES_HERO.title}
      highlightedText={OPEN_CLOSED_STATES_HERO.highlightedText}
      description={OPEN_CLOSED_STATES_HERO.description}
      eyebrowIcon="public"
      watermarkIcon="map"
    />
  );

  const sidebar = (
    <aside className="space-y-6">
      <QuotaBookCounsellingCard source="Open Closed States" />
      <LiveDecisionTools highlightId="predictor" />
      <Card padded={false} className="overflow-hidden p-0">
        <div className="border-b border-outline-variant bg-surface-container-low px-5 py-3">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
            Related guides
          </h3>
        </div>
        <ul className="divide-y divide-outline-variant">
          {OPEN_CLOSED_RELATED_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="flex items-center justify-between gap-3 px-5 py-3 text-sm font-semibold text-on-surface no-underline transition-colors hover:bg-surface-container-low"
              >
                {link.label}
                <span className="material-symbols-outlined text-base text-primary" aria-hidden>
                  chevron_right
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Card>
    </aside>
  );

  return (
    <QuotaPageShell
      current="Open & Closed States"
      hideQuotaCrumb
      header={header}
      sidebar={sidebar}
      jumpSections={[...OPEN_CLOSED_STATES_JUMP]}
    >
      <section id="definitions" className="space-y-8">
        <QuotaInfoGrid
          items={OPEN_CLOSED_DEFINITIONS.map((item) => ({
            icon: item.icon,
            title: item.title,
            body: item.body,
          }))}
        />
      </section>

      <section id="full-list" className="space-y-4">
        <PremiumSectionHeader
          icon="table_chart"
          title="State-wise open / closed status"
          subtitle="Private medical colleges — outside-state eligibility at a glance"
        />
        <div className="quota-table-wrap">
          <table className="quota-table">
            <thead>
              <tr>
                <th scope="col" className="w-14">
                  S.No.
                </th>
                <th scope="col">State / UT</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {OPEN_CLOSED_STATE_ROWS.map((row, index) => (
                <tr key={row.state}>
                  <td className="tabular-nums text-on-surface-variant">{index + 1}</td>
                  <td>
                    {row.href ? (
                      <Link
                        href={row.href}
                        className="font-semibold text-primary no-underline hover:underline"
                      >
                        {row.state}
                      </Link>
                    ) : (
                      <span className="font-semibold text-on-surface">{row.state}</span>
                    )}
                  </td>
                  <td>
                    <Badge tone={statusTone(row.kind)} className="normal-case tracking-normal">
                      {row.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs leading-relaxed text-on-surface-variant">{OPEN_CLOSED_FOOTNOTE}</p>
      </section>

      <section id="why-it-matters" className="space-y-4">
        <PremiumSectionHeader
          icon="lightbulb"
          title="Why open vs closed matters"
          subtitle="Eligibility geography shapes college lists, fees, and round strategy"
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {OPEN_CLOSED_WHY_IT_MATTERS.map((item) => (
            <Card key={item.title} className="p-5">
              <h3 className="mb-2 flex items-center gap-2 text-base font-bold text-on-surface">
                <span className="material-symbols-outlined text-lg text-primary" aria-hidden>
                  {item.icon}
                </span>
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-on-surface-variant">{item.body}</p>
            </Card>
          ))}
        </div>
      </section>

      <section id="highlights" className="space-y-4">
        <PremiumSectionHeader
          icon="pin_drop"
          title="State notes worth knowing"
          subtitle="Common planning patterns — not a substitute for the official prospectus"
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {OPEN_CLOSED_HIGHLIGHTS.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-outline-variant/50 bg-surface-container-low/40 p-5"
            >
              <h3 className="text-sm font-bold text-on-surface">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="faq" className="space-y-4">
        <PremiumSectionHeader icon="help" title="Frequently asked questions" />
        <div className="border-y border-outline-variant">
          {OPEN_CLOSED_FAQ.map((item, index) => (
            <details
              key={item.q}
              className="group border-b border-outline-variant last:border-b-0"
              open={index === 0}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-[15px] font-bold leading-snug text-on-surface marker:content-none [&::-webkit-details-marker]:hidden">
                {item.q}
                <span
                  className="shrink-0 font-mono text-lg font-semibold text-primary transition group-open:rotate-45"
                  aria-hidden
                >
                  +
                </span>
              </summary>
              <p className="pb-5 pr-6 text-sm leading-relaxed text-on-surface-variant">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <QuotaCta
        title="Not sure which open state fits your rank?"
        description="Share your AIR, category, domicile, and budget — we’ll map realistic private, institutional, and NRI options."
        actions={[
          {
            label: "College predictor",
            href: "/college-predictor",
            variant: "primary",
          }
        ]}
      />
    </QuotaPageShell>
  );
}
