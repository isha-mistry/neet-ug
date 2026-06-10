"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { MaterialSymbol } from "@/components/common/MaterialSymbol";

export function WhatsAppCommunityCard() {
  return (
    <Card
      padded={false}
      className="flex flex-col items-center gap-4 rounded-[12px] border border-slate-200 bg-white p-6 text-center shadow-sm"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-500 ring-8 ring-emerald-50/50">
        <MaterialSymbol name="forum" size="lg" />
      </div>
      <div>
        <h3 className="text-[20px] font-extrabold leading-tight tracking-[-0.02em] text-slate-950">
          Join WhatsApp Community
        </h3>
        <p className="mx-auto mt-2 max-w-[250px] text-xs leading-5 text-slate-500">
          Get immediate push alerts, merit lists, PDF notices, and choice-filling guidelines directly on your phone.
        </p>
      </div>
      <Button
        as="link"
        href="https://wa.me/mock"
        target="_blank"
        rel="noopener noreferrer"
        className="h-11 w-full rounded-[10px] bg-[#22c66f] text-[13px] font-extrabold text-white shadow-none hover:bg-[#1fb565] active:bg-[#1b9f59]"
      >
        Join Channel Now
      </Button>
    </Card>
  );
}
