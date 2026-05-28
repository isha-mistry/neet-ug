import type { ReactNode } from "react";
import { Container } from "@/components/common/Container";
import { DataSourceNotice } from "@/components/common/DataSourceNotice";

export default function CollegesLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <section className="py-10 md:py-14">
      <Container size="2xl" className="flex flex-col gap-8">
        {children}
        <DataSourceNotice />
      </Container>
    </section>
  );
}
