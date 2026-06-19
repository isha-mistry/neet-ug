import { FiCalendar } from "react-icons/fi";
import { getSiteIdentity } from "@/lib/data/site";
import { HOME_NAV_LINKS } from "@/lib/navigation/home-nav";
import { PREDICTOR_NAV_LINKS } from "@/lib/navigation/predictor-nav";
import { QUOTA_NAV_LINKS } from "@/lib/navigation/quota-nav";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/common/Container";
import { BrandMark } from "./BrandMark";
import { MobileMenu } from "./MobileMenu";
import { PrimaryNav } from "./PrimaryNav";

export function Navbar() {
  const site = getSiteIdentity();
  const quotaLinks = QUOTA_NAV_LINKS;

  return (
    <header className="sticky top-0 z-50 border-b border-outline-variant bg-surface">
      <Container
        size="page"
        className="flex h-16 items-center justify-between gap-3 py-0 md:gap-4"
      >
        <BrandMark
          brandName={site.brandName}
          className="shrink-0 text-primary [&_span:last-child]:font-headline-md [&_span:last-child]:text-headline-md [&_span:last-child]:font-bold"
        />
        <PrimaryNav
          links={site.primaryNav}
          homeLinks={HOME_NAV_LINKS}
          quotaLinks={quotaLinks}
          predictorLinks={PREDICTOR_NAV_LINKS}
        />
        <div className="flex shrink-0 items-center gap-2 self-center">
          <Button
            type="button"
            variant="primary"
            size="sm"
            leadingIcon={<FiCalendar aria-hidden="true" />}
            className="hidden md:inline-flex"
          >
            Book a Counselling
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
