"use client";

import { WhatsAppCommunityCard } from "@/components/features/neet-ug/shared/WhatsAppCommunityCard";
import {
  NeetUg2026Shell,
  NeetUgHubSidebarPromos,
} from "@/components/features/neet-ug/NeetUg2026Parts";
import { NtaHelpdeskCard } from "@/components/features/neet-ug/shared/NtaHelpdeskCard";
import { cn } from "@/lib/utils";

export function NeetUgUpdatesSidebar({ className }: { className?: string }) {
  return (
    <aside
      className={cn(
        "flex flex-col gap-4 lg:sticky lg:top-[4.25rem] lg:self-start",
        className
      )}
    >
      <NtaHelpdeskCard />
      <WhatsAppCommunityCard />
      <NeetUgHubSidebarPromos />
    </aside>
  );
}

export { NeetUg2026Shell as NeetUgUpdatesShell };
