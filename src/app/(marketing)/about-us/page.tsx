import { AboutPageView } from "@/components/features/about/AboutPageView";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "About Dravio — Verified MBBS admission guidance for NEET students",
  description:
    "Dravio helps students and parents make informed MBBS admission decisions using verified data, historical trends, and clear guidance across Gujarat, Rajasthan, Madhya Pradesh and Maharashtra.",
  path: "/about-us",
});

export default function AboutPage() {
  return <AboutPageView />;
}
