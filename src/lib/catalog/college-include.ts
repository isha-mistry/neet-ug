import type { Prisma } from "@prisma/client";

/** Shared Prisma include for catalog assembly (list + detail). */
export const collegeCatalogInclude = {
  cutoffs: true,
  feeSchedules: { include: { lineItems: true } },
  seatSnapshots: { include: { buckets: true } },
} satisfies Prisma.CollegeInclude;
