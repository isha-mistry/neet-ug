import Link from "next/link";
import { FiBarChart2, FiChevronDown } from "react-icons/fi";
import { getSiteIdentity } from "@/lib/data/site";
import { getQuotaGuides } from "@/lib/data/content";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/common/Container";
import { BrandMark } from "./BrandMark";
import { MobileMenu } from "./MobileMenu";

export function Navbar() {
  const site = getSiteIdentity();
  const quotaLinks = getQuotaGuides().map((guide) => ({
    label: guide.title.replace(" MBBS Quota Guide", ""),
    href: `/quota/${guide.slug}`,
  }));

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur">
      <Container size="2xl" className="flex h-16 items-center justify-between gap-4">
        <BrandMark brandName={site.brandName} />
        <nav
          aria-label="Primary"
          className="hidden flex-1 items-center justify-center gap-1 md:flex"
        >
          {site.primaryNav.map((link) =>
            link.label === "Quota" ? (
              <div key={link.label} className="group relative">
                <button
                  type="button"
                  className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-semibold tracking-wide text-text-secondary transition-colors hover:bg-brand-50 hover:text-brand-700"
                >
                  <span>Quota</span>
                  <FiChevronDown aria-hidden="true" className="h-4 w-4" />
                </button>
                <div className="invisible absolute left-0 top-full z-40 mt-1 w-64 rounded-md border border-border bg-background p-2 opacity-0 shadow-(--shadow-md) transition-all group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  {quotaLinks.map((quota) => (
                    <Link
                      key={quota.href}
                      href={quota.href}
                      className="block rounded-md px-3 py-2 text-sm font-semibold tracking-wide text-text-secondary transition-colors hover:bg-brand-50 hover:text-brand-700"
                    >
                      {quota.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-2 text-sm font-semibold tracking-wide text-text-secondary transition-colors hover:bg-brand-50 hover:text-brand-700"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>
        <div className="flex items-center gap-2">
          <Button
            as="link"
            href="/compare"
            variant="primary"
            size="sm"
            leadingIcon={<FiBarChart2 aria-hidden="true" />}
            className="hidden md:inline-flex"
          >
            Compare
          </Button>
          <MobileMenu links={site.primaryNav} quotaLinks={quotaLinks} />
        </div>
      </Container>
    </header>
  );
}
