import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { MaterialSymbol } from "@/components/common/MaterialSymbol";
import { neetLabelClass } from "@/lib/neet-ug-2026/design-system";
import { cn } from "@/lib/utils";

export interface QuickLink {
  label: string;
  href: string;
  external?: boolean;
}

interface QuickLinksCardProps {
  title?: string;
  links: QuickLink[];
}

export function QuickLinksCard({
  title = "Quick Links",
  links,
}: QuickLinksCardProps) {
  return (
    <Card padded={false} className="p-5">
      <h3 className={cn(neetLabelClass, "mb-3 text-outline")}>{title}</h3>
      <ul className="flex flex-col divide-y divide-outline-variant">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="group flex items-center justify-between gap-4 py-3 text-sm font-semibold text-on-surface-variant no-underline transition-colors hover:text-primary"
            >
              <span>{link.label}</span>
              <MaterialSymbol
                name={link.external ? "open_in_new" : "chevron_right"}
                size="sm"
                className="text-outline transition-transform duration-200 group-hover:translate-x-1 group-hover:text-primary"
              />
            </Link>
          </li>
        ))}
      </ul>
    </Card>
  );
}