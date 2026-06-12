"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import type { CollegeSeatMatrix } from "@/types/college";
import { formatNumber } from "@/lib/utils";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  LabelList,
} from "recharts";
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
      color: "var(--color-brand-100)" // Light blue
    },
    {
      label: "State Quota",
      value: seatMatrix.stateQuota,
      color: "var(--color-brand-700)" // Deep blue
    },
    {
      label: "ESIC Quota",
      value: seatMatrix.esic,
      color: "var(--color-brand-400)"
    },
    {
      label: "Management",
      value: seatMatrix.management,
      color: "var(--color-brand-200)" // Sky blue
    },
    {
      label: "NRI Quota",
      value: seatMatrix.nri,
      color: "var(--color-brand-300)" // Light cyan
    },
  ].filter((q) => q.value > 0);

  const activeQuotas = quotas.filter((q) => q.value > 0);

  const totalQuotaSeats = activeQuotas.reduce((sum, q) => sum + q.value, 0);
  const totalCategorySeats = Object.values(
    seatMatrix.categoryDistribution,
  ).reduce((sum, val) => sum + val, 0);

  /** Categories (Open, SC, …) subdivide state or AIQ pools — not the full institute intake. */
  const categoryShareBase =
    seatMatrix.stateQuota > 0
      ? seatMatrix.stateQuota
      : seatMatrix.aiq > 0
        ? seatMatrix.aiq
        : totalCategorySeats;

  const hasQuotaData = totalQuotaSeats > 0;
  const hasCategoryData = totalCategorySeats > 0;
  const hasAnyData = hasQuotaData || hasCategoryData;

  // Check if AIQ represents 100% of the quota seats
  const isAiq100 =
    seatMatrix.aiq > 0 &&
    (seatMatrix.aiq === totalQuotaSeats ||
      (seatMatrix.stateQuota === 0 &&
        seatMatrix.esic === 0 &&
        seatMatrix.management === 0 &&
        seatMatrix.nri === 0));

  // Prepare chart data for Quota Distribution Donut Chart
  const quotaChartData = activeQuotas.map((q) => {
    const pct = totalQuotaSeats > 0 ? (q.value / totalQuotaSeats) * 100 : 0;
    return {
      name: q.label,
      value: q.value,
      color: q.color,
      percentage: pct
    };
  });

  // Prepare chart data for Category-wise seats horizontal bar chart
  const categoryChartData = Object.entries(
    seatMatrix.categoryDistribution,
  ).map(([category, count]) => {
    const percentage =
      categoryShareBase > 0 ? (count / categoryShareBase) * 100 : 0;
    return {
      name: category.toUpperCase(),
      seats: count,
      percentage,
    };
  });

  const categoryScopeLabel = isAiq100
    ? "Within AIQ"
    : seatMatrix.stateQuota > 0
      ? "Within state quota"
      : "Categories";

  // Category color mapper using cohesive shades from the MedSeat blue/teal palette
  const getCategoryColor = (catName: string) => {
    const name = catName.toLowerCase();
    if (name.includes("open") || name.includes("gen") || name === "op") {
      return "var(--color-brand-700)"; // #003d9b - Dark Blue
    }
    if (name.includes("obc") || name.includes("sebc") || name === "se") {
      return "var(--color-on-secondary-container)"; // #005f71 - Dark Teal
    }
    if (name === "ews") {
      return "var(--color-secondary)"; // #00687b - Teal
    }
    if (name === "sc") {
      return "var(--color-secondary-fixed-dim)"; // #48d7f9 - Sky Blue
    }
    if (name === "st") {
      return "var(--color-primary-fixed-dim)"; // #b2c5ff - Light Blue
    }
    return "var(--color-outline)";
  };

  // Custom tooltips for Recharts donut chart
  const CustomQuotaTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="border border-border p-3 rounded-xl flex flex-col gap-0.5 bg-surface-container-lowest shadow-level-2 z-50 animate-fadeIn">
          <div className="flex items-center gap-1.5">
            <span 
              className="h-2.5 w-2.5 rounded-full" 
              style={{ backgroundColor: data.color }} 
            />
            <span className="text-[9px] font-bold uppercase tracking-wider text-text-secondary">
              {payload[0].name}
            </span>
          </div>
          <div className="text-sm font-extrabold text-text mt-0.5">
            {formatNumber(payload[0].value)} <span className="text-xs font-normal text-text-muted">Seats</span>
          </div>
          {data.percentage !== undefined && (
            <span className="text-[9px] text-text-muted font-medium">
              Share: {data.percentage.toFixed(1)}%
            </span>
          )}
        </div>
      );
    }
    return null;
  };

  // Custom tooltips for Recharts category bar chart
  const CustomCategoryTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="border border-border p-3 rounded-xl flex flex-col gap-0.5 bg-surface-container-lowest shadow-level-2 z-50 animate-fadeIn">
          <span className="text-[9px] font-bold uppercase tracking-widest text-text-muted">
            {data.name}
          </span>
          <div className="text-sm font-extrabold text-text mt-0.5">
            {formatNumber(data.seats)} <span className="text-xs font-normal text-text-muted">Seats</span>
          </div>
          <span className="text-[9px] text-brand-700 font-medium">
            Share: {data.percentage.toFixed(1)}%
          </span>
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
        description="Quota split (AIQ, state, management, NRI) and reservation breakdown within the state or AIQ pool"
        theme="emerald"
      />
      
      {!hasAnyData ? (
        <Card padded className="flex flex-col items-center justify-center gap-3 text-center py-14 border border-border shadow-xs rounded-2xl bg-surface-container-lowest">
          <div className="rounded-full p-3 bg-emerald-50 text-emerald-800">
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
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
          {/* Left Column: Quota Distribution Donut Chart (Redesigned Up-Down Layout) */}
          <Card padded className="flex flex-col gap-4 bg-surface-container-lowest border border-border shadow-level-1 rounded-3xl p-6 md:p-8">
            <h3 className="font-extrabold text-lg text-text">Quota Distribution</h3>
            
            {hasQuotaData ? (
              <div className="flex flex-col items-center gap-6 py-2">
                {/* Interactive Donut Chart (Top Side) */}
                <div className="relative w-44 h-44 shrink-0 flex items-center justify-center">
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
                    <span className="text-3xl font-black tracking-tight text-text">
                      {formatNumber(totalQuotaSeats)}
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-text-muted mt-0.5">
                      Total
                    </span>
                  </div>
                  
                  {mounted ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={quotaChartData}
                          cx="50%"
                          cy="50%"
                          innerRadius={55}
                          outerRadius={75}
                          paddingAngle={3}
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
                          content={<CustomQuotaTooltip />} 
                          cursor={false} 
                          wrapperStyle={{ zIndex: 1000, outline: "none" }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-xs font-semibold text-text-muted animate-pulse">
                      Loading...
                    </div>
                  )}
                </div>
                
                {/* Legend List (Bottom Side - Stacked chips) */}
                <div className="flex flex-col gap-3 w-full border-t border-border/60 pt-4">
                  {quotaChartData.map((quota, idx) => {
                    return (
                      <div 
                        key={idx} 
                        className="flex items-center justify-between p-3.5 rounded-2xl bg-surface-container-low/20 border border-border/40 hover:border-brand-300 hover:bg-surface-container-low/40 transition-all duration-300 shadow-xs"
                      >
                        <div className="flex items-center gap-2.5 text-text-secondary font-bold text-xs md:text-sm">
                          <span 
                            className="h-3.5 w-3.5 rounded-full flex-shrink-0 shadow-xs border border-white" 
                            style={{ backgroundColor: quota.color }} 
                          />
                          <span>{quota.name}</span>
                        </div>
                        <div className="font-extrabold text-text text-sm md:text-base">
                          {formatNumber(quota.value)}{" "}
                          <span className="text-xs font-semibold text-text-muted">
                            ({quota.percentage.toFixed(1)}%)
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
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

          {/* Right Column: Category-wise Distribution Bar Chart (Statistics displayed by default next to bars) */}
          <Card padded className="flex flex-col gap-4 bg-surface-container-lowest border border-border shadow-level-1 rounded-3xl p-6 md:p-8">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="font-extrabold text-lg text-text">Category-wise Seats</h3>
              {hasCategoryData && (
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md border shadow-xs bg-surface-container-low text-text-muted border-border">
                  {categoryScopeLabel}
                </span>
              )}
            </div>
            
            {hasCategoryData ? (
              <div className="h-72 w-full pt-2">
                {mounted ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={categoryChartData}
                      layout="vertical"
                      margin={{ top: 10, right: 130, left: 10, bottom: 5 }}
                    >
                      <XAxis type="number" hide />
                      <YAxis 
                        dataKey="name" 
                        type="category" 
                        axisLine={false} 
                        tickLine={false}
                        tick={{ fill: "var(--color-text-secondary)", fontSize: 11, fontWeight: 700 }}
                        width={60}
                      />
                      <RechartsTooltip 
                        content={<CustomCategoryTooltip />} 
                        cursor={{ fill: "rgba(0,0,0,0.02)" }} 
                        wrapperStyle={{ zIndex: 1000 }}
                      />
                      <Bar 
                        dataKey="seats" 
                        radius={[0, 4, 4, 0]} 
                        barSize={12}
                      >
                        {categoryChartData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={getCategoryColor(entry.name)} 
                          />
                        ))}
                        {/* Display seat count and percentage stats by default */}
                        <LabelList 
                          dataKey="seats" 
                          position="right" 
                          content={(props) => {
                            const { x, y, width, height, value, index } = props;
                            const pct = categoryChartData[index as number]?.percentage;
                            const barWidth = width as number;
                            const barHeight = height as number;
                            const xPos = (x as number) + (isNaN(barWidth) ? 0 : barWidth) + 8;
                            const yPos = (y as number) + (isNaN(barHeight) ? 0 : barHeight) / 2 + 4;
                            return (
                              <text 
                                x={xPos} 
                                y={yPos} 
                                fill="var(--color-text)" 
                                fontSize={10} 
                                fontWeight={800}
                              >
                                {value} Seats ({pct?.toFixed(1)}%)
                              </text>
                            );
                          }} 
                        />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-xs font-semibold text-text-muted animate-pulse">
                    Loading category chart...
                  </div>
                )}
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
