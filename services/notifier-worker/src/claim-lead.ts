import { LeadNotificationStatus, PrismaClient } from "@prisma/client";

export type ClaimedLead = {
  id: string;
  formType: string;
  phoneE164: string | null;
  name: string | null;
  pageLabel: string | null;
  pagePath: string | null;
  variant: string | null;
  neetScore: number | null;
  neetCategory: string | null;
  domicileState: string | null;
  targetStates: string | null;
  city: string | null;
  queryType: string | null;
  message: string | null;
  preferredSlot: string | null;
};

export async function reclaimStaleClaims(
  prisma: PrismaClient,
  staleClaimMs: number,
): Promise<number> {
  const cutoff = new Date(Date.now() - staleClaimMs);
  const result = await prisma.lead.updateMany({
    where: {
      notificationStatus: LeadNotificationStatus.IN_PROGRESS,
      notificationClaimedAt: { lt: cutoff },
    },
    data: {
      notificationStatus: LeadNotificationStatus.PENDING,
      notificationClaimedAt: null,
    },
  });
  return result.count;
}

export async function claimNextLead(
  prisma: PrismaClient,
): Promise<ClaimedLead | null> {
  return prisma.$transaction(async (tx) => {
    const rows = await tx.$queryRaw<ClaimedLead[]>`
      UPDATE app.leads
      SET notification_status = 'IN_PROGRESS'::app."LeadNotificationStatus",
          notification_claimed_at = NOW()
      WHERE id = (
        SELECT id FROM app.leads
        WHERE notification_status = 'PENDING'::app."LeadNotificationStatus"
          AND consent_whatsapp = true
          AND phone_e164 IS NOT NULL
        ORDER BY created_at ASC
        FOR UPDATE SKIP LOCKED
        LIMIT 1
      )
      RETURNING
        id,
        form_type AS "formType",
        phone_e164 AS "phoneE164",
        name,
        page_label AS "pageLabel",
        page_path AS "pagePath",
        variant,
        neet_score AS "neetScore",
        neet_category AS "neetCategory",
        domicile_state AS "domicileState",
        target_states AS "targetStates",
        city,
        query_type AS "queryType",
        message,
        preferred_slot AS "preferredSlot"
    `;
    return rows[0] ?? null;
  });
}

export async function finalizeLeadNotification(
  prisma: PrismaClient,
  leadId: string,
  status: LeadNotificationStatus,
): Promise<void> {
  await prisma.lead.update({
    where: { id: leadId },
    data: {
      notificationStatus: status,
      notificationClaimedAt: null,
    },
  });
}
