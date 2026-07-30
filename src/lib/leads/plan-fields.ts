/** Client-safe helpers for reading plan fields from a lead payload. */

import { COUNSELLING_PLANS } from "@/lib/counselling/content";

export const PACKAGE_PLAN_VARIANTS = ["essentials", "expert", "premium"] as const;
export type PackagePlanVariant = (typeof PACKAGE_PLAN_VARIANTS)[number];

export function isPackagePlanVariant(
  value: string | null | undefined,
): value is PackagePlanVariant {
  return Boolean(
    value && (PACKAGE_PLAN_VARIANTS as readonly string[]).includes(value),
  );
}

function payloadRecord(raw: unknown): Record<string, unknown> {
  if (raw && typeof raw === "object" && !Array.isArray(raw)) {
    return raw as Record<string, unknown>;
  }
  return {};
}

function stringField(record: Record<string, unknown>, key: string): string | null {
  const value = record[key];
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

export function getLeadQuota(rawPayload: unknown): string | null {
  const record = payloadRecord(rawPayload);
  return stringField(record, "quota") ?? stringField(record, "quotaInterest");
}

export function getLeadPlanName(lead: {
  variant: string | null;
  rawPayload: unknown;
}): string {
  const record = payloadRecord(lead.rawPayload);
  const fromPayload = stringField(record, "planName");
  if (fromPayload) return fromPayload;
  const planId = stringField(record, "planId") ?? (lead.variant?.trim() || null);
  if (planId) {
    const match = COUNSELLING_PLANS.plans.find((p) => p.id === planId);
    if (match) return match.name;
  }
  return "counselling";
}
