import type { ReactNode } from "react";
import { Container } from "@/components/common/Container";
import { DataSourceNotice } from "@/components/common/DataSourceNotice";
import { SiteChrome } from "@/components/layout/SiteChrome";

export default function CollegesLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <SiteChrome>
      <section className="pb-10 md:pb-14">
        <Container size="page" className="flex flex-col gap-8">
          {children}
          <DataSourceNotice />
        </Container>
      </section>
    </SiteChrome>
  );
}
