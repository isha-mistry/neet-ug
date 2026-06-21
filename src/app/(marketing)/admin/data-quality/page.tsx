import type { Metadata } from "next";
import Link from "next/link";
import { getCollegeQualitySummary } from "@/lib/data/college-quality";
import { dataSourceLabel } from "@/lib/data/source";
import { Container } from "@/components/common/Container";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

const FLAG_HINTS: Record<string, string> = {
  MISSING_GUJARAT_FEES:
    "No fee_schedules / fee_line_items for this college (may be AIIMS or not on state fee sheet).",
  MISSING_GUJARAT_CUTOFFS:
    "No cutoffs rows for this college (2025 Gujarat counselling).",
  HAS_GUJARAT_FEES: "Has fee schedule in Postgres.",
  HAS_GUJARAT_CUTOFFS: "Has cutoff rows (2025).",
  HAS_GUJARAT_SEATS: "Has seat_snapshots / seat_buckets.",
  MULTIPLE_SEAT_MATRICES:
    "More than one seat snapshot for the same year (unexpected).",
  NRI_FEE_USD:
    "NRI quota fee is in USD per fee sheet ($ column). GQ/MQ remain INR.",
  FEE_CURRENCY_USD_TAG:
    "Legacy flag retained for backward compatibility (replaced by NRI_FEE_USD).",
  SUPPLEMENTAL_FROM_GUJARAT_ENRICHMENT:
    "College enriched from fees/cutoffs without a separate master list row.",
};

export default async function DataQualityAdminPage() {
  const summary = await getCollegeQualitySummary();
  const issueFlags = Object.keys(summary.byFlag)
    .filter((f) => f.startsWith("MISSING_") || f === "FEE_CURRENCY_USD_TAG")
    .sort();

  return (
    <Container size="2xl" className="ms-content-below-nav pb-10 md:pb-14">
      <header className="mb-8 border-b border-outline-variant pb-6">
        <p className="text-label-sm font-label-sm uppercase tracking-wider text-on-surface-variant">
          Internal · not indexed
        </p>
        <h1 className="mt-2 font-headline-lg text-headline-lg text-primary">
          College data quality
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-on-surface-variant md:text-base">
          Catalog source: <strong className="text-on-surface">{dataSourceLabel}</strong>.
          Refresh the seeded catalog data after SQL or alias changes.
        </p>
      </header>

      <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Colleges" value={summary.totalColleges} />
        <StatCard label="Gujarat" value={summary.gujaratColleges} />
        <StatCard label="With cutoffs" value={summary.withCutoffs} />
        <StatCard label="Gujarat cutoffs" value={summary.withGujaratCutoffs} />
      </div>

      <section className="mb-12">
        <h2 className="font-headline-md text-headline-md text-on-surface">
          Issues by flag
        </h2>
        <p className="mt-1 text-sm text-on-surface-variant">
          {summary.flagged.length} colleges carry at least one quality flag.
        </p>
        <div className="mt-6 flex flex-col gap-8">
          {issueFlags.map((flag) => (
            <div key={flag}>
              <h3 className="text-sm font-bold uppercase tracking-wide text-primary">
                {flag}
              </h3>
              <p className="mt-1 text-sm text-on-surface-variant">
                {FLAG_HINTS[flag] ?? "See data/README.md"}
              </p>
              <ul className="mt-3 divide-y divide-outline-variant/50 rounded-xl border border-outline-variant/50 bg-surface-container-lowest">
                {(summary.byFlag[flag] ?? []).map((row) => (
                  <li
                    key={`${flag}-${row.slug}`}
                    className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 text-sm"
                  >
                    <span className="font-medium text-on-surface">{row.name}</span>
                    <Link
                      href={`/colleges/${row.slug}`}
                      className="text-primary underline-offset-2 hover:underline"
                    >
                      {row.slug}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-headline-md text-headline-md text-on-surface">
          All flagged colleges
        </h2>
        <div className="mt-4 overflow-x-auto rounded-xl border border-outline-variant/50">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-surface-container-low text-xs uppercase tracking-wider text-on-surface-variant">
              <tr>
                <th className="px-4 py-3">College</th>
                <th className="px-4 py-3">State</th>
                <th className="px-4 py-3">Flags</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/40 bg-surface-container-lowest">
              {summary.flagged.map((row) => (
                <tr key={row.slug}>
                  <td className="px-4 py-3">
                    <Link
                      href={`/colleges/${row.slug}`}
                      className="font-medium text-primary hover:underline"
                    >
                      {row.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-on-surface-variant">
                    {row.stateSlug}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {row.flags.map((f) => (
                        <span
                          key={f}
                          className="rounded-full bg-surface-container-high px-2 py-0.5 text-[11px] font-semibold text-on-surface-variant"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </Container>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-outline-variant/50 bg-surface-container-lowest p-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-outline">
        {label}
      </p>
      <p className="mt-1 text-2xl font-bold text-on-surface">{value}</p>
    </div>
  );
}
