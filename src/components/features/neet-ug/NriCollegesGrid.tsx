"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { MaterialSymbol } from "@/components/common/MaterialSymbol";

export interface NriCollege {
  name: string;
  location: string;
  annualFee: string;
  totalSeats: string;
  rating: string;
  icon: string;
}

interface NriCollegesGridProps {
  colleges?: NriCollege[];
}

const defaultColleges: NriCollege[] = [
  {
    name: "Kasturba Medical College (KMC)",
    location: "Manipal, Karnataka",
    annualFee: "$44,000 USD",
    totalSeats: "37 NRI Seats",
    rating: "Top Ranked Private",
    icon: "stars",
  },
  {
    name: "Sri Ramachandra Medical College",
    location: "Chennai, Tamil Nadu",
    annualFee: "$25,000 USD",
    totalSeats: "35 NRI Seats",
    rating: "Excellent Infrastructure",
    icon: "apartment",
  },
  {
    name: "Hamdard Institute of Medical Sciences",
    location: "New Delhi, Delhi",
    annualFee: "$35,000 USD",
    totalSeats: "15 NRI Seats",
    rating: "High Clinical Exposure",
    icon: "health_and_safety",
  },
  {
    name: "JSS Medical College",
    location: "Mysore, Karnataka",
    annualFee: "$40,000 USD",
    totalSeats: "30 NRI Seats",
    rating: "Strong Academic Legacy",
    icon: "school",
  },
];

export function NriCollegesGrid({ colleges = defaultColleges }: NriCollegesGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {colleges.map((col, idx) => (
        <Card
          key={idx}
          padded
          bordered
          className="flex flex-col gap-4 rounded-2xl border-clinical-outline border-l-4 border-l-clinical-green bg-clinical-surface shadow-clinical-soft transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-clinical-hover"
        >
          <div className="flex justify-between items-start gap-2">
            <div>
              <h4 className="text-base font-bold leading-snug text-clinical-navy">{col.name}</h4>
              <span className="mt-0.5 block text-xs text-clinical-muted">{col.location}</span>
            </div>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-clinical-green ring-1 ring-emerald-100">
              <MaterialSymbol name={col.icon} size="sm" />
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 border-t border-clinical-outline pt-3 text-xs">
            <div>
              <span className="block font-medium text-clinical-muted">NRI Tuition Fee</span>
              <span className="mt-0.5 block font-extrabold text-clinical-green">{col.annualFee} / yr</span>
            </div>
            <div>
              <span className="block font-medium text-clinical-muted">Allocated Seats</span>
              <span className="mt-0.5 block font-bold text-clinical-navy">{col.totalSeats}</span>
            </div>
          </div>

          <span className="rounded-full border border-clinical-outline bg-clinical-surface-low py-1 text-center text-[10px] font-bold uppercase tracking-wider text-clinical-muted">
            {col.rating}
          </span>
        </Card>
      ))}
    </div>
  );
}
