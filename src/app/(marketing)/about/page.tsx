import { AboutPageView } from "@/components/features/about/AboutPageView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us — MBBS Counseling You Can Trust | MedSeat",
  description:
    "Why MedSeat exists: MBBS-only counseling across Gujarat, Rajasthan, MP and Maharashtra, grounded in verified cutoff data and honest fit checks — not seat guarantees.",
};

export default function AboutPage() {
  return <AboutPageView />;
}
