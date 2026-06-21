import Link from "next/link";
import { FiMessageCircle } from "react-icons/fi";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/ui/Button";
import { BookCounsellingTrigger } from "@/components/features/leads/BookCounsellingTrigger";
import { getSiteIdentity } from "@/lib/data/site";
import { FOOTER_QUOTA_LINKS } from "@/lib/navigation/footer-nav";
import { NEET_UG_2026_NAV_LINKS } from "@/lib/navigation/neet-ug-2026-nav";
import { PREDICTOR_NAV_LINKS } from "@/lib/navigation/predictor-nav";
import { COUNSEL_WHATSAPP_URL } from "@/lib/mbbs-state/constants";
import type { NavSection } from "@/types/core";
import { LEGAL_POLICY_LINKS } from "@/lib/legal/policy-links";
import { cn } from "@/lib/utils";
import { BrandMark } from "./BrandMark";

function FooterLinkColumn({
  column,
  className,
}: {
  column: NavSection;
  className?: string;
}) {
  return (
    <div className={cn("flex min-w-0 flex-col gap-3.5", className)}>
      <h3 className="text-[11px] font-bold uppercase tracking-[0.12em] text-on-surface">
        {column.title}
      </h3>
      <ul className="flex flex-col gap-2.5">
        {column.links.map((link) => (
          <li key={`${column.title}-${link.href}-${link.label}`}>
            <Link
              href={link.href}
              className="text-sm leading-snug text-on-surface-variant transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function buildLinkColumns(site: ReturnType<typeof getSiteIdentity>): NavSection[] {
  const explore = site.footer.columns.find((column) => column.title === "Explore");
  const states = site.footer.columns.find(
    (column) => column.title === "Medical Colleges in India"
  );
  const decisionTools = site.footer.columns.find((column) => column.title === "Decision Tools");
  const dravio = site.footer.columns.find((column) => column.title === "Dravio");

  const exploreLinks = [
    ...(explore?.links ?? []),
    ...(decisionTools?.links.filter((link) => link.href !== "/quota/general") ?? []),
  ];

  const uniqueExplore = exploreLinks.filter(
    (link, index, arr) => arr.findIndex((item) => item.href === link.href) === index
  );

  const columns: NavSection[] = [
    { title: "Predictors", links: PREDICTOR_NAV_LINKS },
    { title: "NEET 2026", links: NEET_UG_2026_NAV_LINKS },
    { title: "Quota guides", links: FOOTER_QUOTA_LINKS },
  ];

  if (uniqueExplore.length > 0) {
    columns.push({ title: "Explore colleges", links: uniqueExplore });
  }

  if (states) {
    columns.push({ title: "MBBS by state", links: states.links });
  }

  if (dravio) {
    columns.push({ title: "Dravio", links: dravio.links });
  }

  return columns;
}

export function Footer() {
  const site = getSiteIdentity();
  const year = new Date().getFullYear();
  const linkColumns = buildLinkColumns(site);

  return (
    <footer className="border-t border-outline-variant/50 bg-surface-container-low">
      <Container size="page" className="py-14 md:py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-16 xl:grid-cols-[minmax(0,24rem)_1fr] xl:gap-20">
          <div className="flex flex-col gap-5">
            <BrandMark brandName={site.brandName} />
            <p className="text-base font-semibold leading-snug text-on-surface">{site.tagline}</p>
            <p className="max-w-sm text-sm leading-relaxed text-on-surface-variant">
              {site.description}
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <BookCounsellingTrigger
                source="footer"
                label="Book a Counselling"
                shortLabel="Book a Counselling"
              />
              <Button
                as="link"
                href={COUNSEL_WHATSAPP_URL}
                variant="outline"
                size="sm"
                leadingIcon={<FiMessageCircle aria-hidden="true" />}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3">
            {linkColumns.map((column) => (
              <FooterLinkColumn key={column.title} column={column} />
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-5 border-t border-outline-variant/40 pt-8 md:mt-14 md:flex-row md:items-end md:justify-between md:gap-8">
          <p className="max-w-3xl text-xs leading-relaxed text-on-surface-variant">
            {site.footer.legal}
          </p>
          <div className="flex shrink-0 flex-col gap-2 text-xs text-on-surface-variant sm:flex-row sm:items-center sm:flex-wrap sm:gap-x-3 sm:gap-y-1">
            {LEGAL_POLICY_LINKS.map((link, index) => (
              <span key={link.href} className="inline-flex items-center gap-3">
                {index > 0 ? (
                  <span className="hidden text-outline-variant sm:inline" aria-hidden>
                    ·
                  </span>
                ) : null}
                <Link href={link.href} className="font-medium transition-colors hover:text-primary">
                  {link.label}
                </Link>
              </span>
            ))}
            <span className="hidden text-outline-variant sm:inline" aria-hidden>
              ·
            </span>
            <p className="text-on-surface-variant/90">
              © {year} {site.brandName}
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
