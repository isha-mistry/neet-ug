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
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  LabelList,
} from "recharts";
import { normalizeCategory } from "@/lib/colleges/categories";

interface SeatMatrixInfoProps {
  seatMatrix: CollegeSeatMatrix;
}

export function SeatMatrixInfo({ seatMatrix }: SeatMatrixInfoProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Setup custom colors for each quota type indicator
  const quotas = [
    { 
      label: "All India Quota (AIQ)", 
      value: seatMatrix.aiq, 
      colorClass: "bg-brand-500",
      hexColor: "#003d9b" // Mapped from var(--color-primary) / var(--color-brand-500)
    },
    { 
      label: "State Quota", 
      value: seatMatrix.stateQuota, 
      colorClass: "bg-emerald-500",
      hexColor: "#10b981" 
    },
    { 
      label: "Management", 
      value: seatMatrix.management, 
      colorClass: "bg-amber-500",
      hexColor: "#f59e0b" 
    },
    { 
      label: "NRI Quota", 
      value: seatMatrix.nri, 
      colorClass: "bg-indigo-500",
      hexColor: "#6366f1" 
    },
  ].filter((q) => q.value > 0);

  // If there's no stateQuota, but there are Central Pool or others, map them dynamically
  if (quotas.length === 1 && seatMatrix.stateQuota === 0) {
    quotas.push({
      label: "Central Pool / Others",
      value: seatMatrix.aiq > 0 ? 113 : 0,
      colorClass: "bg-teal-500",
      hexColor: "#14b8a6"
    });
  }

  // Filter out zero entries
  const activeQuotas = quotas.filter((q) => q.value > 0);

  // Calculate totals to compute exact graph percentages
  const totalQuotaSeats = activeQuotas.reduce((sum, q) => sum + q.value, 0);
  const totalCategorySeats = Object.values(seatMatrix.categoryDistribution).reduce((sum, val) => sum + val, 0);

  // Check if AIQ represents 100% of the quota seats
  const isAiq100 = seatMatrix.aiq > 0 && (seatMatrix.aiq === totalQuotaSeats || (seatMatrix.stateQuota === 0 && seatMatrix.management === 0 && seatMatrix.nri === 0));


  const getCategoryHexColor = (cat: string) => {
    const normalized = normalizeCategory(cat);
    switch (normalized) {
      case "general": return "#003d9b"; // Primary Blue
      case "obc": return "#10b981"; // Emerald
      case "sc": return "#f59e0b"; // Amber
      case "st": return "#6366f1"; // Indigo
      case "ews": return "#8b5cf6"; // Violet/Purple
      default: return "#64748b"; // Slate
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

  // Prepare chart data for Category-wise horizontal Bar Chart
  const categoryChartData = Object.entries(seatMatrix.categoryDistribution).map(([category, count]) => {
    const pct = totalCategorySeats > 0 ? (count / totalCategorySeats) * 100 : 0;
    return {
      name: category.toUpperCase(),
      value: count,
      color: getCategoryHexColor(category),
      percentage: pct
    };
  });

  // Custom tooltips for Recharts to achieve sleek, brand-aligned glassmorphism look
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-surface-elevated/95 backdrop-blur-md border border-border p-3.5 rounded-xl shadow-level-2 flex flex-col gap-1 animate-fadeIn z-50">
          <div className="flex items-center gap-2">
            <span 
              className="h-2.5 w-2.5 rounded-full shadow-sm" 
              style={{ backgroundColor: data.color }} 
            />
            <span className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">
              {payload[0].name}
            </span>
          </div>
          <div className="text-base font-extrabold text-text mt-0.5">
            {formatNumber(payload[0].value)} <span className="text-xs font-semibold text-text-muted">Seats</span>
          </div>
          {data.percentage !== undefined && (
            <span className="text-[10px] text-text-muted font-medium mt-0.5">
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
      {/* Premium Header Design */}
      <div className="ms-section-header ms-section-header-emerald">
        <div className="flex flex-col gap-0.5">
          <h2 className="ms-section-header-title">
            Seat Matrix
          </h2>
          <p className="ms-section-header-description">
            Category-wise seat allocation, quota distribution, and division ratios
          </p>
        </div>
      </div>
      
      <div className="ms-seat-matrix-grid">
        {/* Left Column: Quota Distribution Donut Chart */}
        <Card padded className="flex flex-col gap-4">
          <div className="ms-matrix-card-header">
            <FiPieChart className="text-brand-500 h-5 w-5" />
            <h3 className="font-bold text-text text-base">Quota Distribution</h3>
          </div>
          
          {/* Interactive Chart Container */}
          <div className="ms-chart-container">
            {mounted ? (
              <div className="relative w-full h-[200px] flex items-center justify-center">
                {/* Total Counter in Center of Donut */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
                  <span className="text-2xl font-extrabold text-text tracking-tight">
                    {formatNumber(totalQuotaSeats)}
                  </span>
                  <span className="text-[9px] font-extrabold text-text-muted uppercase tracking-widest">
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
                    <RechartsTooltip content={<CustomTooltip />} cursor={false} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-[200px] flex items-center justify-center text-text-muted text-sm font-medium animate-pulse">
                Loading interactive visualization...
              </div>
            )}
          </div>
          
          {/* Detailed Lists with Indicators */}
          <div className="flex flex-col gap-3 pt-2">
            {activeQuotas.map((quota, idx) => {
              const percentage = totalQuotaSeats > 0 ? (quota.value / totalQuotaSeats) * 100 : 0;
              return (
                <div key={idx} className="ms-progress-card">
                  <div className="ms-progress-card-info">
                    <div className="ms-progress-card-label-container">
                      <span className={`ms-progress-dot ${quota.colorClass}`} />
                      <span className="ms-progress-card-label">
                        {quota.label}
                      </span>
                    </div>
                    <span className="ms-progress-card-badge">
                      <strong className="text-brand-600 font-extrabold text-sm">{formatNumber(quota.value)}</strong> Seats ({percentage.toFixed(1)}%)
                    </span>
                  </div>
                  
                  {/* Progress Bar Track */}
                  <div className="ms-progress-bar-track">
                    <div 
                      className={`ms-progress-bar-fill ${quota.colorClass}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Right Column: Category-wise Distribution Bar Chart */}
        <Card padded className="flex flex-col gap-4">
          <div className="ms-matrix-card-header-between">
            <div className="flex items-center gap-2">
              <FiUsers className="text-brand-500 h-5 w-5" />
              <h3 className="font-bold text-text text-base">Category-wise Seats</h3>
            </div>
            {/* Dynamic Quota Source Badge */}
            <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg border ${
              isAiq100 
                ? "bg-indigo-50 text-indigo-700 border-indigo-200/50" 
                : "bg-emerald-50 text-emerald-700 border-emerald-200/50"
            }`}>
              {isAiq100 ? "AIQ seats" : "State"}
            </span>
          </div>
          
          {/* Detailed Lists with Indicators */}
          <div className="flex flex-col gap-3 pt-2">
            {Object.entries(seatMatrix.categoryDistribution).map(([category, count]) => {
              const percentage = totalCategorySeats > 0 ? (count / totalCategorySeats) * 100 : 0;
              const hexColor = getCategoryHexColor(category);
              return (
                <div key={category} className="ms-progress-card ms-progress-card-category">
                  <div className="ms-progress-card-info">
                    <span className="ms-progress-card-label-tiny">
                      {category}
                    </span>
                    <span 
                      className="ms-progress-card-badge"
                      style={{ 
                        color: "#334155", 
                        backgroundColor: "#f8fafc", 
                        borderColor: `${hexColor}30`
                      }}
                    >
                      <strong className="font-black text-sm" style={{ color: hexColor }}>
                        {formatNumber(count)}
                      </strong>{" "}
                      Seats ({percentage.toFixed(1)}%)
                    </span>
                  </div>
                  
                  {/* Progress Bar Track */}
                  <div className="ms-progress-bar-track">
                    <div 
                      className="ms-progress-bar-fill"
                      style={{ 
                        width: `${percentage}%`,
                        backgroundColor: hexColor
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          
        </Card>
      </div>
    </section>
  );
}
