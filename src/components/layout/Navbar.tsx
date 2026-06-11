import { FiBarChart2 } from "react-icons/fi";
import { getSiteIdentity } from "@/lib/data/site";
import { getQuotaGuides } from "@/lib/data/content";
import { HOME_NAV_LINKS } from "@/lib/navigation/home-nav";
import { PREDICTOR_NAV_LINKS } from "@/lib/navigation/predictor-nav";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/common/Container";
import { BrandMark } from "./BrandMark";
import { MobileMenu } from "./MobileMenu";
import { PrimaryNav } from "./PrimaryNav";

export function Navbar() {
  const site = getSiteIdentity();
  const quotaLinks = getQuotaGuides().map((guide) => ({
    label: guide.title.replace(" MBBS Quota Guide", ""),
    href: `/quota/${guide.slug}`,
  }));

  return (
    <header className="sticky top-0 z-50 border-b border-outline-variant bg-surface">
      <Container size="2xl" className="flex h-16 items-center justify-between gap-4 py-2">
        <BrandMark
          brandName={site.brandName}
          className="text-primary [&_span:last-child]:font-headline-md [&_span:last-child]:text-headline-md [&_span:last-child]:font-bold"
        />
        <PrimaryNav
          links={site.primaryNav}
          homeLinks={HOME_NAV_LINKS}
          quotaLinks={quotaLinks}
          predictorLinks={PREDICTOR_NAV_LINKS}
        />
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
          <MobileMenu
            links={site.primaryNav}
            homeLinks={HOME_NAV_LINKS}
            quotaLinks={quotaLinks}
            predictorLinks={PREDICTOR_NAV_LINKS}
          />
        </div>
      </Container>
    </header>
  );
}
