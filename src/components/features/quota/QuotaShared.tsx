"use client";

import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { FiExternalLink, FiDownload, FiArrowRight } from "react-icons/fi";

// ----------------------------------------------------
// 1. Quota Header Component
// ----------------------------------------------------
interface QuotaHeaderProps {
  eyebrow: string;
  title: string;
  highlightedText: string;
  titleSuffix?: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

export function QuotaHeader({
  eyebrow,
  title,
  highlightedText,
  titleSuffix = "",
  description,
  imageSrc,
  imageAlt,
}: QuotaHeaderProps) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
      <div className="lg:col-span-7 space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-primary bg-primary-fixed">
          <span className="material-symbols-outlined text-sm">menu_book</span>
          {eyebrow}
        </div>
        
        <h1 className="font-headline-xl text-headline-xl text-on-surface leading-tight">
          {title} <span className="text-primary">{highlightedText}</span>{titleSuffix ? " " + titleSuffix : ""}
        </h1>
        
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
          {description}
        </p>
      </div>
      
      <div className="lg:col-span-5 relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary-fixed to-secondary-fixed rounded-2xl blur opacity-25"></div>
        <div className="relative rounded-2xl overflow-hidden border border-outline-variant shadow-lg bg-surface-container-lowest">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={500}
            height={320}
            className="w-full h-auto object-cover max-h-[280px]"
            priority
          />
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------
// 2. Quota Metrics Component (Key Facts Card Row)
// ----------------------------------------------------
export interface QuotaMetricItem {
  icon: string;
  label: string;
  value: string;
  caption: string;
}

interface QuotaMetricsProps {
  title?: string;
  metrics: QuotaMetricItem[];
}

export function QuotaMetrics({ title = "Key Facts at a Glance", metrics }: QuotaMetricsProps) {
  return (
    <section className="mb-16">
      {title && (
        <h2 className="text-2xl font-bold font-headline-md text-on-surface mb-6">
          {title}
        </h2>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {metrics.map((metric, idx) => (
          <div
            key={idx}
            className="bg-surface-container-lowest border border-outline-variant rounded-lg p-4 flex flex-col justify-between"
          >
            <div className="flex items-center gap-2 text-primary mb-3">
              <span className="material-symbols-outlined text-xl">{metric.icon}</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
                {metric.label}
              </span>
            </div>
            <div>
              <div className="text-base font-bold text-on-surface mb-0.5">
                {metric.value}
              </div>
              <div className="text-[10px] text-text-muted">
                {metric.caption}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ----------------------------------------------------
// 3. Quota CTA Section
// ----------------------------------------------------
interface QuotaCtaAction {
  label: string;
  href: string;
  variant: "primary" | "secondary";
  isExternal?: boolean;
}

interface QuotaCtaProps {
  title: string;
  description: string;
  actions: QuotaCtaAction[];
  footerNote?: string;
  customGraphic?: ReactNode;
}

export function QuotaCta({ title, description, actions, footerNote, customGraphic }: QuotaCtaProps) {
  return (
    <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary-pressed to-primary text-on-primary p-8 md:p-12 shadow-2xl text-center flex flex-col items-center">
      {/* Background waves overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay">
        <svg className="w-full h-full" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 400 C 150 450, 350 350, 500 400 C 650 450, 750 420, 800 400 L 800 600 L 0 600 Z" fill="currentColor" />
          <path d="M0 300 C 200 250, 400 380, 600 300 C 700 260, 750 280, 800 300 L 800 600 L 0 600 Z" fill="currentColor" />
        </svg>
      </div>

      <div className="relative z-10 max-w-2xl space-y-6 flex flex-col items-center">
        {customGraphic}
        <h2 className="text-2xl md:text-3xl font-bold font-headline-xl text-white">
          {title}
        </h2>
        <p className="text-white/80 text-sm md:text-base leading-relaxed">
          {description}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center w-full max-w-md">
          {actions.map((act, idx) => (
            <Link
              key={idx}
              href={act.href}
              target={act.isExternal ? "_blank" : undefined}
              rel={act.isExternal ? "noopener noreferrer" : undefined}
              className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 font-bold rounded-xl text-sm transition-all duration-200 active:scale-95 cursor-pointer w-full sm:w-auto ${
                act.variant === "primary"
                  ? "bg-white text-primary hover:bg-opacity-95 hover:shadow-lg"
                  : "border border-white/30 hover:border-white/60 text-white hover:bg-white/10"
              }`}
            >
              {act.label}
              {act.isExternal ? (
                <FiExternalLink className="text-sm shrink-0" />
              ) : act.variant === "primary" ? (
                <FiArrowRight className="text-sm shrink-0" />
              ) : (
                <FiDownload className="text-sm shrink-0" />
              )}
            </Link>
          ))}
        </div>

        {footerNote && (
          <p className="text-white/60 text-[10px] uppercase tracking-widest pt-2">
            {footerNote}
          </p>
        )}
      </div>
    </section>
  );
}
