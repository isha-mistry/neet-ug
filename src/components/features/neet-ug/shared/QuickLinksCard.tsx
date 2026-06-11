import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { MaterialSymbol } from "@/components/common/MaterialSymbol";

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
    <Card
      padded={false}
      className="rounded-lg border border-clinical-outline bg-clinical-surface p-5 shadow-sm"
    >
      <h3 className="mb-3 text-xs font-extrabold uppercase tracking-[0.14em] text-clinical-muted/70">
        {title}
      </h3>
      <ul className="flex flex-col divide-y divide-clinical-outline">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="group flex items-center justify-between py-3 text-xs font-semibold text-clinical-muted no-underline transition-colors hover:text-clinical-blue"
            >
              <span>{link.label}</span>
              <MaterialSymbol
                name={link.external ? "open_in_new" : "chevron_right"}
                size="sm"
                className="text-clinical-muted/60 group-hover:text-clinical-blue"
              />
            </Link>
          </li>
        ))}
      </ul>
    </Card>
  );
}
