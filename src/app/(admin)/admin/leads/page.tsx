import type { Metadata } from "next";
import { AdminLeadsView } from "@/components/features/admin/AdminLeadsView";

export const metadata: Metadata = {
  title: "Leads",
  robots: { index: false, follow: false },
};

export default function AdminLeadsPage() {
  return <AdminLeadsView />;
}
