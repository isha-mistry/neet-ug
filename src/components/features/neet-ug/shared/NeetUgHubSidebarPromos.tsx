import { FiArrowRight } from "react-icons/fi";
import { GuideCard } from "@/components/features/neet-ug/shared/NeetUgSharedParts";
import { Button } from "@/components/ui/Button";
import { NEET_UG_HUB_SIDEBAR_TOOLS } from "@/lib/neet-ug-2026/hub-content";

export function NeetUgHubSidebarPromos() {
  return (
    <>
      <GuideCard>
        <div className="flex flex-col gap-3">
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-primary-fixed px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
            <span className="material-symbols-outlined block text-sm leading-none">download</span>
            Free PDF
          </span>
          <h3 className="font-headline-md text-lg font-bold leading-snug text-on-surface">
            NEET 2026 counseling playbook
          </h3>
          <p className="text-sm leading-relaxed text-on-surface-variant">
            Seat matrices, state quota rules, and choice-filling strategy for GJ · RJ · MP · MH + MCC
            AIQ.
          </p>
          <Button as="link" href="/#playbook" variant="secondary" size="md" className="w-full">
            Get the guide
          </Button>
        </div>
      </GuideCard>
      {NEET_UG_HUB_SIDEBAR_TOOLS.map((tool) => (
        <GuideCard key={tool.href}>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3.5">
              <span
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-fixed text-primary"
                aria-hidden
              >
                <span className="material-symbols-outlined block text-[22px] leading-none [font-variation-settings:'FILL'_0,'wght'_500,'GRAD'_0,'opsz'_24]">
                  {tool.icon}
                </span>
              </span>
              <div className="min-w-0 flex-1 space-y-1.5">
                <span className="inline-flex w-fit items-center rounded-full bg-primary-fixed px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                  {tool.eyebrow}
                </span>
                <h3 className="font-headline-md text-base font-bold leading-snug text-on-surface md:text-[1.05rem] md:leading-snug">
                  {tool.title}
                </h3>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-on-surface-variant">{tool.description}</p>
            <Button
              as="link"
              href={tool.href}
              variant="primary"
              size="md"
              fullWidth
              trailingIcon={<FiArrowRight className="text-lg" aria-hidden />}
              className="w-full text-sm font-bold shadow-[0_10px_28px_-12px_color-mix(in_srgb,var(--color-primary)_55%,transparent)]"
            >
              {tool.cta}
            </Button>
          </div>
        </GuideCard>
      ))}
    </>
  );
}
