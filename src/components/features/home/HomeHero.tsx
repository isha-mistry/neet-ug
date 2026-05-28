import Link from "next/link";
import type { HomeHeroContent } from "@/types/site";
import Image from "next/image";

interface HomeHeroProps {
  content: HomeHeroContent;
}

export function HomeHero({ content }: HomeHeroProps) {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 items-center gap-stack-lg py-stack-lg">
      <div className="z-10 text-center lg:text-left">
        <div className="inline-flex items-center gap-2 bg-primary-fixed text-on-primary-fixed px-3 py-1 rounded-full text-label-sm font-label-sm mb-6">
          <span className="material-symbols-outlined text-sm">verified</span>
          {content.eyebrow}
        </div>
        <h1 className="font-headline-xl text-headline-xl text-primary mb-6 leading-tight">
          {content.title}
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-xl mx-auto lg:mx-0">
          {content.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
          <Link
            href={content.primaryCta.href}
            className="w-full sm:w-auto px-8 py-4 bg-primary text-on-primary rounded-xl font-label-md text-label-md flex items-center justify-center gap-2 hover:shadow-lg transition-all active:scale-95"
          >
            {content.primaryCta.label}
            <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
          <Link
            href={content.secondaryCta.href}
            className="w-full sm:w-auto px-8 py-4 border border-outline text-primary rounded-xl font-label-md text-label-md flex items-center justify-center gap-2 hover:bg-surface-container-low transition-all"
          >
            <span className="material-symbols-outlined">compare_arrows</span>
            {content.secondaryCta.label}
          </Link>
        </div>
      </div>
      <div className="relative hidden lg:block">
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-secondary-container/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-primary-container/10 rounded-full blur-3xl"></div>
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform rotate-2 hover:rotate-0 transition-transform duration-500">
          <Image
            alt="Medical Student"
            className="w-full h-auto object-cover"
            src="/brand/home/hero.png"
            width={600}
            height={300}
          />
        </div>
      </div>
    </div>
  );
}
