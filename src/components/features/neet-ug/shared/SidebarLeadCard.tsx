import React from "react";
import { Card } from "@/components/ui/Card";
import { MaterialSymbol } from "@/components/common/MaterialSymbol";
import { NeetLeadForm } from "@/components/features/neet-ug/NeetLeadForm";
import { neetBadgeClass, neetIconTileClass } from "@/lib/neet-ug-2026/design-system";
import { cn } from "@/lib/utils";

interface SidebarLeadCardProps {
  theme?: "light" | "dark";
  iconName?: string;
  badgeIcon?: string;
  badgeLabel?: string;
  title: string;
  description: string;
  formType?: "email-guide" | "phone-whatsapp" | "whatsapp-alerts";
  ctaText: string;
  successTitle: string;
  successDesc: string;
  showWhatsappHelp?: boolean;
}

export function SidebarLeadCard({
  theme = "light",
  iconName,
  badgeIcon,
  badgeLabel,
  title,
  description,
  formType = "phone-whatsapp",
  ctaText,
  successTitle,
  successDesc,
  showWhatsappHelp = false,
}: SidebarLeadCardProps) {
  const isDark = theme === "dark";

  return (
    <Card
      padded={false}
      className={cn(
        "overflow-hidden",
        isDark && "rp-brand-gradient rp-brand-elevated border-on-primary/15 text-on-primary"
      )}
    >
      <div className={cn("flex flex-col gap-4", isDark ? "p-5" : "p-6")}>
        {badgeLabel ? (
          <span className={cn(neetBadgeClass, "bg-on-primary/10 text-on-primary ring-1 ring-on-primary/15")}>
            {badgeIcon && <MaterialSymbol name={badgeIcon} size="sm" />}
            {badgeLabel}
          </span>
        ) : iconName && !isDark ? (
          <div className={cn(neetIconTileClass, "h-10 w-10 bg-tertiary-fixed text-tertiary")}>
            <MaterialSymbol name={iconName} size="sm" />
          </div>
        ) : iconName && isDark ? (
          <div className="mb-1.5 flex items-center gap-2">
            <MaterialSymbol name={iconName} size="sm" className="text-on-primary" />
            <span className={cn(neetBadgeClass, "bg-on-primary/10 text-on-primary ring-1 ring-on-primary/15")}>
              Expert Guidance
            </span>
          </div>
        ) : null}

        <div>
          <h3
            className={cn(
              "font-extrabold leading-[1.12] tracking-[-0.022em]",
              isDark ? "text-[20px] text-on-primary" : "text-[17px] text-on-surface"
            )}
          >
            {title}
          </h3>
          <p className={cn("mt-2 text-sm leading-[1.6]", isDark ? "text-on-primary/80" : "text-on-surface-variant")}>
            {description}
          </p>
        </div>

        <div className={isDark && badgeLabel ? "rounded-2xl border border-on-primary/15 bg-on-primary/5 p-4" : ""}>
          <NeetLeadForm
            type={formType}
            variant={isDark ? "dark" : "default"}
            ctaText={ctaText}
            successTitle={successTitle}
            successDesc={successDesc}
          />
        </div>
      </div>

      {showWhatsappHelp && isDark && (
        <div className="px-5 pb-5">
          <div className="flex items-center gap-3 rounded-2xl border border-on-primary/15 bg-on-primary/10 p-3">
            <div className="flex shrink-0 items-center justify-center rounded-lg bg-on-primary text-primary">
              <MaterialSymbol name="chat" size="sm" />
            </div>
            <div>
              <p className={cn(neetBadgeClass, "p-0 text-tertiary-fixed")}>WhatsApp Help</p>
              <p className="mt-0.5 text-xs font-medium leading-tight text-on-primary">Enquire via WhatsApp</p>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}