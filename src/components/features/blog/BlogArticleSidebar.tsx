"use client";

import { NeetUgLeadMagnetPanel } from "@/components/features/neet-ug/NeetUgLeadMagnetPanel";
import { NeetUgHubSidebarPromos } from "@/components/features/neet-ug/shared/NeetUgHubSidebarPromos";
import { LEAD_FORM_TYPES } from "@/lib/leads/types";
import { cn } from "@/lib/utils";

interface BlogArticleSidebarProps {
  postTitle?: string;
  postId?: string;
  className?: string;
}

export function BlogArticleSidebar({
  postTitle = "NEET UG Blog Article",
  postId = "blog-article",
  className,
}: BlogArticleSidebarProps) {
  return (
    <aside
      className={cn(
        "flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start",
        className
      )}
    >
      <NeetUgLeadMagnetPanel
        pageLabel={`Blog: ${postTitle}`}
        content={{
          formTitle: "Free NEET UG Counselling Help",
          formSubtitle:
            "Connect with senior Dravio medical counsellors for choice-filling assistance, rank prediction analysis, and fee structure guidance.",
          submitLabel: "Get Free Counselling →",
          whatsappIntro: `Hi Dravio team, I need expert counselling help after reading article: ${postTitle}`,
        }}
        formType={LEAD_FORM_TYPES.freeCounselling}
        consentFieldId={`lead-blog-sidebar-${postId}-consent`}
      />

      <div className="flex flex-col gap-4">
        <div className="border-b border-outline-variant pb-2">
          <h3 className="font-headline-sm text-sm font-bold uppercase tracking-wider text-outline">
            Essential Admission Tools
          </h3>
        </div>
        <NeetUgHubSidebarPromos />
      </div>
    </aside>
  );
}
