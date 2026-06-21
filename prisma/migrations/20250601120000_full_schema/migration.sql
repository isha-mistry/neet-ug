-- Dravio full database schema (Prisma-managed). Staging tables include `id` for ORM;
-- gujarat_data.sql COPY lists only the original columns (id auto-fills).

CREATE SCHEMA IF NOT EXISTS "staging";
CREATE SCHEMA IF NOT EXISTS "app";

-- Staging
CREATE TABLE "staging"."medical_colleges" (
    "id" SERIAL NOT NULL,
    "state" TEXT,
    "college_name" TEXT,
    "university_name" TEXT,
    "college_type" TEXT,
    "annual_intake_seats" INTEGER,
    "counselling" TEXT,
    CONSTRAINT "medical_colleges_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "staging"."gujarat_college_fees" (
    "id" SERIAL NOT NULL,
    "college_name" TEXT,
    "university" TEXT,
    "govt_quota_fees" DECIMAL,
    "mgt_quota_fees" DECIMAL,
    "fees_currency" TEXT,
    "nri_fees" DECIMAL,
    "hostel_fees" DECIMAL,
    "mess_fees" DECIMAL,
    "university_fees" DECIMAL,
    "transport_fees" DECIMAL,
    "exam_fees" DECIMAL,
    CONSTRAINT "gujarat_college_fees_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "staging"."gujarat_seat_data" (
    "id" SERIAL NOT NULL,
    "college_name" TEXT,
    "institute_type" TEXT,
    "total_seats" INTEGER,
    "aiq" INTEGER,
    "state_quota" INTEGER,
    "esic_ip" INTEGER,
    "nri" INTEGER,
    "open_seats" INTEGER,
    "sc" INTEGER,
    "st" INTEGER,
    "sebc" INTEGER,
    "ews" INTEGER,
    "mq" INTEGER,
    CONSTRAINT "gujarat_seat_data_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "staging"."gujarat_cutoff_data" (
    "id" SERIAL NOT NULL,
    "college_name" TEXT,
    "state" TEXT,
    "category" TEXT,
    "seat_type" TEXT,
    "admission_round" TEXT,
    "opening_rank_air" INTEGER,
    "closing_rank_air" INTEGER,
    "opening_state_merit_rank" INTEGER,
    "closing_state_merit_rank" INTEGER,
    "opening_neet_score" INTEGER,
    "closing_neet_score" INTEGER,
    "opening_percentile" DECIMAL,
    "closing_percentile" DECIMAL,
    "total_seats_filled" INTEGER,
    "cutoff_year" INTEGER,
    "opening_category_rank" TEXT,
    "closing_category_rank" TEXT,
    CONSTRAINT "gujarat_cutoff_data_pkey" PRIMARY KEY ("id")
);

-- App normalized
CREATE TABLE "app"."colleges" (
    "college_id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "state_slug" TEXT NOT NULL,
    "city" TEXT,
    "college_type" TEXT NOT NULL,
    "seat_count" INTEGER NOT NULL DEFAULT 0,
    "quota_info" TEXT NOT NULL DEFAULT '',
    "university_name" TEXT,
    "counselling" TEXT,
    CONSTRAINT "colleges_pkey" PRIMARY KEY ("college_id")
);

CREATE UNIQUE INDEX "colleges_slug_key" ON "app"."colleges"("slug");

CREATE TABLE "app"."college_aliases" (
    "alias_id" SERIAL NOT NULL,
    "college_id" INTEGER NOT NULL,
    "source" TEXT NOT NULL,
    "raw_name" TEXT NOT NULL,
    "match_key" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "college_aliases_pkey" PRIMARY KEY ("alias_id")
);

CREATE UNIQUE INDEX "college_aliases_source_raw_name_key" ON "app"."college_aliases"("source", "raw_name");

ALTER TABLE "app"."college_aliases" ADD CONSTRAINT "college_aliases_college_id_fkey" FOREIGN KEY ("college_id") REFERENCES "app"."colleges"("college_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- App catalog (runtime JSON)
CREATE TABLE "app"."college_documents" (
    "slug" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "college_documents_pkey" PRIMARY KEY ("slug")
);

CREATE INDEX "college_documents_name_idx" ON "app"."college_documents"((data->>'name'));

CREATE TABLE "app"."state_documents" (
    "slug" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "state_documents_pkey" PRIMARY KEY ("slug")
);
