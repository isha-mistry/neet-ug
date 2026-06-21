import { getSiteIdentity } from "@/lib/data/site";
import { PREDICTOR_NAV_LINKS } from "@/lib/navigation/predictor-nav";
import { QUOTA_NAV_LINKS } from "@/lib/navigation/quota-nav";
import { BookCounsellingTrigger } from "@/components/features/leads/BookCounsellingTrigger";
import { Container } from "@/components/common/Container";
import { BrandMark } from "./BrandMark";
import { MobileMenu } from "./MobileMenu";
import { PrimaryNav } from "./PrimaryNav";

export function Navbar() {
  const site = getSiteIdentity();
  const quotaLinks = QUOTA_NAV_LINKS;

  return (
    <header className="site-header sticky top-0 z-50 border-b border-outline-variant bg-surface">
      <Container
        size="page"
        className="flex h-16 min-h-16 items-center justify-between gap-3 py-0 md:gap-4"
      >
        <BrandMark brandName={site.brandName} inHeaderBar />
        <PrimaryNav
          links={site.primaryNav}
          quotaLinks={quotaLinks}
          predictorLinks={PREDICTOR_NAV_LINKS}
        />
        <div className="flex h-16 min-h-16 shrink-0 items-center gap-1.5 sm:gap-2">
          <BookCounsellingTrigger
            source="navbar"
            className="h-7 min-h-0 gap-0.5 px-2 text-[11px] font-semibold lg:h-9 lg:gap-2 lg:px-3.5 lg:text-[13px]"
          />
          <MobileMenu
            links={site.primaryNav}
            quotaLinks={quotaLinks}
            predictorLinks={PREDICTOR_NAV_LINKS}
          />
        </div>
      </Container>
    </header>
  );
}
