-- AlterTable
ALTER TABLE "app"."leads" ADD COLUMN IF NOT EXISTS "plan_purchased_at" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX IF NOT EXISTS "leads_phone_e164_idx" ON "app"."leads"("phone_e164");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "leads_plan_purchased_at_idx" ON "app"."leads"("plan_purchased_at");
