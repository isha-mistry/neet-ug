import React from "react";
import { Card } from "@/components/ui/Card";
import { MaterialSymbol } from "@/components/common/MaterialSymbol";
import { NeetLeadForm } from "@/components/features/neet-ug/NeetLeadForm";

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
      className={`overflow-hidden rounded-lg border shadow-sm ${
        isDark
          ? "border-clinical-dark bg-clinical-dark text-white"
          : "border-clinical-outline bg-clinical-surface"
      }`}
    >
      <div className={`flex flex-col gap-4 ${isDark ? "p-5" : "p-6"}`}>
        {/* Top Icon or Badge */}
        {badgeLabel ? (
          <span className="inline-flex w-fit items-center gap-2 rounded-md bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-200 ring-1 ring-white/10">
            {badgeIcon && <MaterialSymbol name={badgeIcon} size="sm" />}
            {badgeLabel}
          </span>
        ) : iconName && !isDark ? (
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-clinical-green ring-1 ring-emerald-100">
            <MaterialSymbol name={iconName} size="sm" />
          </div>
        ) : iconName && isDark ? (
          <div className="mb-1.5 flex items-center gap-2">
            <MaterialSymbol name={iconName} size="sm" className="text-blue-300" />
            <span className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-blue-200">
              Expert Guidance
            </span>
          </div>
        ) : null}

        {/* Title & Description */}
        <div>
          {isDark && iconName && !badgeLabel ? (
            <h3 className="text-[17px] font-extrabold leading-tight tracking-[-0.01em]">
              {title}
            </h3>
          ) : (
            <h3 className={`${isDark ? "text-[20px]" : "text-[17px]"} font-extrabold leading-tight tracking-[-0.02em] ${!isDark ? "text-clinical-navy" : ""}`}>
              {title}
            </h3>
          )}
          <p className={`mt-2 text-xs leading-5 ${isDark ? "text-white/70" : "text-clinical-muted"}`}>
            {description}
          </p>
        </div>

        {/* Lead Form */}
        <div className={isDark && badgeLabel ? "rounded-xl border border-white/10 bg-white/5 p-4" : ""}>
          <NeetLeadForm
            type={formType}
            variant={isDark ? "dark" : "default"}
            ctaText={ctaText}
            successTitle={successTitle}
            successDesc={successDesc}
          />
        </div>
      </div>

      {/* Optional WhatsApp Row (Only for dark theme currently) */}
      {showWhatsappHelp && isDark && (
        <div className="px-5 pb-5">
          <div className="flex items-center gap-3 rounded-lg border border-green-500/20 bg-green-500/10 p-3">
            <div className="flex shrink-0 items-center justify-center rounded-md bg-green-500">
              <MaterialSymbol name="chat" size="sm" className="text-white" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase leading-none text-green-400">WhatsApp Help</p>
              <p className="mt-0.5 text-[11px] font-medium leading-tight text-white">Enquire via WhatsApp</p>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
