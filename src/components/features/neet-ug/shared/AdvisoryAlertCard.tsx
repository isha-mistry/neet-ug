"use client";

import React from "react";
import Link from "next/link";
import { MaterialSymbol } from "@/components/common/MaterialSymbol";
import { neetUg2026Data } from "@/lib/data/neet-ug-2026";

interface AdvisoryAlertCardProps {
  showFeedLink?: boolean;
}

export function AdvisoryAlertCard({ showFeedLink = false }: AdvisoryAlertCardProps) {
  const { officialNotice } = neetUg2026Data;

  return (
    <div
      className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 rounded-sm border-l-[4px] border-l-[#d97706] border border-[#fde68a] bg-[#fffbeb] p-6 shadow-sm"
    >
      <div className="flex items-start gap-4 text-left flex-1">
        <span className="mt-0.5 flex shrink-0 text-[#d97706]">
          <MaterialSymbol name="warning" size="md" />
        </span>
        <div className="flex flex-col gap-1 text-left">
          <span className="block text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#b45309]">
            Urgent Official Advisory
          </span>
          <h4 className="text-base md:text-lg font-bold text-[#0f172a] leading-snug tracking-tight">
            {officialNotice.headline.replace("⚠️ OFFICIAL NOTICE: ", "").replace("⚠️", "").trim()}
          </h4>
          <p className="max-w-4xl text-xs md:text-[13px] leading-relaxed text-[#475569] mt-1">
            {officialNotice.subtext} {officialNotice.warning}
          </p>
        </div>
      </div>

      {showFeedLink && (
        <div className="flex shrink-0 pt-1 md:pt-0 self-start md:self-center">
          <Link
            href="/neet-ug-2026/updates"
            className="inline-flex items-center gap-2 bg-white border border-[#e2e8f0] rounded-xl px-4 py-2.5 text-xs font-bold text-[#1e293b] hover:text-[#0c56d0] hover:border-[#0c56d0] transition-all shadow-sm hover:shadow duration-200 no-underline cursor-pointer whitespace-nowrap"
          >
            <span className="w-2 h-2 bg-[#f43f5e] rounded-full animate-pulse shrink-0" />
            Live Updates Feed
          </Link>
        </div>
      )}
    </div>
  );
}
