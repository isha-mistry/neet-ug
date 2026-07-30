import "server-only";

import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import {
  isPackagePlanVariant,
  PACKAGE_PLAN_VARIANTS,
  type PackagePlanVariant,
} from "@/lib/leads/plan-fields";

export type PlanPurchaseFilter = "all" | "purchased" | "pending";

export type AdminPlanLeadsListParams = {
  q?: string;
  plan?: PackagePlanVariant | "";
  purchase?: PlanPurchaseFilter;
  from?: string;
  to?: string;
  page?: number;
  pageSize?: number;
};

export type AdminPlanLeadsListResult = {
  items: Awaited<ReturnType<typeof prisma.lead.findMany>>;
  total: number;
  page: number;
  pageSize: number;
  counts: {
    all: number;
    purchased: number;
    pending: number;
    byPlan: Record<PackagePlanVariant, number>;
  };
};

function parsePositiveInt(
  value: string | null | undefined,
  fallback: number,
): number {
  if (!value) return fallback;
  const n = Number.parseInt(value, 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

function parseIsoDate(value: string | undefined, endOfDay: boolean): Date | null {
  if (!value?.trim()) return null;
  const raw = value.trim();
  const d =
    raw.length <= 10
      ? new Date(endOfDay ? `${raw}T23:59:59.999Z` : `${raw}T00:00:00.000Z`)
      : new Date(raw);
  if (Number.isNaN(d.getTime())) return null;
  return d;
}

function parsePurchaseFilter(
  value: string | null | undefined,
): PlanPurchaseFilter {
  if (value === "purchased" || value === "pending") return value;
  return "all";
}

export function parseAdminPlanLeadsListParams(
  searchParams: URLSearchParams,
): AdminPlanLeadsListParams {
  const planRaw = searchParams.get("plan")?.trim() || "";
  return {
    q: searchParams.get("q")?.trim() || undefined,
    plan: isPackagePlanVariant(planRaw) ? planRaw : "",
    purchase: parsePurchaseFilter(searchParams.get("purchase")),
    from: searchParams.get("from")?.trim() || undefined,
    to: searchParams.get("to")?.trim() || undefined,
    page: parsePositiveInt(searchParams.get("page"), 1),
    pageSize: Math.min(parsePositiveInt(searchParams.get("pageSize"), 20), 100),
  };
}

function packageLeadBaseWhere(): Prisma.LeadWhereInput {
  return {
    variant: { in: [...PACKAGE_PLAN_VARIANTS] },
  };
}

function buildWhere(params: AdminPlanLeadsListParams): Prisma.LeadWhereInput {
  const where: Prisma.LeadWhereInput = {
    ...packageLeadBaseWhere(),
  };

  if (params.plan && isPackagePlanVariant(params.plan)) {
    where.variant = params.plan;
  }

  if (params.purchase === "purchased") {
    where.planPurchasedAt = { not: null };
  } else if (params.purchase === "pending") {
    where.planPurchasedAt = null;
  }

  const fromDate = parseIsoDate(params.from, false);
  const toDate = parseIsoDate(params.to, true);
  if (fromDate || toDate) {
    where.createdAt = {
      ...(fromDate ? { gte: fromDate } : {}),
      ...(toDate ? { lte: toDate } : {}),
    };
  }

  if (params.q) {
    where.OR = [
      { name: { contains: params.q, mode: "insensitive" } },
      { phone: { contains: params.q, mode: "insensitive" } },
      { phoneE164: { contains: params.q, mode: "insensitive" } },
      { email: { contains: params.q, mode: "insensitive" } },
    ];
  }

  return where;
}

async function countPackageLeads(
  extra: Prisma.LeadWhereInput = {},
): Promise<number> {
  return prisma.lead.count({
    where: {
      ...packageLeadBaseWhere(),
      ...extra,
    },
  });
}

export async function listAdminPlanLeads(
  params: AdminPlanLeadsListParams,
): Promise<AdminPlanLeadsListResult> {
  const page = params.page ?? 1;
  const pageSize = Math.min(params.pageSize ?? 20, 100);
  const where = buildWhere(params);
  const skip = (page - 1) * pageSize;

  const [items, total, all, purchased, pending, essentials, expert, premium] =
    await Promise.all([
      prisma.lead.findMany({
        where,
        orderBy: [{ planPurchasedAt: "desc" }, { createdAt: "desc" }],
        skip,
        take: pageSize,
      }),
      prisma.lead.count({ where }),
      countPackageLeads(),
      countPackageLeads({ planPurchasedAt: { not: null } }),
      countPackageLeads({ planPurchasedAt: null }),
      countPackageLeads({ variant: "essentials" }),
      countPackageLeads({ variant: "expert" }),
      countPackageLeads({ variant: "premium" }),
    ]);

  return {
    items,
    total,
    page,
    pageSize,
    counts: {
      all,
      purchased,
      pending,
      byPlan: { essentials, expert, premium },
    },
  };
}
