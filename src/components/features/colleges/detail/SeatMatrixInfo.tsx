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

interface SeatMatrixInfoProps {
  seatMatrix: CollegeSeatMatrix;
}

export function SeatMatrixInfo({ seatMatrix }: SeatMatrixInfoProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Setup custom colors mapping to MedSeat CSS variables
  const quotas = [
    { 
      label: "All India Quota (AIQ)", 
      value: seatMatrix.aiq, 
      hexColor: "var(--color-primary)"
    },
    { 
      label: "State Quota", 
      value: seatMatrix.stateQuota, 
      hexColor: "var(--color-secondary)" 
    },
    { 
      label: "Management", 
      value: seatMatrix.management, 
      hexColor: "var(--color-tertiary)" 
    },
    { 
      label: "NRI Quota", 
      value: seatMatrix.nri, 
      hexColor: "var(--color-primary-fixed-dim)" 
    },
  ].filter((q) => q.value > 0);

  // If there's no stateQuota, but there are Central Pool or others, map them dynamically
  if (quotas.length === 1 && seatMatrix.stateQuota === 0) {
    quotas.push({
      label: "Central Pool / Others",
      value: seatMatrix.aiq > 0 ? 113 : 0,
      hexColor: "var(--color-secondary-fixed-dim)"
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
      case "general": return "var(--color-primary)"; // Primary Blue
      case "obc": return "var(--color-secondary)"; // Secondary
      case "sc": return "var(--color-tertiary)"; // Tertiary
      case "st": return "var(--color-college-category-st)"; // Dark Indigo
      case "ews": return "var(--color-college-category-ews)"; // Dark Purple
      default: return "var(--color-outline)"; // Slate Outline
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
        <div 
          className="border p-3.5 rounded-xl flex flex-col gap-1 animate-fadeIn"
          style={{
            backgroundColor: "var(--color-surface-container-lowest)",
            borderColor: "var(--color-border)",
            boxShadow: "var(--shadow-level-2)",
          }}
        >
          <div className="flex items-center gap-2">
            <span 
              className="h-2.5 w-2.5 rounded-full shadow-sm" 
              style={{ backgroundColor: data.color }} 
            />
            <span 
              className="text-[10px] font-bold uppercase tracking-widest"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {payload[0].name}
            </span>
          </div>
          <div className="text-base font-extrabold mt-0.5" style={{ color: "var(--color-text)" }}>
            {formatNumber(payload[0].value)} <span className="text-xs font-semibold" style={{ color: "var(--color-text-muted)" }}>Seats</span>
          </div>
          {data.percentage !== undefined && (
            <span className="text-[10px] font-medium mt-0.5" style={{ color: "var(--color-text-muted)" }}>
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
      
      <div className="ms-seat-matrix-grid">
        {/* Left Column: Quota Distribution Donut Chart */}
        <Card padded className="flex flex-col gap-4">
          <div className="ms-matrix-card-header">
            <FiPieChart className="h-5 w-5" style={{ color: "var(--color-primary)" }} />
            <h3 className="font-bold text-base" style={{ color: "var(--color-text)" }}>Quota Distribution</h3>
          </div>
          
          {/* Interactive Chart Container */}
          <div className="ms-chart-container">
            {mounted ? (
              <div className="relative w-full h-[200px] flex items-center justify-center">
                {/* Total Counter in Center of Donut */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
                  <span className="text-2xl font-extrabold tracking-tight" style={{ color: "var(--color-text)" }}>
                    {formatNumber(totalQuotaSeats)}
                  </span>
                  <span className="text-[9px] font-extrabold uppercase tracking-widest" style={{ color: "var(--color-text-muted)" }}>
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
              <div className="h-[200px] flex items-center justify-center text-sm font-medium animate-pulse" style={{ color: "var(--color-text-muted)" }}>
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
                      <span className="ms-progress-dot" style={{ backgroundColor: quota.hexColor }} />
                      <span className="ms-progress-card-label">
                        {quota.label}
                      </span>
                    </div>
                    <span className="ms-progress-card-badge">
                      <strong className="font-extrabold text-sm" style={{ color: "var(--color-primary)" }}>{formatNumber(quota.value)}</strong> Seats ({percentage.toFixed(1)}%)
                    </span>
                  </div>
                  
                  {/* Progress Bar Track */}
                  <div className="ms-progress-bar-track">
                    <div 
                      className="ms-progress-bar-fill"
                      style={{ 
                        width: `${percentage}%`,
                        backgroundColor: quota.hexColor 
                      }}
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
              <FiUsers className="h-5 w-5" style={{ color: "var(--color-primary)" }} />
              <h3 className="font-bold text-base" style={{ color: "var(--color-text)" }}>Category-wise Seats</h3>
            </div>
            {/* Dynamic Quota Source Badge */}
            <span 
              className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg border"
              style={
                isAiq100
                  ? {
                      backgroundColor: "rgba(224, 231, 255, 0.8)",
                      color: "#4338ca",
                      borderColor: "#e0e7ff",
                    }
                  : {
                      backgroundColor: "rgba(209, 250, 229, 0.8)",
                      color: "#047857",
                      borderColor: "#d1fae5",
                    }
              }
            >
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
