import Link from "next/link";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { PageHeader } from "@/components/common/PageHeader";
import { ContentPageShell } from "@/components/features/content/ContentPageShell";
import { Card } from "@/components/ui/Card";
import { LEGAL_POLICY_LINKS } from "@/lib/legal/policy-links";
import type { LegalDocument } from "@/lib/legal/types";
import { cn } from "@/lib/utils";

interface LegalDocumentViewProps {
  document: LegalDocument;
}

export function LegalDocumentView({ document }: LegalDocumentViewProps) {
  const otherPolicies = LEGAL_POLICY_LINKS.filter((link) => link.href !== document.path);

  return (
    <ContentPageShell>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: document.title },
        ]}
      />
      <PageHeader
        belowNav
        eyebrow={`Last updated · ${document.lastUpdated}`}
        title={document.title}
        description={document.description}
      />

      <div className="flex flex-col gap-6">
        {document.sections.map((section) => (
          <Card key={section.heading} padded bordered id={slugifyHeading(section.heading)}>
            <h2 className="text-xl font-semibold tracking-snug text-on-surface">
              {section.heading}
            </h2>
            <div className="mt-3 space-y-3">
              {section.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-sm leading-relaxed text-on-surface-variant"
                >
                  {paragraph}
                </p>
              ))}
              {section.bullets?.length ? (
                <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-on-surface-variant">
                  {section.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          </Card>
        ))}
      </div>

      <nav
        aria-label="Related policies"
        className="rounded-xl border border-outline-variant/50 bg-surface-container-low p-5 md:p-6"
      >
        <p className="text-sm font-semibold text-on-surface">Related policies</p>
        <ul className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-6">
          {otherPolicies.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium text-primary transition-colors hover:text-primary/80"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/contact"
              className={cn(
                "text-sm font-medium text-on-surface-variant transition-colors hover:text-primary"
              )}
            >
              Contact us
            </Link>
          </li>
        </ul>
      </nav>
    </ContentPageShell>
  );
}

function slugifyHeading(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
