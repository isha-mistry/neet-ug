import type { Metadata } from "next";
import { AdminWhatsAppView } from "@/components/features/admin/AdminWhatsAppView";

export const metadata: Metadata = {
  title: "WhatsApp",
  robots: { index: false, follow: false },
};

export default function AdminWhatsAppPage() {
  return <AdminWhatsAppView />;
}
