-- Rajasthan (and multi-quota states): distinguish GQ vs category-quota rows on the same seat type.

ALTER TABLE "app"."cutoffs" ADD COLUMN "quota" TEXT NOT NULL DEFAULT '';

DROP INDEX IF EXISTS "app"."cutoffs_college_id_year_category_seat_type_admission_round_key";

CREATE UNIQUE INDEX "cutoffs_college_id_year_category_seat_type_admission_round_quota_key"
    ON "app"."cutoffs"("college_id", "year", "category", "seat_type", "admission_round", "quota");
