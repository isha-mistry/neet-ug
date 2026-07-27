import { PrismaClient } from "@prisma/client";
import { deliverLeadNotification } from "../../../src/lib/notifications/notification-service";
import {
  claimNextLead,
  finalizeLeadNotification,
  reclaimStaleClaims,
} from "./claim-lead";
import { assertWorkerConfig, sleep, workerConfig } from "./config";

function createWorkerPrisma(): PrismaClient {
  return new PrismaClient({
    datasources: {
      db: {
        url: workerConfig.databaseUrl,
      },
    },
    log: ["error", "warn"],
  });
}

async function runLoop(): Promise<void> {
  assertWorkerConfig();
  const prisma = createWorkerPrisma();

  console.info("[notifier-worker] started", {
    sendIntervalMs: workerConfig.sendIntervalMs,
    pollIntervalMs: workerConfig.pollIntervalMs,
    staleClaimMs: workerConfig.staleClaimMs,
  });

  while (true) {
    try {
      const reclaimed = await reclaimStaleClaims(
        prisma,
        workerConfig.staleClaimMs,
      );
      if (reclaimed > 0) {
        console.warn("[notifier-worker] reclaimed stale claims", { reclaimed });
      }

      const lead = await claimNextLead(prisma);
      if (!lead) {
        await sleep(workerConfig.pollIntervalMs);
        continue;
      }

      console.info("[notifier-worker] processing lead", {
        leadId: lead.id,
        formType: lead.formType,
      });

      const result = await deliverLeadNotification(prisma, lead);
      await finalizeLeadNotification(prisma, lead.id, result.finalStatus);

      console.info("[notifier-worker] lead processed", {
        leadId: lead.id,
        status: result.finalStatus,
        whatsappOk: result.whatsappAttempt?.ok ?? false,
        smsOk: result.smsAttempt?.ok ?? false,
      });
    } catch (error) {
      console.error("[notifier-worker] loop error", error);
      await sleep(workerConfig.pollIntervalMs);
      continue;
    }

    await sleep(workerConfig.sendIntervalMs);
  }
}

runLoop().catch((error) => {
  console.error("[notifier-worker] fatal", error);
  process.exit(1);
});
