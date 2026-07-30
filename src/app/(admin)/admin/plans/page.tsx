import type { Metadata } from "next";
import { AdminPlansView } from "@/components/features/admin/AdminPlansView";

export const metadata: Metadata = {
  title: "Plans",
  robots: { index: false, follow: false },
};

export default function AdminPlansPage() {
  return <AdminPlansView />;
}
