import { FiArrowRight, FiBarChart2 } from "react-icons/fi";
import { Button } from "@/components/ui/Button";
import type { HomeHeroContent } from "@/types/site";

interface HomeHeroProps {
  content: HomeHeroContent;
}

export function HomeHero({ content }: HomeHeroProps) {
  return (
    <div className="relative overflow-hidden rounded-[var(--radius-2xl)] border border-border ms-gradient-soft px-6 py-12 md:px-12 md:py-20">
      <div className="relative z-10 flex max-w-3xl flex-col gap-6">
        <span className="inline-flex w-fit items-center rounded-[var(--radius-pill)] border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-brand-800">
          {content.eyebrow}
        </span>
        <h1 className="text-3xl font-bold leading-tight tracking-tight text-text md:text-5xl">
          {content.title}
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-text-secondary md:text-lg">
          {content.subtitle}
        </p>
        <div className="mt-2 flex flex-wrap gap-3">
          <Button
            as="link"
            href={content.primaryCta.href}
            variant="primary"
            size="lg"
            trailingIcon={<FiArrowRight aria-hidden="true" />}
          >
            {content.primaryCta.label}
          </Button>
          <Button
            as="link"
            href={content.secondaryCta.href}
            variant="outline"
            size="lg"
            leadingIcon={<FiBarChart2 aria-hidden="true" />}
          >
            {content.secondaryCta.label}
          </Button>
        </div>
      </div>
    </div>
  );
}
