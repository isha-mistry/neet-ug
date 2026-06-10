import { UgCounsellingGuideView } from "@/components/features/neet-ug/UgCounsellingGuideView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NEET UG 2026 MCC Counselling Guide — Seat Matrix, Rounds & Official Portals | MedSeat",
  description:
    "Complete NEET UG 2026 MCC counselling guide: registration process, round-wise schedule, seat matrix across MBBS/BDS/AYUSH, official portals for MCC, AACCC, VCI, and state DME authorities.",
};

export default function UgCounsellingGuidePage() {
  return <UgCounsellingGuideView />;
}
