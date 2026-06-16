import Link from "next/link";
import { GuideCard } from "@/components/features/mbbs-india/MbbsIndiaParts";
import { NEET_UG_NTA_HELPDESK } from "@/lib/neet-ug-2026/hub-content";
import { cn } from "@/lib/utils";

function telHref(display: string) {
  return `tel:${display.replace(/\D/g, "")}`;
}

export function NtaHelpdeskCard({ className }: { className?: string }) {
  const { title, description, phones, email, portalLinks } = NEET_UG_NTA_HELPDESK;

  return (
    <GuideCard className={className}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          <span
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-fixed text-primary"
            aria-hidden
          >
            <span className="material-symbols-outlined block text-[22px] leading-none [font-variation-settings:'FILL'_0,'wght'_500,'GRAD'_0,'opsz'_24]">
              support_agent
            </span>
          </span>
          <div>
            <h3 className="text-base font-bold leading-snug text-on-surface">{title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-on-surface-variant">{description}</p>
          </div>
        </div>

        <div className="flex flex-col gap-3.5 border-t border-outline-variant/50 pt-4">
          <div className="flex items-start gap-2.5">
            <span
              className="material-symbols-outlined mt-0.5 shrink-0 text-lg text-outline"
              aria-hidden
            >
              call
            </span>
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-wider text-outline">
                Helpline phones
              </p>
              <p className="mt-1 text-sm font-bold leading-snug text-on-surface">
                {phones.map((phone, index) => (
                  <span key={phone}>
                    {index > 0 ? (
                      <span className="font-normal text-outline-variant"> / </span>
                    ) : null}
                    <Link
                      href={telHref(phone)}
                      className="text-on-surface hover:text-primary no-underline"
                    >
                      {phone}
                    </Link>
                  </span>
                ))}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <span
              className="material-symbols-outlined mt-0.5 shrink-0 text-lg text-outline"
              aria-hidden
            >
              mail
            </span>
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-wider text-outline">
                Support email
              </p>
              <Link
                href={`mailto:${email}`}
                className="mt-1 block text-sm font-bold text-on-surface hover:text-primary no-underline"
              >
                {email}
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-outline-variant/50 pt-4">
          {portalLinks.map((portal) => (
            <Link
              key={portal.href}
              href={portal.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "flex h-11 w-full items-center justify-center gap-1.5 rounded-xl border border-outline-variant",
                "bg-surface-container-lowest text-sm font-bold text-on-surface no-underline",
                "transition-colors hover:border-primary/35 hover:bg-primary-fixed/40"
              )}
            >
              {portal.label}
              <span className="material-symbols-outlined text-base text-outline" aria-hidden>
                open_in_new
              </span>
            </Link>
          ))}
        </div>
      </div>
    </GuideCard>
  );
}
