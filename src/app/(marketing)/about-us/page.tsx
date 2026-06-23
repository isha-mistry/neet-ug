import { AboutPageView } from "@/components/features/about/AboutPageView";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "About Dravio",
  metaTitle: "About Dravio | NEET UG Counselling & Medical Admission Guidance",
  description:
    "Learn how Dravio helps students and parents make informed medical college admission decisions through expert guidance.",
  path: "/about-us",
});

export default function AboutPage() {
  return <AboutPageView />;
}
