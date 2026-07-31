import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AdminNav } from "@/components/features/admin/AdminNav";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: {
    default: "Admin · Dravio",
    template: "%s · Admin · Dravio",
  },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-surface-container-lowest text-on-surface">
      <AdminNav />
      {children}
    </div>
  );
}
