-- CreateTable
CREATE TABLE "app"."leads" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "form_type" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'new',
    "page_path" TEXT,
    "page_label" TEXT,
    "variant" TEXT,
    "name" TEXT,
    "country_code" TEXT DEFAULT '+91',
    "phone" TEXT,
    "email" TEXT,
    "neet_score" INTEGER,
    "neet_category" TEXT,
    "domicile_state" TEXT,
    "target_states" TEXT,
    "city" TEXT,
    "query_type" TEXT,
    "message" TEXT,
    "preferred_slot" TEXT,
    "topics" JSONB,
    "consent" BOOLEAN NOT NULL DEFAULT false,
    "consent_at" TIMESTAMP(3),
    "raw_payload" JSONB,

    CONSTRAINT "leads_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "leads_created_at_idx" ON "app"."leads"("created_at" DESC);

-- CreateIndex
CREATE INDEX "leads_form_type_idx" ON "app"."leads"("form_type");

-- CreateIndex
CREATE INDEX "leads_status_idx" ON "app"."leads"("status");

-- CreateIndex
CREATE INDEX "leads_phone_idx" ON "app"."leads"("phone");
