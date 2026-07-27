-- CreateEnum
CREATE TYPE "app"."LeadNotificationStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'SENT', 'FAILED', 'SKIPPED_NO_CONSENT');

-- CreateEnum
CREATE TYPE "app"."NotificationChannel" AS ENUM ('whatsapp', 'sms');

-- CreateEnum
CREATE TYPE "app"."NotificationAttemptStatus" AS ENUM ('sent', 'failed');

-- AlterTable
ALTER TABLE "app"."leads"
ADD COLUMN "phone_e164" TEXT,
ADD COLUMN "consent_whatsapp" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN "consent_whatsapp_at" TIMESTAMP(3),
ADD COLUMN "notification_status" "app"."LeadNotificationStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN "notification_claimed_at" TIMESTAMP(3);

-- Backfill: existing leads must not be queued for retroactive WhatsApp sends
UPDATE "app"."leads"
SET "notification_status" = 'SKIPPED_NO_CONSENT';

-- Backfill phone_e164 from country_code + phone where possible
UPDATE "app"."leads"
SET "phone_e164" = CASE
  WHEN "phone" IS NULL OR length(trim("phone")) = 0 THEN NULL
  WHEN "country_code" IS NOT NULL AND "country_code" LIKE '+%' THEN
    "country_code" || regexp_replace("phone", '\D', '', 'g')
  ELSE '+91' || regexp_replace("phone", '\D', '', 'g')
END
WHERE "phone" IS NOT NULL;

-- CreateTable
CREATE TABLE "app"."notification_logs" (
    "id" TEXT NOT NULL,
    "lead_id" TEXT NOT NULL,
    "channel" "app"."NotificationChannel" NOT NULL,
    "provider" TEXT NOT NULL,
    "status" "app"."NotificationAttemptStatus" NOT NULL,
    "error_msg" TEXT,
    "provider_msg_id" TEXT,
    "payload" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notification_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "leads_notification_status_consent_whatsapp_created_at_idx" ON "app"."leads"("notification_status", "consent_whatsapp", "created_at");

-- CreateIndex
CREATE INDEX "notification_logs_lead_id_created_at_idx" ON "app"."notification_logs"("lead_id", "created_at" DESC);

-- AddForeignKey
ALTER TABLE "app"."notification_logs" ADD CONSTRAINT "notification_logs_lead_id_fkey" FOREIGN KEY ("lead_id") REFERENCES "app"."leads"("id") ON DELETE CASCADE ON UPDATE CASCADE;
