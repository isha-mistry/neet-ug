import Link from "next/link";
import { FiBarChart2 } from "react-icons/fi";
import { getSiteIdentity } from "@/lib/data/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/common/Container";
import { BrandMark } from "./BrandMark";
import { MobileMenu } from "./MobileMenu";

export function Navbar() {
  const site = getSiteIdentity();
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur">
      <Container size="2xl" className="flex h-16 items-center justify-between gap-4">
        <BrandMark brandName={site.brandName} />
        <nav
          aria-label="Primary"
          className="hidden flex-1 items-center justify-center gap-1 md:flex"
        >
          {site.primaryNav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-[var(--radius-md)] px-3 py-2 text-sm font-semibold tracking-wide text-text-secondary transition-colors hover:bg-brand-50 hover:text-brand-700"
            >
              {link.label}
            </Link>
          ))}
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
          <MobileMenu links={site.primaryNav} />
        </div>
      </Container>
    </header>
  );
}
