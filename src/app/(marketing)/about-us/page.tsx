import { AboutPageView } from "@/components/features/about/AboutPageView";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "About Us — MBBS Counseling You Can Trust | MedSeat",
  description:
    "Why MedSeat exists: MBBS-only counseling across Gujarat, Rajasthan, MP and Maharashtra, grounded in verified cutoff data and honest fit checks — not seat guarantees.",
  path: "/about-us",
});

export default function AboutPage() {
  return <AboutPageView />;
}
