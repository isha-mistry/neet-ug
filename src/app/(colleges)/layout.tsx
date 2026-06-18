import type { ReactNode } from "react";
import { Container } from "@/components/common/Container";
import { DataSourceNotice } from "@/components/common/DataSourceNotice";

export default function CollegesLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <section className="pb-10 md:pb-14">
      <Container size="page" className="flex flex-col gap-8">
        {children}
        <DataSourceNotice />
      </Container>
    </section>
  );
}
