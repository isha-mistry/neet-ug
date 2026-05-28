import type { ReactNode } from "react";
import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";

interface ContentPageShellProps {
  children: ReactNode;
}

export function ContentPageShell({ children }: ContentPageShellProps) {
  return (
    <Section tone="default" className="py-8 md:py-12">
      <Container size="2xl" className="flex flex-col gap-6 md:gap-8">
        {children}
      </Container>
    </Section>
  );
}
