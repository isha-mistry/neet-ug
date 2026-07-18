import type { Metadata } from "next";
import { AdminLoginForm } from "@/components/features/admin/AdminLoginForm";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-16">
      <AdminLoginForm />
    </div>
  );
}
