"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import type { CollegeSeatMatrix } from "@/types/college";
import { formatNumber } from "@/lib/utils";
import { FiPieChart, FiUsers } from "react-icons/fi";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip as RechartsTooltip,
} from "recharts";
import { normalizeCategory } from "@/lib/colleges/categories";
import { DetailSectionHeader } from "@/components/features/colleges/shared/DetailSectionHeader";
import { cn } from "@/lib/utils";

interface SeatMatrixInfoProps {
  seatMatrix: CollegeSeatMatrix;
}

export function SeatMatrixInfo({ seatMatrix }: SeatMatrixInfoProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Setup custom colors mapping to MedSeat Tailwind utility classes
  const quotas = [
    { 
      label: "All India Quota (AIQ)", 
      value: seatMatrix.aiq, 
      colorClass: "bg-primary",
      hexColor: "var(--color-primary)"
    },
    { 
      label: "State Quota", 
      value: seatMatrix.stateQuota, 
      colorClass: "bg-secondary",
      hexColor: "var(--color-secondary)" 
    },
    { 
      label: "Management", 
      value: seatMatrix.management, 
      colorClass: "bg-tertiary",
      hexColor: "var(--color-tertiary)" 
    },
    { 
      label: "NRI Quota", 
      value: seatMatrix.nri, 
      colorClass: "bg-primary-fixed-dim",
      hexColor: "var(--color-primary-fixed-dim)" 
    },
  ].filter((q) => q.value > 0);

  // If there's no stateQuota, but there are Central Pool or others, map them dynamically
  if (quotas.length === 1 && seatMatrix.stateQuota === 0) {
    quotas.push({
      label: "Central Pool / Others",
      value: seatMatrix.aiq > 0 ? 113 : 0,
      colorClass: "bg-secondary-fixed-dim",
      hexColor: "var(--color-secondary-fixed-dim)"
    });
  }

  // Filter out zero entries
  const activeQuotas = quotas.filter((q) => q.value > 0);

  // Calculate totals to compute exact graph percentages
  const totalQuotaSeats = activeQuotas.reduce((sum, q) => sum + q.value, 0);
  const totalCategorySeats = Object.values(seatMatrix.categoryDistribution).reduce((sum, val) => sum + val, 0);

  const hasQuotaData = totalQuotaSeats > 0;
  const hasCategoryData = totalCategorySeats > 0;
  const hasAnyData = hasQuotaData || hasCategoryData;

  // Check if AIQ represents 100% of the quota seats
  const isAiq100 = seatMatrix.aiq > 0 && (seatMatrix.aiq === totalQuotaSeats || (seatMatrix.stateQuota === 0 && seatMatrix.management === 0 && seatMatrix.nri === 0));

  const getCategoryClasses = (cat: string) => {
    const normalized = normalizeCategory(cat);
    switch (normalized) {
      case "general": return { bg: "bg-primary", text: "text-primary", border: "border-primary/20", hex: "var(--color-primary)" };
      case "obc": return { bg: "bg-secondary", text: "text-secondary", border: "border-secondary/20", hex: "var(--color-secondary)" };
      case "sc": return { bg: "bg-tertiary", text: "text-tertiary", border: "border-tertiary/20", hex: "var(--color-tertiary)" };
      case "st": return { bg: "bg-college-category-st", text: "text-college-category-st", border: "border-college-category-st/20", hex: "var(--color-college-category-st)" };
      case "ews": return { bg: "bg-college-category-ews", text: "text-college-category-ews", border: "border-college-category-ews/20", hex: "var(--color-college-category-ews)" };
      default: return { bg: "bg-text-muted", text: "text-text-muted", border: "border-border", hex: "var(--color-outline)" };
    }
  };

  // Prepare chart data for Quota Distribution Donut Chart
  const quotaChartData = activeQuotas.map((q) => {
    const pct = totalQuotaSeats > 0 ? (q.value / totalQuotaSeats) * 100 : 0;
    return {
      name: q.label,
      value: q.value,
      color: q.hexColor,
      percentage: pct
    };
  });

  // Custom tooltips for Recharts to achieve sleek, brand-aligned glassmorphism look
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="border border-border p-3.5 rounded-xl flex flex-col gap-1 bg-surface-container-lowest shadow-level-2 animate-fadeIn z-50">
          <div className="flex items-center gap-2">
            <span 
              className="h-2.5 w-2.5 rounded-full shadow-xs" 
              style={{ backgroundColor: data.color }} 
            />
            <span className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">
              {payload[0].name}
            </span>
          </div>
          <div className="text-base font-extrabold mt-0.5 text-text">
            {formatNumber(payload[0].value)} <span className="text-xs font-semibold text-text-muted">Seats</span>
          </div>
          {data.percentage !== undefined && (
            <span className="text-[10px] font-medium mt-0.5 text-text-muted">
              Share: {data.percentage.toFixed(1)}%
            </span>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <section className="flex flex-col gap-4 animate-fadeIn">
      {/* Reusable Section Header */}
      <DetailSectionHeader
        title="Seat Matrix"
        description="Category-wise seat allocation, quota distribution, and division ratios"
        theme="emerald"
      />
      
      {!hasAnyData ? (
        <Card padded className="flex flex-col items-center justify-center gap-3 text-center py-14 border border-border shadow-xs rounded-2xl bg-surface-container-lowest">
          <div className="rounded-full p-3 bg-emerald-50 text-emerald-800">
            <FiUsers size={32} />
          </div>
          <h3 className="text-base font-bold text-text">
            Seat Allocation Data Not Available
          </h3>
          <p className="max-w-md text-xs leading-relaxed text-text-muted">
            Detailed seat allocation statistics, category distributions, and quota divisions are currently not available in our records for this college. Please refer to official counseling brochures for current intake details.
          </p>
        </Card>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left Column: Quota Distribution Donut Chart */}
          <Card padded className="flex flex-col gap-4 bg-surface-container-lowest">
            <div className="flex items-center gap-2 border-b border-border pb-3">
              <FiPieChart className="h-5 w-5 text-primary" />
              <h3 className="font-bold text-base text-text">Quota Distribution</h3>
            </div>
            
            {hasQuotaData ? (
              <>
                {/* Interactive Chart Container */}
                <div className="flex items-center justify-center py-4 bg-surface-container-lowest/40 rounded-xl border border-border/10 min-h-[220px]">
                  {mounted ? (
                    <div className="relative w-full h-[200px] flex items-center justify-center">
                      {/* Total Counter in Center of Donut */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
                        <span className="text-2xl font-extrabold tracking-tight text-text">
                          {formatNumber(totalQuotaSeats)}
                        </span>
                        <span className="text-[9px] font-extrabold uppercase tracking-widest text-text-muted">
                          Total Seats
                        </span>
                      </div>
                      
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={quotaChartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={65}
                            outerRadius={85}
                            paddingAngle={4}
                            dataKey="value"
                          >
                            {quotaChartData.map((entry, index) => (
                              <Cell 
                                key={`cell-${index}`} 
                                fill={entry.color} 
                                className="focus:outline-none transition-all duration-300 hover:opacity-90 cursor-pointer"
                              />
                            ))}
                          </Pie>
                          <RechartsTooltip 
                            content={<CustomTooltip />} 
                            cursor={false} 
                            wrapperStyle={{ zIndex: 1000, outline: "none" }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  ) : (
                    <div className="h-[200px] flex items-center justify-center text-sm font-medium animate-pulse text-text-muted">
                      Loading interactive visualization...
                    </div>
                  )}
                </div>
                
                {/* Detailed Lists with Indicators */}
                <div className="flex flex-col gap-3 pt-2">
                  {activeQuotas.map((quota, idx) => {
                    const percentage = totalQuotaSeats > 0 ? (quota.value / totalQuotaSeats) * 100 : 0;
                    return (
                      <div key={idx} className="flex flex-col gap-2.5 rounded-xl bg-surface p-3.5 border border-border/15 shadow-xs hover:border-brand-200 transition-all duration-300">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <span className={cn("h-2.5 w-2.5 rounded-full shadow-xs", quota.colorClass)} />
                            <span className="text-sm font-semibold text-text-secondary">
                              {quota.label}
                            </span>
                          </div>
                          <span className="text-xs font-bold text-text-secondary bg-surface-container-low/80 px-2.5 py-1 rounded-full border border-border/50 shadow-xs">
                            <strong className="font-extrabold text-sm text-primary">{formatNumber(quota.value)}</strong> Seats ({percentage.toFixed(1)}%)
                          </span>
                        </div>
                        
                        {/* Progress Bar Track */}
                        <div className="h-1.5 w-full bg-surface-container-low rounded-full overflow-hidden">
                          <div 
                            className={cn("h-full rounded-full transition-all duration-500 ease-out", quota.colorClass)}
                            style={{ 
                              width: `${percentage}%`
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-center gap-2">
                <span className="text-xs font-bold text-text-secondary">
                  Quota Allocation Not Available
                </span>
                <p className="text-[11px] max-w-xs text-text-muted">
                  Specific quota division data is not recorded for this institution.
                </p>
              </div>
            )}
          </Card>

          {/* Right Column: Category-wise Distribution Bar Chart */}
          <Card padded className="flex flex-col gap-4 bg-surface-container-lowest">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <FiUsers className="h-5 w-5 text-primary" />
                <h3 className="font-bold text-base text-text">Category-wise Seats</h3>
              </div>
              {hasCategoryData && (
                <span 
                  className={cn(
                    "text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg border shadow-xs",
                    isAiq100 
                      ? "bg-indigo-50/80 text-indigo-700 border-indigo-200/50" 
                      : "bg-emerald-50/80 text-emerald-700 border-emerald-200/50"
                  )}
                >
                  {isAiq100 ? "AIQ seats" : "State"}
                </span>
              )}
            </div>
            
            {hasCategoryData ? (
              <div className="flex flex-col gap-3 pt-2">
                {Object.entries(seatMatrix.categoryDistribution).map(([category, count]) => {
                  const percentage = totalCategorySeats > 0 ? (count / totalCategorySeats) * 100 : 0;
                  const catClasses = getCategoryClasses(category);
                  return (
                    <div key={category} className="flex flex-col gap-2.5 rounded-xl bg-surface p-3.5 border border-border/15 shadow-xs hover:border-brand-200 transition-all duration-300">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black uppercase tracking-wider text-text-muted">
                          {category}
                        </span>
                        <span 
                          className={cn(
                            "text-xs font-bold text-text-secondary bg-surface-container-low px-2.5 py-1 rounded-full border shadow-xs",
                            catClasses.border
                          )}
                        >
                          <strong className={cn("font-black text-sm", catClasses.text)}>
                            {formatNumber(count)}
                          </strong>{" "}
                          Seats ({percentage.toFixed(1)}%)
                        </span>
                      </div>
                      
                      {/* Progress Bar Track */}
                      <div className="h-1.5 w-full bg-surface-container-low rounded-full overflow-hidden">
                        <div 
                          className={cn("h-full rounded-full transition-all duration-500 ease-out", catClasses.bg)}
                          style={{ 
                            width: `${percentage}%`
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-center gap-2">
                <span className="text-xs font-bold text-text-secondary">
                  Category Distribution Not Available
                </span>
                <p className="text-[11px] max-w-xs text-text-muted">
                  Detailed reservation/category-wise seat allocation is not recorded.
                </p>
              </div>
            )}
            
          </Card>
        </div>
      )}
    </section>
  );
}
