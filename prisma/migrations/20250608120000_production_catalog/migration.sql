-- Production catalog: drop staging, add normalized fee/seat/cutoff tables.

DROP SCHEMA IF EXISTS "staging" CASCADE;

CREATE TABLE "app"."states" (
    "state_slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "intro" TEXT NOT NULL DEFAULT '',
    "total_seats" INTEGER NOT NULL DEFAULT 0,
    "competition_level" TEXT NOT NULL DEFAULT '',
    "fee_dimension_profile" TEXT NOT NULL DEFAULT 'seat_type',
    CONSTRAINT "states_pkey" PRIMARY KEY ("state_slug")
);

INSERT INTO "app"."states" ("state_slug", "name", "fee_dimension_profile")
SELECT DISTINCT
    c."state_slug",
    COALESCE(NULLIF(TRIM(c."state"), ''), INITCAP(REPLACE(c."state_slug", '-', ' '))),
    'seat_type'
FROM "app"."colleges" c
ON CONFLICT ("state_slug") DO NOTHING;

ALTER TABLE "app"."colleges" ADD CONSTRAINT "colleges_state_slug_fkey"
    FOREIGN KEY ("state_slug") REFERENCES "app"."states"("state_slug") ON DELETE RESTRICT ON UPDATE CASCADE;

CREATE TABLE "app"."fee_schedules" (
    "id" SERIAL NOT NULL,
    "college_id" INTEGER NOT NULL,
    "academic_year" INTEGER NOT NULL,
    "source" TEXT NOT NULL DEFAULT '',
    CONSTRAINT "fee_schedules_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "fee_schedules_college_id_academic_year_key"
    ON "app"."fee_schedules"("college_id", "academic_year");

ALTER TABLE "app"."fee_schedules" ADD CONSTRAINT "fee_schedules_college_id_fkey"
    FOREIGN KEY ("college_id") REFERENCES "app"."colleges"("college_id") ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE "app"."fee_line_items" (
    "id" SERIAL NOT NULL,
    "schedule_id" INTEGER NOT NULL,
    "component" TEXT NOT NULL,
    "seat_type" TEXT NOT NULL DEFAULT '',
    "category" TEXT NOT NULL DEFAULT '',
    "amount" DECIMAL(14,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "period" TEXT NOT NULL DEFAULT 'annual',
    CONSTRAINT "fee_line_items_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "fee_line_items_schedule_id_component_seat_type_category_key"
    ON "app"."fee_line_items"("schedule_id", "component", "seat_type", "category");

ALTER TABLE "app"."fee_line_items" ADD CONSTRAINT "fee_line_items_schedule_id_fkey"
    FOREIGN KEY ("schedule_id") REFERENCES "app"."fee_schedules"("id") ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE "app"."seat_snapshots" (
    "id" SERIAL NOT NULL,
    "college_id" INTEGER NOT NULL,
    "academic_year" INTEGER NOT NULL,
    "institute_type" TEXT NOT NULL,
    "total_seats" INTEGER NOT NULL,
    CONSTRAINT "seat_snapshots_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "seat_snapshots_college_id_academic_year_key"
    ON "app"."seat_snapshots"("college_id", "academic_year");

ALTER TABLE "app"."seat_snapshots" ADD CONSTRAINT "seat_snapshots_college_id_fkey"
    FOREIGN KEY ("college_id") REFERENCES "app"."colleges"("college_id") ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE "app"."seat_buckets" (
    "id" SERIAL NOT NULL,
    "snapshot_id" INTEGER NOT NULL,
    "bucket_code" TEXT NOT NULL,
    "seat_count" INTEGER NOT NULL,
    CONSTRAINT "seat_buckets_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "seat_buckets_snapshot_id_bucket_code_key"
    ON "app"."seat_buckets"("snapshot_id", "bucket_code");

ALTER TABLE "app"."seat_buckets" ADD CONSTRAINT "seat_buckets_snapshot_id_fkey"
    FOREIGN KEY ("snapshot_id") REFERENCES "app"."seat_snapshots"("id") ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE "app"."cutoffs" (
    "id" SERIAL NOT NULL,
    "college_id" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "seat_type" TEXT NOT NULL,
    "admission_round" TEXT NOT NULL,
    "opening_rank_air" INTEGER,
    "closing_rank_air" INTEGER,
    "opening_state_merit_rank" DECIMAL(12,2),
    "closing_state_merit_rank" DECIMAL(12,2),
    "opening_neet_score" INTEGER,
    "closing_neet_score" INTEGER,
    "opening_percentile" DECIMAL(8,5),
    "closing_percentile" DECIMAL(8,5),
    "total_seats_filled" INTEGER,
    "opening_category_rank" TEXT,
    "closing_category_rank" TEXT,
    CONSTRAINT "cutoffs_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "cutoffs_college_id_year_category_seat_type_admission_round_key"
    ON "app"."cutoffs"("college_id", "year", "category", "seat_type", "admission_round");

CREATE INDEX "cutoffs_year_category_closing_rank_air_idx"
    ON "app"."cutoffs"("year", "category", "closing_rank_air");

CREATE INDEX "cutoffs_college_id_year_idx"
    ON "app"."cutoffs"("college_id", "year");

ALTER TABLE "app"."cutoffs" ADD CONSTRAINT "cutoffs_college_id_fkey"
    FOREIGN KEY ("college_id") REFERENCES "app"."colleges"("college_id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "app"."colleges" DROP COLUMN IF EXISTS "state";
