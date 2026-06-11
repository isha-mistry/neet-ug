"use client";

import React from "react";
import Image from "next/image";
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
          padded={false}
          bordered
          className="overflow-hidden rounded-lg border-clinical-outline bg-clinical-surface shadow-sm transition-colors duration-200 hover:border-clinical-outline-strong"
        >
          <div className="relative h-40 w-full overflow-hidden bg-clinical-surface-low">
            <Image
              src="/brand/college_building.png"
              alt=""
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
            <span className="absolute right-3 top-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/90 text-amber-600 ring-1 ring-amber-100">
              <MaterialSymbol name={col.icon} size="sm" />
            </span>
          </div>

          <div className="flex flex-col gap-4 p-5">
            <div>
              <h4 className="text-base font-bold leading-snug text-clinical-navy">
                {col.name}
              </h4>
              <span className="mt-0.5 block text-xs text-clinical-muted">
                {col.location}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 border-t border-clinical-outline pt-3 text-xs">
              <div>
                <span className="block font-medium text-clinical-muted">NRI Tuition Fee</span>
                <span className="mt-0.5 block font-extrabold text-clinical-blue">{col.annualFee} / yr</span>
              </div>
              <div>
                <span className="block font-medium text-clinical-muted">Allocated Seats</span>
                <span className="mt-0.5 block font-bold text-clinical-navy">{col.totalSeats}</span>
              </div>
            </div>

            <span className="rounded-md border border-clinical-outline bg-clinical-surface-low py-1 text-center text-[10px] font-bold uppercase tracking-wider text-clinical-muted">
              {col.rating}
            </span>
          </div>
        </Card>
      ))}
    </div>
  );
}
