import React from "react";
import { Card } from "@/components/ui/Card";
import { MaterialSymbol } from "@/components/common/MaterialSymbol";

export function NtaHelpdeskCard() {
  return (
    <Card className="rounded-xl border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.045)] text-left">
      <div className="flex flex-col gap-4 text-left">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-rose-50 text-rose-600 border border-rose-100/40">
          <MaterialSymbol name="support_agent" size="lg" />
        </div>
        <div>
          <h3 className="text-[15px] font-extrabold text-slate-950 m-0">
            NTA Official Helpdesk
          </h3>
          <p className="mt-1 text-xs leading-5 text-slate-500">
            For technical support downloading the City Intimation slip or Admit Cards.
          </p>
        </div>
        
        <div className="flex flex-col gap-3.5 border-t border-slate-100 pt-4 text-xs">
          <div className="flex items-start gap-2.5 text-slate-600">
            <MaterialSymbol name="call" size="sm" className="text-slate-400 mt-0.5 shrink-0" />
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Helpline Phones</span>
              <div className="flex flex-wrap gap-x-1.5 items-center mt-0.5 font-sans">
                <a href="tel:011-40759000" className="font-extrabold text-slate-800 hover:text-blue-600 no-underline">011-40759000</a>
                <span className="text-slate-300">/</span>
                <a href="tel:011-69227700" className="font-extrabold text-slate-800 hover:text-blue-600 no-underline">011-69227700</a>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2.5 text-slate-600">
            <MaterialSymbol name="mail" size="sm" className="text-slate-400 mt-0.5 shrink-0" />
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Support Email</span>
              <a href="mailto:neetug2026@nta.ac.in" className="font-extrabold text-slate-800 hover:text-blue-600 mt-0.5 no-underline">neetug2026@nta.ac.in</a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
          <a
            href="https://neet.nta.nic.in"
            target="_blank"
            rel="noopener noreferrer"
            className="h-10 w-full rounded-lg bg-slate-50 hover:bg-slate-100/80 border border-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold no-underline transition-colors cursor-pointer"
          >
            NTA NEET Portal
            <MaterialSymbol name="open_in_new" size="sm" className="ml-1 text-slate-400" />
          </a>
          <a
            href="https://mcc.nic.in"
            target="_blank"
            rel="noopener noreferrer"
            className="h-10 w-full rounded-lg bg-slate-50 hover:bg-slate-100/80 border border-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold no-underline transition-colors cursor-pointer"
          >
            MCC Counselling Site
            <MaterialSymbol name="open_in_new" size="sm" className="ml-1 text-slate-400" />
          </a>
        </div>
      </div>
    </Card>
  );
}
