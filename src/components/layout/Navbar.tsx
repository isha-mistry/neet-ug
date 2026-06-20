import { FiCalendar } from "react-icons/fi";
import { getSiteIdentity } from "@/lib/data/site";
import { COUNSEL_BOOK_CALL_URL } from "@/lib/mbbs-state/constants";
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
          className="min-w-0 shrink text-primary [&_span:last-child]:truncate [&_span:last-child]:font-headline-md [&_span:last-child]:text-headline-md [&_span:last-child]:font-bold max-sm:[&_span:last-child]:text-base"
        />
        <PrimaryNav
          links={site.primaryNav}
          homeLinks={HOME_NAV_LINKS}
          quotaLinks={quotaLinks}
          predictorLinks={PREDICTOR_NAV_LINKS}
        />
        <div className="flex shrink-0 items-center gap-2 self-center">
          <Button
            as="link"
            href={COUNSEL_BOOK_CALL_URL}
            variant="primary"
            size="sm"
            leadingIcon={<FiCalendar aria-hidden="true" />}
            className="hidden lg:inline-flex"
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
