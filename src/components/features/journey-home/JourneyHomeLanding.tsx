import "@/styles/journey-home.css";
import { getFaqContent } from "@/lib/data/content";
import { getHomeContent, getSiteIdentity } from "@/lib/data/site";
import { JourneyHomePage } from "./JourneyHomePage";

export function JourneyHomeLanding() {
  const home = getHomeContent();
  const faq = getFaqContent();
  const site = getSiteIdentity();

  return (
    <JourneyHomePage hero={home.hero} faq={faq} brandName={site.brandName} />
  );
}
