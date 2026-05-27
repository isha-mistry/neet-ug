import clsx, { type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

export function formatINR(value: number, options?: { compact?: boolean }): string {
  if (!Number.isFinite(value)) return "-";
  if (options?.compact) {
    if (value >= 1_00_00_000) return `Rs ${(value / 1_00_00_000).toFixed(2)} Cr`;
    if (value >= 1_00_000) return `Rs ${(value / 1_00_000).toFixed(2)} Lakh`;
    if (value >= 1_000) return `Rs ${(value / 1_000).toFixed(1)}K`;
    return `Rs ${value}`;
  }
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatNumber(value: number): string {
  if (!Number.isFinite(value)) return "-";
  return new Intl.NumberFormat("en-IN").format(value);
}

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function toTitleCase(value: string): string {
  return value
    .split(/[-_\s]/)
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");
}
