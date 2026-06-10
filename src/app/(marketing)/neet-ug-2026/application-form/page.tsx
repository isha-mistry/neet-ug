import { ApplicationFormView } from "@/components/features/neet-ug/ApplicationFormView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NEET UG 2026 Application Form, Admit Card & Exam Day Guide | MedSeat",
  description:
    "Complete guide to NEET UG 2026 application form process, fee structure, correction window, city intimation slip vs admit card comparison, and exam day rules.",
};

export default function NeetApplicationFormPage() {
  return <ApplicationFormView />;
}
