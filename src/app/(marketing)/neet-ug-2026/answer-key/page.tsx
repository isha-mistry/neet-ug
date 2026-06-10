import { NeetAnswerKeyView } from "@/components/features/neet-ug/NeetAnswerKeyView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NEET UG 2026 Answer Key, OMR Sheet, Results & Cut-off Guide | MedSeat",
  description:
    "Official NTA NEET 2026 answer key process, how to check OMR response sheet, challenge incorrect answers, result scorecard details, tie-breaking criteria, and qualifying cut-off by category.",
};

export default function NeetAnswerKeyPage() {
  return <NeetAnswerKeyView />;
}
