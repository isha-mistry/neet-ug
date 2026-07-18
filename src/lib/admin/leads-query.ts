import "server-only";

import type { Prisma } from "@prisma/client";
import { LEAD_FORM_TYPES, LEAD_STATUSES } from "@/lib/leads/types";
import { prisma } from "@/lib/db/prisma";

const FORM_TYPE_VALUES = new Set<string>(Object.values(LEAD_FORM_TYPES));
const STATUS_VALUES = new Set<string>(LEAD_STATUSES);

export type AdminLeadsListParams = {
  q?: string;
  formType?: string;
  status?: string;
  from?: string;
  to?: string;
  page?: number;
  pageSize?: number;
};

export type AdminLeadsListResult = {
  items: Awaited<ReturnType<typeof prisma.lead.findMany>>;
  total: number;
  page: number;
  pageSize: number;
};

function parsePositiveInt(
  value: string | null | undefined,
  fallback: number
): number {
  if (!value) return fallback;
  const n = Number.parseInt(value, 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

function parseIsoDate(value: string | undefined, endOfDay: boolean): Date | null {
  if (!value?.trim()) return null;
  const raw = value.trim();
  // Accept YYYY-MM-DD or full ISO
  const d = raw.length <= 10
    ? new Date(endOfDay ? `${raw}T23:59:59.999Z` : `${raw}T00:00:00.000Z`)
    : new Date(raw);
  if (Number.isNaN(d.getTime())) return null;
  return d;
}

export function parseAdminLeadsListParams(
  searchParams: URLSearchParams
): AdminLeadsListParams {
  return {
    q: searchParams.get("q")?.trim() || undefined,
    formType: searchParams.get("formType")?.trim() || undefined,
    status: searchParams.get("status")?.trim() || undefined,
    from: searchParams.get("from")?.trim() || undefined,
    to: searchParams.get("to")?.trim() || undefined,
    page: parsePositiveInt(searchParams.get("page"), 1),
    pageSize: Math.min(parsePositiveInt(searchParams.get("pageSize"), 20), 100),
  };
}

function buildWhere(params: AdminLeadsListParams): Prisma.LeadWhereInput {
  const where: Prisma.LeadWhereInput = {};

  if (params.formType && FORM_TYPE_VALUES.has(params.formType)) {
    where.formType = params.formType;
  }

  if (params.status && STATUS_VALUES.has(params.status)) {
    where.status = params.status;
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
      { email: { contains: params.q, mode: "insensitive" } },
    ];
  }

  return where;
}

export async function listAdminLeads(
  params: AdminLeadsListParams
): Promise<AdminLeadsListResult> {
  const page = params.page ?? 1;
  const pageSize = Math.min(params.pageSize ?? 20, 100);
  const where = buildWhere(params);
  const skip = (page - 1) * pageSize;

  const [items, total] = await Promise.all([
    prisma.lead.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: pageSize,
    }),
    prisma.lead.count({ where }),
  ]);

  return { items, total, page, pageSize };
}

export async function getAdminLeadById(id: string) {
  return prisma.lead.findUnique({ where: { id } });
}
