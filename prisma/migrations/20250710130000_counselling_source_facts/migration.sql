-- Add source to seat_snapshots and cutoffs (MCC vs state bifurcation).

ALTER TABLE "app"."seat_snapshots"
  ADD COLUMN IF NOT EXISTS "source" TEXT NOT NULL DEFAULT '';

ALTER TABLE "app"."cutoffs"
  ADD COLUMN IF NOT EXISTS "source" TEXT NOT NULL DEFAULT '';

DROP INDEX IF EXISTS "app"."seat_snapshots_college_id_academic_year_key";

CREATE UNIQUE INDEX IF NOT EXISTS "seat_snapshots_source_uq"
  ON "app"."seat_snapshots"("college_id", "academic_year", "source");

DROP INDEX IF EXISTS "app"."cutoffs_college_id_year_category_seat_type_admission_round_quota_key";
DROP INDEX IF EXISTS "app"."cutoffs_college_id_year_category_seat_type_admission_round__key";
DROP INDEX IF EXISTS "app"."cutoffs_college_id_year_category_seat_type_admission_round_quota_source_key";
DROP INDEX IF EXISTS "app"."cutoffs_college_id_year_category_seat_type_admission_round_quot";

CREATE UNIQUE INDEX IF NOT EXISTS "cutoffs_source_uq"
  ON "app"."cutoffs"("college_id", "year", "category", "seat_type", "admission_round", "quota", "source");
