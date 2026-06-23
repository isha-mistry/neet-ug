import type { Metadata } from "next";
import { ContactView } from "@/components/features/contact/ContactView";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Book a Counselling Call",
  metaTitle: "Book a Free NEET UG Counselling Call | Dravio",
  description:
    "Speak with our experts and understand your medical college admission opportunities based on your NEET profile.",
  path: "/contact",
});

export default function ContactPage() {
  return <ContactView />;
}
