import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FiActivity, FiUsers } from "react-icons/fi";
import { PageHeader } from "@/components/common/PageHeader";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Card } from "@/components/ui/Card";
import { CollegeListPageTemplate } from "@/components/features/colleges/listing/CollegeListPageTemplate";
import {
  getCollegeListing,
  getFilterOptions,
} from "@/lib/data/colleges";
import { findStateBySlug, getAllStates } from "@/lib/data/states";
import { parseListSearchParams } from "@/lib/colleges/filters";
import { buildMetadata } from "@/lib/seo/metadata";
import { formatNumber } from "@/lib/utils";

interface PageProps {
  params: Promise<{ stateSlug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export function generateStaticParams() {
  return getAllStates().map((state) => ({ stateSlug: state.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ stateSlug: string }>;
}): Promise<Metadata> {
  const { stateSlug } = await params;
  const state = findStateBySlug(stateSlug);
  if (!state) {
    return buildMetadata({
      title: "State Not Found",
      description: "No matching state found.",
    });
  }
  return buildMetadata({
    title: `MBBS Colleges in ${state.name}`,
    description: state.intro,
    path: `/colleges/state/${stateSlug}`,
  });
}

export default async function StateCollegesPage({
  params,
  searchParams,
}: PageProps) {
  const { stateSlug } = await params;
  const state = findStateBySlug(stateSlug);
  if (!state) {
    notFound();
  }
  const resolved = await searchParams;
  const userFilters = parseListSearchParams(resolved);
  const filters = { ...userFilters, state: stateSlug };
  const listing = getCollegeListing(filters);
  const filterOptions = getFilterOptions();

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Colleges", href: "/colleges" },
          { label: "States", href: "/colleges/state" },
          { label: state.name },
        ]}
      />
      <PageHeader
        eyebrow={`${state.name} Counseling`}
        title={`MBBS Colleges in ${state.name}`}
        description={state.intro}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card padded bordered className="flex items-center gap-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] bg-brand-50 text-brand-700">
            <FiUsers aria-hidden="true" />
          </span>
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-widest text-text-muted">
              Total Seats
            </span>
            <span className="text-lg font-semibold tracking-tight text-text">
              {formatNumber(state.totalSeats)}
            </span>
          </div>
        </Card>
        <Card padded bordered className="flex items-center gap-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] bg-brand-50 text-brand-700">
            <FiActivity aria-hidden="true" />
          </span>
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-widest text-text-muted">
              Competition Level
            </span>
            <span className="text-lg font-semibold tracking-tight text-text">
              {state.competitionLevel}
            </span>
          </div>
        </Card>
        <Card padded bordered className="flex items-center gap-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] bg-brand-50 text-brand-700">
            <FiUsers aria-hidden="true" />
          </span>
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-widest text-text-muted">
              Listed Colleges
            </span>
            <span className="text-lg font-semibold tracking-tight text-text">
              {formatNumber(listing.pagination.totalItems)}
            </span>
          </div>
        </Card>
      </div>

      <CollegeListPageTemplate
        basePath={`/colleges/state/${stateSlug}`}
        filters={filters}
        filterOptions={filterOptions}
        listing={listing}
        hiddenFilters={["state"]}
        lockedFilters={{ state: stateSlug }}
      />
    </>
  );
}
