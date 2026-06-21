"use client";

import type { ReactNode } from "react";
import { BookCounsellingModalProvider } from "@/components/features/leads/BookCounsellingModalProvider";

export function SiteProviders({ children }: { children: ReactNode }) {
  return <BookCounsellingModalProvider>{children}</BookCounsellingModalProvider>;
}
