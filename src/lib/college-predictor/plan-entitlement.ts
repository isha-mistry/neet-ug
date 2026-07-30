import "server-only";

import { prisma } from "@/lib/db/prisma";
import { parsePhoneToE164 } from "@/lib/leads/normalize-phone-e164";

import {
  PACKAGE_PLAN_VARIANTS,
} from "@/lib/leads/plan-fields";

export type PlanEntitlement = {
  entitled: boolean;
  leadId: string | null;
  planVariant: string | null;
  planPurchasedAt: string | null;
};

/**
 * After college-predictor unlock, check whether this phone belongs to a
 * manually marked purchased counselling plan. Name is not required.
 */
export async function findPurchasedPlanEntitlement(input: {
  phone: string;
  countryCode?: string;
}): Promise<PlanEntitlement> {
  const phoneDigits = input.phone.replace(/\D/g, "");
  const parsed = parsePhoneToE164(input.countryCode, phoneDigits);
  const phoneE164 = parsed.ok ? parsed.e164 : null;

  if (!phoneE164 && phoneDigits.length < 10) {
    return {
      entitled: false,
      leadId: null,
      planVariant: null,
      planPurchasedAt: null,
    };
  }

  const match = await prisma.lead.findFirst({
    where: {
      planPurchasedAt: { not: null },
      variant: { in: [...PACKAGE_PLAN_VARIANTS] },
      OR: [
        ...(phoneE164 ? [{ phoneE164 }] : []),
        { phone: phoneDigits },
      ],
    },
    orderBy: { planPurchasedAt: "desc" },
    select: {
      id: true,
      variant: true,
      planPurchasedAt: true,
    },
  });

  if (!match?.planPurchasedAt) {
    return {
      entitled: false,
      leadId: null,
      planVariant: null,
      planPurchasedAt: null,
    };
  }

  return {
    entitled: true,
    leadId: match.id,
    planVariant: match.variant,
    planPurchasedAt: match.planPurchasedAt.toISOString(),
  };
}
