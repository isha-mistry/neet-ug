import type { Metadata } from "next";
import { ContactView } from "@/components/features/contact/ContactView";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us - NEET UG Counselling & Medical Admissions Support | MedSeat",
  description:
    "Have questions about NEET counselling, college selection, cutoff ranks, or MBBS admissions? Request a callback or send an inquiry to the MedSeat expert support desk.",
  path: "/contact",
});

export default function ContactPage() {
  return <ContactView />;
}
