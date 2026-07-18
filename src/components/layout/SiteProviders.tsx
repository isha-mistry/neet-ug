"use client";

import type { ReactNode } from "react";
import { BookCounsellingModalProvider } from "@/components/features/leads/BookCounsellingModalProvider";
import { BookCounsellingScrollPrompt } from "@/components/features/leads/BookCounsellingScrollPrompt";

export function SiteProviders({ children }: { children: ReactNode }) {
  return (
    <BookCounsellingModalProvider>
      {children}
      <BookCounsellingScrollPrompt />
    </BookCounsellingModalProvider>
  );
}
