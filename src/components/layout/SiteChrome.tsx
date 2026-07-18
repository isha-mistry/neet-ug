import type { ReactNode } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

/** Marketing / colleges shell: global nav + footer around page content. */
export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main id="main-content" className="flex-1 bg-surface-container-lowest">
        {children}
      </main>
      <Footer />
    </div>
  );
}
