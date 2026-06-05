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
        <Card key={idx} padded bordered className="bg-white/80 hover:bg-white hover:shadow-md transition-shadow rounded-2xl flex flex-col gap-4 border-l-4 border-l-tertiary">
          <div className="flex justify-between items-start gap-2">
            <div>
              <h4 className="font-bold text-text text-base leading-snug">{col.name}</h4>
              <span className="text-xs text-text-muted mt-0.5 block">{col.location}</span>
            </div>
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-tertiary-fixed text-tertiary shrink-0">
              <MaterialSymbol name={col.icon} size="sm" />
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border/50 text-xs">
            <div>
              <span className="text-text-muted block font-medium">NRI Tuition Fee</span>
              <span className="font-extrabold text-tertiary mt-0.5 block">{col.annualFee} / yr</span>
            </div>
            <div>
              <span className="text-text-muted block font-medium">Allocated Seats</span>
              <span className="font-bold text-text mt-0.5 block">{col.totalSeats}</span>
            </div>
          </div>

          <span className="bg-slate-50 border border-slate-100 text-slate-700 text-[10px] font-bold uppercase tracking-wider text-center py-1 rounded">
            {col.rating}
          </span>
        </Card>
      ))}
    </div>
  );
}
