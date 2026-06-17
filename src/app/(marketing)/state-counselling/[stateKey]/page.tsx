import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StateCounsellingDetailView } from "@/components/features/state-counselling/StateCounsellingView";
import {
  featuredStateCounsellingDetails,
  type StateCounsellingKey,
} from "@/lib/data/state-counselling";
import { buildMetadata } from "@/lib/seo/metadata";

interface PageProps {
  params: Promise<{ stateKey: StateCounsellingKey }>;
}

export function generateStaticParams() {
  return featuredStateCounsellingDetails.map((state) => ({
    stateKey: state.key,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { stateKey } = await params;
  const state = featuredStateCounsellingDetails.find((item) => item.key === stateKey);

  if (!state) {
    return buildMetadata({
      title: "State Counselling Not Found",
      description: "No matching state counselling guide found.",
    });
  }

  return buildMetadata({
    title: `${state.name} NEET UG State Counselling Guide`,
    description: `${state.name} NEET UG counselling authority, eligibility, reservation, documents, rounds, seat categories and admission rules.`,
    path: `/state-counselling/${state.key}`,
  });
}

export default async function StateCounsellingDetailPage({ params }: PageProps) {
  const { stateKey } = await params;
  const state = featuredStateCounsellingDetails.find((item) => item.key === stateKey);

  if (!state) {
    notFound();
  }

  return <StateCounsellingDetailView state={state} />;
}
