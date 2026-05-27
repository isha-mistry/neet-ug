import type { ReactNode } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/common/Container";

export default function CollegesLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main id="main-content" className="flex-1 py-10 md:py-14">
        <Container size="2xl" className="flex flex-col gap-8">
          {children}
        </Container>
      </main>
      <Footer />
    </div>
  );
}
