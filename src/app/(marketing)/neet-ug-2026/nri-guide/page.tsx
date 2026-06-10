import { NriAdmissionGuideView } from "@/components/features/neet-ug/NriAdmissionGuideView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NEET UG 2026 Reservation Policy, Category Certificates & NRI MBBS Admission Guide | MedSeat",
  description:
    "Complete guide to NEET UG 2026 reservation policy (SC/ST/OBC/EWS/PwBD), category certificate requirements, AIQ vs state quota, and the NRI MBBS admission process for Deemed and Private institutions.",
};

export default function NriAdmissionGuidePage() {
  return <NriAdmissionGuideView />;
}
